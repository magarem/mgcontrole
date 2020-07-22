<template>
  <div class="app-container">
    <!-- <div v-if="selected" style="padding-top:10px; width: 100%;">
      You have selected <code>{{selected.cliente_id}} - {{selected.cliente}}</code>
      </div> -->
    <h1 v-if="list[0]">{{ list[0].cliente }}</h1>

    <el-form ref="form" :model="filter" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- <el-tag v-permission="['admin']">admin</el-tag>
          <el-tag v-permission="['cliente']">cliente</el-tag>
          <div v-if="checkPermission(['admin'])">admin</div> -->
          <el-form-item v-if="checkPermission(['admin'])" label="Cliente">
            <div class="autosuggest-container">
              <vue-autosuggest
                v-model="query"
                :suggestions="filteredOptions"
                :get-suggestion-value="getSuggestionValue"
                :input-props="{id:'autosuggest__input', placeholder:'Cliente'}"
                @focus="focusMe"
                @click="clickHandler"
                @input="onInputChange"
                @selected="onSelected"
              >
                <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                  <div style="{ display: 'flex', color: 'navyblue'}">{{ suggestion.item.cliente }}</div>
                </div>
              </vue-autosuggest>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item v-if="checkPermission(['admin'])">
            <el-button type="primary" @click="filterHandle">Filtrar</el-button>
            <el-button type="success" @click="temp={}; dialogFormVisible=true">Lançar crédito</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <div style="font-size:30px;">
            <span v-if="(list_total.credito - list_total.debito)<0" style="color: red;"> Saldo: {{ (list_total.credito - list_total.debito) | money }}</span>
            <span v-if="(list_total.credito - list_total.debito)>=0" style="color: green;"> Saldo: {{ (list_total.credito - list_total.debito) | money }}</span>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div style="width:95%; margin:auto;">
      <vue-good-table
        :columns="columns"
        :rows="list"
        :search-options="{enabled: false}"
        theme="black-rhino"
      />
    </div>
    <!--

                                MODAL AREA

    -->
    <el-dialog title="" :visible.sync="dialogFormVisible" top="5vh" width="50%">
      <div slot="title" style="font-size: 35px;">Adicionar crédito para cliente</div>
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="170px" style="_width: 400px; _margin:0 50px 0 50px; font-size: 20px">
        <el-form-item label="Cliente:" prop="cliente">
          <div style="font-size: 30px; margin: auto;">{{ selected.cliente_id }} - {{ selected.cliente }}</div>
        </el-form-item>
        <el-form-item label="Crédito Valor:" prop="fone">
          <money v-model="temp.credito" v-bind="money" style="width: 50%; _margin-top: 5px; font-size: 22px;" class="el-input__inner" />
        </el-form-item>
        <el-form-item label="Doc:" prop="endereco">
          <el-input v-model="temp.doc" style="width: 50%; _margin-top: 5px; font-size: 22px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">
          Cancela
        </el-button>
        <el-button type="success" @click="createData">
          Confirma
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style scoped>
.autosuggest-container {
  display: flex;
  justify-content: center;
  font-size: 22px;
  width: 280px;
}

