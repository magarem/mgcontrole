<template>
  <div class="app-container">
    <div style="width: 95%; margin: auto;">
      <el-table :data="list"  highlight-current-row style="font-size: 20px;">
        <el-table-column label="Data" prop="cliente_nome" width="300">
          <template slot-scope="scope">
            <span>{{ scope.row.created }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Descrição"  width="220">
          <template slot-scope="scope">
            <span>{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Descrição (2)"  width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.desc2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Tipo" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Valor" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.value}}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" layout="prev, pager, next" @pagination="getList" />
    </div>
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
import { fetchList } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

import moment from 'moment'
export default {
  name: 'Livrocaixa',
  components: { moment, Pagination },
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
      list_clients: [],
      total: 0,
      filter: {
        cliente: null
      },
      list_total: null,
      list: [],
      list_original: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
     listQuery: {
        page: 1,
        limit: 10,
        sort: '1 DESC',
        find: {
          nome: '',
          doc: ''
        }
      },
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    querySearch(queryString, cb) {
      var list = this.list_clients
      var results = queryString ? list.filter(this.createFilter(queryString)) : list
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      console.log('queryString:', queryString)
      return (item) => {
        console.log('item:', item)
        return (item.cliente_nome.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    filterHandle() {
      console.log(this.filter.id_conta)
      this.list = this.list_original
      if (this.filter.id_conta) {
        this.list = this.list.filter(x =>
          x.id_conta == this.filter.id_conta
        )
      }
      if (this.filter.cliente) {
        this.list = this.list.filter(x =>
          x.cliente_nome == this.filter.cliente
        )
      } else {
        this.getList()
      }
    },
    getList() {
      var self = this
      this.listLoading = true
      fetchList('cash_flow', this.listQuery).then(response => {
        this.list = response.data.items
        this.list.forEach(function(item, index, arr){
          self.list[index] = {created: moment(+item.created).format('DD/MM/YYYY, h:mm:ss a'), desc: item.desc, desc2: item.desc2, type: item.type=1?'Crédito':'Débito', value: item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toString()}
        })
        this.total = response.data.total

        // function getClient(item) {
        //   // return {cliente_nome: item.cliente_nome};
        //   return item.cliente_nome
        // }

        // this.list_clients = this.list.map(getClient)
        // this.list_clients = [...new Set(this.list_clients)]

        // this.list_clients = this.list_clients.map(function getClient_obj(item) {
        //   return { cliente_nome: item }
        // })

        // this.list_clients = [...new Map(this.list_clients.map(item => [item[key], item])).values()];

        // for (var t=0; t++; t < this.list.length){
        //   this.list_clients = [
        //    {value: "marcelo magalhaes"},{value: "indefinido"},{value: "corais do mar"}
        // ]

        // }
        // this.list_clients = [
        //   {value2: "marcelo magalhaes"},{value2: "indefinido"},{value2: "corais do mar"}
        // ]

        function amount(item) {
          return item.value
        }

        function sum(prev, next) {
          return prev + next
        }

        this.list_total = this.list.map(amount).reduce(sum)
      })
    }
  }
}
</script>
