<template>
  <div class="app-container">
   
    <vue-good-table
      :columns="columns"
      :rows="list"
      :search-options="{enabled: true}"
      max-height="455px"
      theme="black-rhino"
      
    />

   {{list_total}}

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
import { fetchList, create, update, deleteItem } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'

export default {
  name: 'livrocaixa',
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
      list_total: null,
      columns: [
        {
          label: 'ID',
          field: 'id',
          type: 'number',
          width: '50px'
        },
        {
          label: 'Data',
          field: 'date',
          type: 'string',
          width: '180px'
        },
        {
          label: 'Tipo',
          field: 'tipo',
          type: 'string',
          width: '80px'
        },
        {
          label: 'Conta',
          field: 'descricao',
          type: 'string',
          width: '350px'
        },
        {
          label: 'Doc',
          field: 'doc',
          type: 'string'
        },
        {
          label: 'Value',
          field: 'value',
          type: 'decimal'
        },
        {
          label: 'Cliente/Fornecedor',
          field: 'cliente_nome',
          type: 'string'
        },
        {
          label: 'Status',
          field: 'status',
          type: 'string'
        }
      ],
      list: [],
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
    getList() {
      this.listLoading = true
      fetchList('financeiro_livrocaixa_completo', this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)

        function amount(item){
        return item.value;
        }

        function sum(prev, next){
        return prev + next;
        }

        this.list_total = this.list.map(amount).reduce(sum);


      })
    },
  }
}
</script>
