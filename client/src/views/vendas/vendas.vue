<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.codigo" placeholder="Código" style="width: 250px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Procurar
      </el-button>
      <router-link to="/vendas/balcao">

        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          Incluir
        </el-button>

      </router-link>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Exportar
      </el-button>
      <!-- <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!--el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column-->

      <el-table-column label="#" prop="id" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Código" prop="vendaID" sortable="custom" align="center" width="200">
        <template slot-scope="scope">
          <span><a href="" @click.prevent="getList_vendaItens(scope.row)">{{ scope.row.vendaID }}</a></span>
        </template>
      </el-table-column>

      <el-table-column label="Cliente" prop="cliente" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.cliente | capitalize }}</span>
        </template>
      </el-table-column>

      <el-table-column label="SubTotal" prop="subtotal" sortable="custom" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.subtotal | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Faturado" prop="faturado" sortable="custom" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.faturado | booleanChange}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Acrescimo" prop="Acrescimo" sortable="custom" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.acrescimo | money }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="Desconto" prop="desconto" sortable="custom" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.desconto | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Dinheiro" prop="dinheiro" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.dinheiro | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Débito" prop="debito" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.debito | money }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="Crédito" prop="credito" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.credito | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Pago" prop="totalpago" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.totalpago | money }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Troco" prop="troco" sortable="custom" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.troco | money }}</span>
        </template>
      </el-table-column> -->
    </el-table>

    <!--pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /-->

    <el-dialog :visible.sync="dialogPvVisible" title="Venda" width="80%" top="5vh" center>
      <el-row :gutter="20" type="flex" class="row-bg">
        <el-col :span="4"><div class="grid-content bg-purple"><b>Venda #:</b> {{ vendaNumero }}</div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple"><b>ID:</b> {{ vendaID }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><b>Data:</b> {{ vendaData }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><b>Valor:</b> {{ vendaTotal|money }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><b>Faturado:</b> {{faturado}} </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><b>Cliente:</b> {{ cliente.id}} - {{ cliente.nome}}</div></el-col>
      </el-row>
      <br>
      <el-table
        :key="tableKey"
        v-loading="false"
        height="350"
        :data="list2"
        stripe
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange">
        <!-- <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column> -->
        <el-table-column  align="center"
          type="index"
          label="#"
          width="60">
        </el-table-column>
        <el-table-column label="Código" prop="ean" sortable="custom" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.ean }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Descricao" prop="descricao" sortable="custom" align="center" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.descricao | capitalize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Unidade" prop="unidade" sortable="custom" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.unidade }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Preço" prop="pco_venda" sortable="custom" align="center" width="90">
          <template slot-scope="scope">
            <span>{{ scope.row.pco_venda | money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Qnt" prop="qnt" sortable="custom" align="center" width="70">
          <template slot-scope="scope">
            <span>{{ scope.row.qnt }}</span>
          </template>
        </el-table-column>

        <el-table-column label="subtotal" prop="subtotal" sortable="custom" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.subtotal | money }}</span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Fechar</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
  .grid-content {
    padding: 7px;;
    font-size: 18px;;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
// import { fetchList, fetchList_vendaItens, createItem, updateItem } from '@/api/vendas'
import { fetchList, create, update, deleteItem } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import axios from 'axios';
// import { Money } from 'v-money'



export default {
  name: 'Vendas',
  // components: { Money },
  directives: { waves },
  filters: {
    money(value) {

      if (typeof value !== "number") {
          return value;
      }
      var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
      });
      return formatter.format(value);
    },
    booleanChange(value) {
      var ret = 'Não'
      if (value == 1) ret =  'Sim'
      return ret
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
      vendaNumero: 0,
      vendaTotal: 0,
      vendaID: '',
      // faturado: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      cliente:{
        id: null,
        nome: null
      },
      vendaData: '',
      tableKey: 0,
      list: [],
      list2: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        // importance: undefined,
        // title: undefined,
        // type: undefined,
        sort: 'id DESC'
      },
      importanceOptions: [1, 2, 3],
      // calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        // importance: 1,
        // remark: '',
        timestamp: new Date(),
        // title: '',
        // type: '',
        // status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      // pvData: [],
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
  },
  methods: {
    getList(id) {
      this.listLoading = true
      fetchList('vendas', this.listQuery).then(response => {
        console.log('response.data.items:', response.data.items)
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getList_vendaItens(row) {

      var id = row.vendaID
      this.cliente.id = row.cliente
      this.cliente.nome = 'Não informado'
      if (this.cliente.id !==null ){
        fetchList('clientes', {find: {id: this.cliente.id }}).then(response => {
          console.log('response.data.items:', response.data.items)
          this.cliente = response.data.items[0]
          // Just to simulate the time of the request
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
        })
      }
      
      this.listLoading = true
      this.dialogPvVisible = true
      // Get vendas info
      var item = []
      item = this.list.find(item => item.vendaID === id)
      this.vendaNumero = item.id
      this.vendaID = id
      this.vendaData = new Date(parseFloat(item.created)).toLocaleDateString()
      this.vendaTotal = item.subtotal - item.desconto + parseFloat(item.acrescimo)
      
      this.faturado = (item.faturado == 1)?'sim':'Não'
      console.log('item:', item);
      

      fetchList('vendas_itens', {find: {vendaID: id }}).then(response => {
        console.log('response.data.items:', response.data.items)
        this.list2 = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
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
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    //       create('vendas', this.temp).then(() => {
    //         this.list.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'Created Successfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //       })
    //     }
    //   })
    // },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
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
          update('vendas', tempData).then(() => {
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
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      // fetchPv(pv).then(response => {
      //   this.pvData = response.data.pvData
      //   this.dialogPvVisible = true
      // })
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
