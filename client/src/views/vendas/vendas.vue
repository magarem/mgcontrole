<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="id" style="width: 250px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Procurar
      </el-button>
      <router-link to="/vendas/balcao">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          Incluir
        </el-button>
      </router-link>
    </div>
    <div style="width: 90%; margin: auto;">
      <vue-good-table
        :columns="columns"
        :rows="vendas"
        :search-options="{enabled: true}"
        theme="black-rhino"
        :line-numbers="true"
        @on-row-click="getList_vendaItens"
      />
    </div>

    <!--pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /-->

    <!--

    Modal Venda details

    -->
    <el-dialog :visible.sync="dialogPvVisible" title="Venda" width="80%" top="5vh" center>
      <el-row :gutter="20" type="flex" class="row-bg">
        <el-col :span="7"><div class="grid-content bg-purple"><b>#:</b> {{ venda_selected.id }}</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"><b>Data:</b> {{ venda_selected.created }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><b>Valor:</b> {{ venda_selected.total | money }}</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24"><div class="grid-content bg-purple"><b>Cliente:</b> {{ venda_selected.cliente }} - {{ venda_selected.nome }}</div></el-col>
      </el-row>
      <br>
      <vue-good-table
        :columns="venda_itens_columns"
        :rows="venda_selected.items"
        :search-options="{ enabled: false }"
        :line-numbers="true"
        theme="black-rhino"
      />
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

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'Vendas',
  components: { VueGoodTable },
  directives: { waves },
  filters: {
    money(value) {
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })
      return formatter.format(value)
    },
    booleanChange(value) {
      var ret = 'Não'
      if (value == 1) ret = 'Sim'
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
      dialogPvVisible: false,
      venda_itens_columns: [
        {
          label: 'Código',
          field: 'produto',
          type: 'number'
        },
        {
          label: 'Produto',
          field: 'descricao',
          type: 'string',
          width: '500px'
        },
        {
          label: 'Valor',
          field: 'valor',
          type: 'decimal'
        },
        {
          label: 'Quantidade',
          field: 'qnt',
          type: 'number',
          width: '150px'
        },
        {
          label: 'Total',
          field: 'total',
          type: 'decimal'
        }
      ],
      columns: [
        // {
        //   label: 'ID',
        //   field: 'id'
        // },
        {
          label: 'Data',
          field: 'data',
          type: 'string',
          width: '200px'
        },
        {
          label: 'Cliente',
          field: 'cliente',
          type: 'string',
          width: '350px'
        },
        {
          label: 'Subtotal',
          field: 'subtotal',
          type: 'decimal',
          width: '150px'

          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'MMM Do yy',
        },
        {
          label: 'Desconto',
          field: 'desconto',
          type: 'decimal'
        },
        {
          label: 'Total',
          field: 'total',
          type: 'decimal',
          width: '200px'
        }
      ],
      venda_selected: {
        items: {}
      },
      vendas: [{
        id: null,
        cliente: null,
        cliente_nome: null,
        subtotal: null,
        desconto: null,
        total: null,
        created: null,
        pagamento: {
          id: null,
          id_venda: null,
          dinheiro: null,
          cartao_debito: null,
          cartao_credito: null,
          faturado: null
        },
        itens: [{
          id_venda: null,
          produto: null,
          valor: null,
          qnt: null,
          total: null
        }]
      }],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      tableKey: 0,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: 'id DESC'
      },
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        timestamp: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  mounted() {
    this.getVendas()
  },
  methods: {
    getVendas() {
      this.listLoading = true
      console.log(this.listQuery)

      fetchList('view_vendas_completo', this.listQuery).then(response => {
        console.log('response.data.items:', response.data.items)
        this.vendas = response.data.items

        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 0)
      })
    },
    getList_vendaItens(params) {
      console.log('params.row.id:', params.row.id)

      // Load spin
      this.listLoading = true

      // Set object of form view
      this.venda_selected = params.row

      // Sum total
      this.venda_selected.total = params.row.subtotal - params.row.desconto

      // Get venda itens list
      fetchList('venda_itens_completo', { find: { id_venda: params.row.id }}).then(response => {
        console.log('response.data.items:', response.data.items)
        this.venda_selected.items = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)

        // Open window
        this.dialogPvVisible = true
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