#autosuggest { width: 100%; display: block;}
.autosuggest__results-item--highlighted {
  background-color: rgba(51, 217, 178,0.2);
}
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
import { getToken } from '@/utils/auth'
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import { fetchList, create } from '@/api/generic'
import waves from '@/directive/waves' // waves directive

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { VueAutosuggest } from 'vue-autosuggest'
import { Money } from 'v-money'
export default {
  name: 'ClientesContas',
  components: { VueGoodTable, VueAutosuggest, Money },
  directives: { waves, permission },
  filters: {
    money(value) {
      if (typeof value !== 'number') {
        return value
      }
      const formatter = new Intl.NumberFormat('pt', {
        style: 'currency',
        currency: 'BRL'
      })

      return formatter.format(value)
    },
    booleanChange(value) {
      var ret = 'Não'
      if (value === 1) ret = 'Sim'
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
    }
  },
  data() {
    return {
      user_id: '',
      list_total: {
        debito: 0,
        credito: 0
      },
      query: '',
      selected: {},
      dialogStatus: '',
      temp: {},
      list_clients: [],
      dialogFormVisible: false,
      filter: {
        cliente: null
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      columns: [
        {
          label: 'Data',
          field: 'created',
          type: 'string',
          width: '180px'
        },
        {
          label: 'cliente',
          field: 'cliente_id',
          type: 'string',
          width: '80px'
        },
        {
          label: 'cliente',
          field: 'cliente',
          type: 'string',
          width: '200px'
        },
        {
          label: 'Doc',
          field: 'pid',
          type: 'integer',
          width: '80px'
        },
        {
          label: 'Débito',
          field: 'debito',
          type: 'decimal',
          width: '180px'
        },
        {
          label: 'Crédito',
          field: 'credito',
          type: 'decimal',
          width: '180px'
        }
        // {
        //   label: 'Crédito',
        //   field: 'credito',
        //   type: 'decimal',
        //   width: '80px'
        // },
        // {
        //   label: 'Saldo',
        //   field: 'saldo',
        //   type: 'decimal',
        //   width: '80px'
        // },
        // {
        //   label: 'Saldo total',
        //   field: 'total_parcial',
        //   type: 'decimal',
        //   width: '120px'
        // }
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
  computed: {
    saldo: function() {
      if (this.list !== null && this.list.length > 0) {
        return this.list[this.list.length - 1].total_parcial
      }else{
        return 0
      }
    },
    filteredOptions() {
      return [
        // {
        //   data: this.suggestions[0].data.filter(option => {
        //     return option.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        //   })
        // }
        {
          data: this.list_original.filter(option => {
            return option.cliente.toLowerCase().indexOf(this.query.toLowerCase()) > -1
          })
        }
      ]
    }
  },

  mounted() {
    this.getList()
    this.getList_original()
    if (this.checkPermission(['cliente'])) {
      this.selected.cliente_id = getToken().split(':')[1]
      this.filterHandle()
    }
  },
  methods: {
    checkPermission,
    clickHandler(item) {
      // event fired when clicking on the input
    },
    onSelected(item) {
      this.selected = item.item
      this.filterHandle()
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text)
    },
    getSuggestionValue(suggestion) {
      return suggestion.item.cliente
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    },
    filterHandle() {
      // Set the Query with finders
      this.listQuery = {
        find: {
          cliente_id: this.selected.cliente_id
        }
      }
      // Get data in server
      this.getList()
    },
    createData() {
      this.temp.cliente_id = this.selected.cliente_id
      this.temp.debito = 0

      this.temp1 = {
        pid: 0,
        origem_tabela: 'f_pg_faturado',
        origem_tabela_id: 0,
        destino_tabela: 'faturas',
        destino_tabela_id: 0,
        valor: this.temp.credito
      }
      create('financeiro_operacoes', this.temp1).then((ret) => {
        var top_id = ret.data.id
        console.log('top_id:', top_id)

        this.temp2 = {
          pid: top_id,
          origem_tabela: 'faturas',
          origem_tabela_id: null,
          destino_tabela: 'clientes',
          destino_tabela_id: this.temp.cliente_id,
          valor: this.temp.credito
        }
        create('financeiro_operacoes', this.temp2).then((ret) => {
          var last_id = ret.data.id
          this.temp3 = {
            pid: last_id,
            origem_tabela: 'clientes',
            origem_tabela_id: this.temp.cliente_id,
            destino_tabela: 'caixa',
            destino_tabela_id: null,
            valor: this.temp.credito
          }

          create('financeiro_operacoes', this.temp3).then((ret) => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Cliente cadastrado',
              type: 'success',
              duration: 2000
            })
          })

          this.getList()
        })
      })
    },
    getList() {
      if (this.selected.cliente_id) {
        fetchList('f_clientes_faturados', this.listQuery).then(response => {
          this.total = response.data.total
          this.list = response.data.items
        })

        // Pega o total
        fetchList('f_clientes_faturados_total', this.listQuery).then(response => {
          this.list_total = response.data.items[0]
        })
      }
    },
    getList_original() {
      fetchList('f_clientes_faturados').then(response => {
        this.total = response.data.total
        console.log(response.data)
        this.list_original = response.data.items.map(function(item) {
          return { cliente_id: item.cliente_id, cliente: item.cliente }
        })
        this.list_original = this.list_original.reduce((acc, value) => acc.some(i => i.cliente_id === value.cliente_id) ? acc : acc.concat(value), []) // id your uniq key
      })
    }
  }
}
</script>
