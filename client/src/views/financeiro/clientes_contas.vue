<template>
  <div class="app-container">
      <!-- <div v-if="selected" style="padding-top:10px; width: 100%;">
      You have selected <code>{{selected.cliente_id}} - {{selected.cliente}}</code>
      </div> -->
    <el-form ref="form" :model="filter" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="5">
           
            <el-form-item label="Cliente">
                <div class="autosuggest-container">
                <vue-autosuggest
                    v-model="query"
                    :suggestions="filteredOptions"
                    @focus="focusMe"
                    @click="clickHandler"
                    @input="onInputChange"
                    @selected="onSelected"
                    :get-suggestion-value="getSuggestionValue"
                    :input-props="{id:'autosuggest__input', placeholder:'Cliente'}">
                    <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                    <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.cliente}}</div>
                    </div>
                </vue-autosuggest>
                </div>
            </el-form-item>
            
        </el-col>
        <el-col :span="8">
            <el-form-item>
                
                <el-button type="primary" @click="filterHandle">Filtrar</el-button>
                <el-button type="success" @click="dialogFormVisible=true">Lançar crédito</el-button>
                
            </el-form-item>
        </el-col>
        <el-col :span="9">
            <div  style="font-size:30px;">
                   <span v-if="saldo<0" style="color: red;"> Saldo: {{ saldo | money}}</span>
                   <span v-if="saldo>=0" style="color: green;"> Saldo: {{ saldo | money}}</span>
            </div>
        </el-col>
      </el-row>
      
    </el-form>
    <vue-good-table
      :columns="columns"
      :rows="list"
      :search-options="{enabled: true}"
      max-height="355px"
      theme="black-rhino"
    />

    <el-dialog :title="textMap[dialogStatus]" align="center" :visible.sync="dialogFormVisible" top="5vh" width="70%">
      <el-form ref="dataForm" :model="temp"  label-position="right" label-width="180px" style="_width: 400px; margin:0 50px 0 50px; font-size: 20px">
        <el-row :gutter="20">
          <el-col :span="24">
             <el-form-item label="Cliente" style="font-size: 20px;">
                <div class="autosuggest-container">
                    <vue-autosuggest
                        v-model="query"
                        :suggestions="filteredOptions"
                        @focus="focusMe"
                        @click="clickHandler"
                        @input="onInputChange"
                        @selected="onSelected"
                        :get-suggestion-value="getSuggestionValue"
                        :input-props="{id:'autosuggest__input', placeholder:'Nome'}">
                        <div slot-scope="{suggestion}" style="display: flex; align-items: center;">
                        <div style="{ display: 'flex', color: 'navyblue'}">{{suggestion.item.cliente}}</div>
                        </div>
                    </vue-autosuggest>
                </div>
        </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="Crédito Valor" prop="fone">
              <money v-model="temp.credito" v-bind="money" style="width: 100%; margin-top: 5px; font-size: 22px;" class="el-input__inner" />
            </el-form-item>
            <el-form-item label="Doc" prop="endereco">
              <el-input v-model="temp.doc" />
            </el-form-item>
          </el-col>
        </el-row>
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
import { fetchList, create } from '@/api/generic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import Autocomplete from '@/components/Autocomplete'
// import VueSuggestion from 'vue-suggestion'
// import 'vue-suggestion/dist/vue-suggestion.css';
import { VueAutosuggest } from 'vue-autosuggest';
import itemTemplate from './item-template.vue';
import { Money } from 'v-money'
export default {
  name: 'Clientes_contas',
  components: { VueGoodTable, autocomplete: Autocomplete, VueAutosuggest, Money},
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

      query: "",
      selected: "",
      dialogStatus: '',
      temp: {},
      list_clients: [],
      dialogFormVisible: false,
      filter: {
        cliente: null
      },
      list_total: null,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
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
          field: 'cliente_id',
          type: 'string',
          width: '80px'
        },
        {
          label: 'cliente nome',
          field: 'cliente',
          type: 'string',
          width: '200px'
        },
        {
          label: 'Doc',
          field: 'doc',
          type: 'integer',
          width: '40px'
        },
        {
          label: 'Débito',
          field: 'debito',
          type: 'decimal',
          width: '80px'
        },
        {
          label: 'Crédito',
          field: 'credito',
          type: 'decimal',
          width: '80px'
        },
        {
          label: 'Saldo',
          field: 'saldo',
          type: 'decimal',
          width: '80px'
        },
        {
          label: 'Saldo total',
          field: 'total_parcial',
          type: 'decimal',
          width: '120px'
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
      this.getList_original()
//    this.list_original = this.getList()
//    this.list = this.getList()
  },
  computed: {
    saldo: function(){
        if (this.list !== null && this.list.length > 0){
            return this.list[this.list.length-1].total_parcial
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
            return option.cliente.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          })
        }
      ];
    }
  },
  methods: {
    clickHandler(item) {
      // event fired when clicking on the input
    },
    onSelected(item) {
      this.selected = item.item;
    },
    onInputChange(text) {
      // event fired when the input changes
      console.log(text)
    },
    /**
     * This is what the <input/> value is set to when you are selecting a suggestion.
     */
    getSuggestionValue(suggestion) {
      return suggestion.item.cliente;
    },
    focusMe(e) {
      console.log(e) // FocusEvent
    },

    itemSelected (item) {
      this.item = item;
    },
    setLabel (item) {
      return item.name;
    },
    inputChange (text) {
      // your search method
      this.items = items.filter(item => item.name.contains(text));
      // now `items` will be showed in the suggestion list
    },
    querySearch(queryString, cb) {
      var links = this.list_clients
      var results = queryString ? links.filter(this.createFilter(queryString)) : links
      // call callback function to return suggestion objects
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    filterHandle() {
        //Set the Query with finders
        this.listQuery = {
            find:{
                cliente_id: this.selected.cliente_id
            }
        }
        //Get data in server
        this.getList()
    //   console.log(this.filter.id_conta)
    //   this.list = this.list_original
    //   if (this.filter.id_conta) {
    //     this.list = this.list.filter(x =>
    //       x.id_conta == this.filter.id_conta
    //     )
    //   }
    //   if (this.selected.cliente) {
    //     this.list = this.list.filter(x =>
    //       x.cliente == this.selected.cliente
    //     )
    //   } else {
    //     this.getList()
    //   }
    },
    createData() {
    //   this.$refs['dataForm'].validate((valid) => {
        // if (valid) {
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
         this.temp.cliente_id = this.selected.cliente_id
         this.temp.debito = 0
         create('financeiro_clientes_contas', this.temp).then((ret) => {
            // this.temp.id = response.data
            console.log('response.data:', ret.data.id)
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Sucesso',
              message: 'Cliente cadastrado',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        // }
    //   })
    },
    handleSelect() {
      console.log(this.state)
    },
    handleIconClick() {},
    // getList() {
    //   this.listLoading = true
    //    fetchList('view_financeiro_clientes_contas', this.listQuery).then(response => {
    //     // this.list_original = response.data.items
    //     this.total = response.data.total
    //     this.list_total = this.list.map(amount).reduce(sum)
    //   })
    // },
    getList()  {
        if (this.selected.cliente_id){
            fetchList('view_financeiro_clientes_contas', this.listQuery).then(response => {
                // this.list_original = response.data.items
                this.total = response.data.total
                console.log('!!')
                // console.log(response.data.items);
                this.list = response.data.items
            })
        }
    },
    getList_original()  {
            fetchList('view_financeiro_clientes_contas').then(response => {
                // this.list_original = response.data.items
                this.total = response.data.total
                console.log('!!')
                // console.log(response.data.items);
                this.list_original = response.data.items.map(function(item){
                    return {cliente_id: item.cliente_id, cliente: item.cliente}
                })
                //Distinct
                // this.list_original.reduce((x, y) => x.findIndex(e=>e.cliente_id==y.cliente_id)<0 ? [...x, y]: x, [])
                // this.list_original = this.list_original.filter((s1, pos, arr) => this.list_original.findIndex((s2)=>s2.cliente_id === s1.cliente_id) === pos});
                this.list_original = this.list_original.reduce((acc, value) => acc.some(i => i.cliente_id === value.cliente_id) ? acc : acc.concat(value), []); // id your uniq key
            })
    }
  }
}
</script>
