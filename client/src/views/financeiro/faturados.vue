<template>
  <div class="app-container">
    <h2>Filtro</h2>
    <el-form ref="form" :model="filter" label-width="120px">
      <el-form-item label="Cliente">
        <!-- <el-input v-model="filter.cliente"></el-input> -->
        <!-- <autocomplete ref="nameOfRef" :items=list_clients /> -->
        <el-autocomplete
          class="inline-input"
          v-model="filter.cliente"
          :fetch-suggestions="querySearch"
          placeholder="Please Input"
          value-key = "cliente_nome"
          @select="filterHandle"
          prefix-icon="el-icon-search"
          clearable >
        </el-autocomplete>
      </el-form-item>
     
      
      <el-form-item label="Conta">
        <el-select v-model="filter.id_conta" placeholder="Selecione o tipo de conta">
          <el-option label="venda faturada" value="4"></el-option>
          <el-option label="venda a vista em dinheiro" value="1"></el-option>
        </el-select>
      </el-form-item>
       
      <!--el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="Pick a date" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="Pick a time" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="filterHandle">Filtrar</el-button>
        <el-button @click="getList">Cancel</el-button>
      </el-form-item>
    </el-form>
    <vue-good-table
      :columns="columns"
      :rows="list"
      :search-options="{enabled: true}"
      max-height="455px"
      theme="black-rhino"
    />

    {{ list_total }}

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
import { fetchList} from '@/api/generic'
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
      filter:{
        cliente: null
      },
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
          field: 'data',
          type: 'string',
          width: '180px'
        },
        {
          label: 'cliente',
          field: 'id_cliente',
          type: 'string',
          width: '80px'
        },
        {
          label: 'Cliente Nome',
          field: 'cliente',
          type: 'string',
          width: '380px'
        },
        {
          label: 'Doc',
          field: 'doc',
          type: 'string',
          width: '150px'
        },
        {
          label: 'Valor',
          field: 'valor',
          type: 'decimal'
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
      var list = this.list_clients;
      var results = queryString ? list.filter(this.createFilter(queryString)) : list;
      // call callback function to return suggestions
      cb(results);
    },
    createFilter(queryString) {
      console.log('queryString:', queryString);
      return (item) => {
        console.log('item:', item);
        
        return (item.cliente_nome.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    filterHandle(){
      console.log(this.filter.id_conta);
      this.list = this.list_original
      if (this.filter.id_conta){
        this.list = this.list.filter( x => 
          x.id_conta == this.filter.id_conta
        );
      }
      if (this.filter.cliente){
        this.list = this.list.filter( x => 
          x.cliente_nome == this.filter.cliente
        );
      }else{
        this.getList()
      }
    },
    getList() {
      this.listLoading = true
      fetchList('financeiro_clientes_contas', this.listQuery).then(response => {
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
        this.list_clients = [...new Set(this.list_clients)]; 

        this.list_clients = this.list_clients.map(function getClient_obj(item) {
          return {cliente_nome: item};
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
