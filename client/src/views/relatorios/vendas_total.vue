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
      border
      fit
      highlight-current-row
      style="width: 100%; font-size: 18px;"
      @sort-change="sortChange">

      <el-table-column label="Data" prop="data" sortable="custom" align="center" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.data }}</span>
        </template>
      </el-table-column>

      <el-table-column label="N" prop="n" sortable="custom" align="center" width="70">
        <template slot-scope="scope">
          <span>{{ scope.row.n }}</span>
        </template>
      </el-table-column>

     
      <el-table-column label="Total (dinheiro)" prop="total" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.dinheiro | money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total (cartão)" prop="cartao" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.cartao | money }}</span>
        </template>
      </el-table-column>
       <el-table-column label="Total (a vista)" prop="avista" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.dinheiro + scope.row.cartao | money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Total (faturado)" prop="faturado" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.faturado | money }}</span>
        </template>
      </el-table-column>
     

      <el-table-column label="Total geral" prop="total" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.total | money }}</span>
        </template>
      </el-table-column>
     
    </el-table>

    <pagination _v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" layout="prev, pager, next" @pagination="getList" />
    <!--

        Janelas

    -->
   
  </div>
</template>

<script>
import { fetchList, create, update, deleteItem } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { Money } from 'v-money'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import buef from 'buefy'
// import 'buefy/dist/buefy.css'
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
        tipo: 1,
        page: 1,
        limit: 10,
        sort: '1 DESC',
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
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
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
      fetchList('rel_vendas_total', this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: 'Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '1 ASC'
      } else {
        this.listQuery.sort = '1 DESC'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        // importance: 1,
        // remark: '',
        timestamp: new Date()
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
          create('clientes', this.temp).then((ret) => {
            // this.temp.id = response.data
            console.log('response.data:', ret.data.id)
            this.temp.id = ret.data.id
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Cliente cadastrado',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    deleteData() {
      delete ('clientes', this.temp).then(() => {
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
      this.temp.timestamp = new Date(this.temp.timestamp)
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update('clientes', tempData).then(() => {
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
        deleteItem('clientes', row).then(() => {
          console.log('Deleted:--->', row.id)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Exclusão cancelada'
        })
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
