<template>
  <div class="app-container">
      <div style="width: 80%; margin: auto;">
          <vue-good-table
            :columns="columns"
            :rows="list"
            :search-options="{enabled: true}"
            max-height="455px"
            theme="black-rhino"
          />
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

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Autocomplete from '@/components/Autocomplete'
export default {
  name: 'Livrocaixa',
  components: { VueGoodTable, autocomplete: Autocomplete },
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
      filter: {
        cliente: null
      },
      list_total: null,
      columns: [
        {
          label: 'Data',
          field: 'data',
          type: 'string',
          width: '180px'
        },
        {
          label: 'Descrição',
          field: 'desc',
          type: 'string',
          width: '220px'
        },
        // {
        //   label: 'Doc',
        //   field: 'doc',
        //   type: 'string',
        //   width: '180px'
        // },
        {
          label: 'Crédito',
          field: 'valor',
          type: 'decimal',
          width: '250px'
        }
      ],
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
        // find: {
        //     id_cliente_fornecedor: 54,
        //     id_conta: 4
        // }
      }
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
      this.listLoading = true
      fetchList('view_fin_caixa', this.listQuery).then(response => {
        this.list_original = response.data.items
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)

        function getClient(item) {
          // return {cliente_nome: item.cliente_nome};
          return item.cliente_nome
        }

        this.list_clients = this.list.map(getClient)
        this.list_clients = [...new Set(this.list_clients)]

        this.list_clients = this.list_clients.map(function getClient_obj(item) {
          return { cliente_nome: item }
        })

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
