<style scoped>
  .teste {
      font-size: 200px !important;
  }
</style>
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.find.nome" placeholder="Nome" style="width: 300px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.find.doc" placeholder="Doc" style="width: 250px;" class="filter-item" clearable @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Procurar
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Incluir
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%; font-size: 20px;"
      @sort-change="sortChange">

      <el-table-column label="Código" prop="id"  align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Usuário"  width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.username | capitalize }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Senha" prop="contato"  width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Token" prop="fone"   width="330">
        <template slot-scope="scope">
          <span>{{ scope.row.token }}</span>
        </template>
      </el-table-column>

      <el-table-column label="" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" layout="prev, pager, next" @pagination="getList" />
    <!--

        Janelas

    -->
    <el-dialog :title="textMap[dialogStatus]" align="left" :visible.sync="dialogFormVisible" top="2vh" :width="tela">
      <div slot="title" style="font-size: 30px;">{{ textMap[dialogStatus] }}</div>
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="top">
        <el-form-item label="Usuário" >
          <el-input v-model="temp.username" autofocus />
        </el-form-item>
        <el-form-item label="Senha" >
          <el-input v-model="temp.password" autofocus />
        </el-form-item>
        <el-form-item label="Perfil" >
          <el-select v-model="temp.roles" placeholder="Select">
            <el-option label="Admin" value="admin" />
            <el-option label="Gerente" value="gerente" />
            <el-option label="Caixa" value="caixa" />
          </el-select>
        </el-form-item>
        <el-form-item label="token" >
          <el-input v-model="temp.token" />
        </el-form-item>
        <el-form-item label="Nome" >
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="Apresentação" >
          <el-input v-model="temp.introduction" />
        </el-form-item>
        <el-form-item label="Avatar" >
          <el-input v-model="temp.avatar" />
        </el-form-item>
        <el-form-item label="Status" >
          <el-select v-model="temp.disabled" placeholder="Select">
            <el-option label="Ativo" value="0" />
            <el-option label="Desabilitado" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">
            Cancela
          </el-button>
          <el-button type="primary" @click="dialogStatus==='novo'?createData():updateData()">
            Confirma
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, create, update, deleteItem } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Money } from 'v-money'
import { getToken, setToken, removeToken } from '@/utils/auth'
export default {
  name: 'Clientes',
  components: { Pagination, Money },
  directives: { waves },
  filters: {
    money(value) {
      if (!value) return ''
      value = value.toString()
      if (value.indexOf('.') == -1) {
        value += ',00'
      }
      return 'R$ ' + value.replace('.', ',')
    },
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tela: '40%',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: 'id DESC',
        find: {
          nome: '',
          doc: ''
        }
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        editar: 'editar',
        novo: 'novo'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.x()
  },
  methods: {
    x() {
      if (screen.width < 400) { this.tela = '90%' } else { this.tela = '40%' }
    },
    getList() {
      // this.listLoading = true
      const self = this
      fetchList('user', this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = 'id ASC'
      } else {
        this.listQuery.sort = 'id DESC'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        // importance: 1,
        // remark: '',
        // timestamp: new Date()
        // title: '',
        // status: 'published',
        // type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'novo'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          create('user', this.temp).then((ret) => {
            // this.temp.id = response.data
            console.log('response.data:', ret.data.id)
            this.temp.id = ret.data.id
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Usuário cadastrado',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    deleteData() {
        console.log('Delete:>', this.temp);
      delete ('user', this.temp).then(() => {
        this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Registro excluido com sucesso!',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      //this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'editar'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          //tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update('user', tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Registro alterado',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('Excluir registro?', 'Aviso', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        this.$notify({
          title: 'Sucesso',
          message: 'Exclusão de registro',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)

        // Server order
        deleteItem('user', row).then(() => {
          console.log('Deleted:--->', row.id)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Exclusão cancelada'
        })
      })
    }
  }
}
</script>
