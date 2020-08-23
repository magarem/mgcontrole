<template>
  <div v-if="info" class="app-container">
    <!-- <div v-if="selected" style="padding-top:10px; width: 100%;">
      You have selected <code>{{selected.cliente_id}} - {{selected.cliente}}</code>
      </div> -->

    <!-- <h2>{{ info.name }}</h2> -->
    <el-form ref="form" :model="filter" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- <el-tag v-permission="['admin']">admin</el-tag>
          <el-tag v-permission="['cliente']">cliente</el-tag>
          <div v-if="checkPermission(['admin'])">admin</div> -->
          <!-- <el-form-item v-if="checkPermission(['admin'])" label="Cliente"> -->
          <!-- <div class="autosuggest-container"> -->

          <!-- <vue-autosuggest
                v-if="procura"
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
              </vue-autosuggest> -->
          <!-- </div> -->
          <!-- </el-form-item> -->
        </el-col>
      </el-row>
    </el-form>
    <el-row style="width:95%;  margin:auto;">

      <el-col :span="24">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="clientesListFlg=true" />

          <el-divider direction="vertical" />
          <span v-if="selected.cliente" style="font-size:28px;"><span class="bold">Cliente:</span> {{ selected.cliente }}</span>
          <span v-if="!selected.cliente" style="font-size:25px;">Todos</span>

          <el-divider direction="vertical" />
          <el-button v-if="selected.cliente_id" type="success" @click="temp={}; dialogFormVisible=true">Lançar crédito</el-button>

        </div>
      </el-col>
    </el-row><br>
    <el-row style="font-size:20px; width:95%; margin:auto;">
      <el-col :span="24" :offset="0">
        <div>
          <span v-if="list_total.debito" style="color: red;"> Débitos: {{ (list_total.debito) | money }}</span>

          <el-divider direction="vertical" />
          <span v-if="list_total.credito" style="color: green; "> Créditos: {{ (list_total.credito) | money }}</span>

          <el-divider direction="vertical" />
          <span v-if="(list_total && list_total.credito - list_total.debito)<0" style="color: red;"> Saldo total: {{ (list_total.credito - list_total.debito) | money }}</span>
          <span v-if="(list_total && list_total.credito - list_total.debito)>=0" style="color: green;"> Saldo total: {{ (list_total.credito - list_total.debito) | money }}</span>
        </div>
      </el-col>
    </el-row><br>
    <div style="width:95%; margin:auto;">
      <!-- <vue-good-table
        :columns="columns"
        :rows="list"
        :search-options="{enabled: false}"
        theme="black-rhino"
      /> -->
      <!-- <table id="fifthTable">
        <thead>
          <tr>
            <th v-for="col in columns">{{col}}
              <div class="arrow"  ></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in list">
            <td v-for="col in columns">
              {{row[col]}}
            </td>
          </tr>
        </tbody>
      </table> -->

      <el-table
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 80%;"
      >

        <el-table-column label="Data" prop="created" sortable="custom" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.created }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Cliente" prop="cliente" sortable="custom" align="center" width="390">
          <template slot-scope="scope">
            <span>{{ scope.row.cliente_id }} - {{ scope.row.cliente }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Doc" prop="doc" sortable="custom" align="center" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.pid }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Débito" prop="debito" sortable="custom" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.debito | money }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Crédito" prop="credito" sortable="custom" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.credito | money }}</span>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <!--

                                MODAL AREA

    -->
    <el-dialog title="" :visible.sync="dialogFormVisible" top="5vh" width="40%">
      <div slot="title" style="font-size: 21px; margin: auto;">Adicionar crédito para cliente</div>
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="170px" style="_width: 400px; _margin:0 50px 0 50px; font-size: 20px">
        <el-form-item label="Cliente:" prop="cliente">
          <div style="font-size: 20px; margin: auto;">{{ selected.cliente_id }} - {{ selected.cliente }}</div>
        </el-form-item>
        <el-form-item label="Crédito Valor:" prop="fone">
          <money v-model="temp.credito" v-bind="money" style="width: 50%; _margin-top: 5px; font-size: 22px;" class="el-input__inner" autofocus />
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

    <!-- Clientes busca lista -->
    <el-dialog :visible.sync="clientesListFlg" title="Busca cliente" width="70%" align="center">
      <el-input
        ref="searchClient"
        v-model="searchTermClient"
        placeholder="Nome"
        prefix-icon="el-icon-search"
        style="padding: 5px; width: 100%; color: white; font-size: 20px; background-color: #4C5C7A"
        autocomplete="nope"
      />
      <vue-good-table
        :columns="columns_clientes"
        :rows="filteredOptions[0].data"
        :search-options="{enabled: false, externalQuery: searchTermClient}"
        theme="black-rhino"
        max-height="255px"
        @on-row-click="clienteSet"
      />
      <span slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" @click="clientesListFlg = false">Fechar</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style scoped>
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
        background: #717699;
      }
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
        background: #717699;
      }
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}

.arrow_down {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC')
}
.arrow_up {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=')
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

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
import { getInfo } from '@/api/user'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import { VueAutosuggest } from 'vue-autosuggest'
import { Money } from 'v-money'
import swal from 'sweetalert'
export default {
  name: 'ClientesContas',
  components: { VueGoodTable, VueAutosuggest, Money, swal },
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
      columns_clientes: [
        {
          label: 'Código',
          field: 'cliente_id',
          width: '100px'
        },
        {
          label: 'Nome',
          field: 'cliente',
          type: 'string'
        }
      ],
      searchTermClient: null,
      clientesListFlg: false,
      procura: true,
      info: null,
      token: null,
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
      _columns: [
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
        page: 1,
        limit: 10,
        sort: '1 DESC'
        // find: {
        //   nome: '',
        //   doc: ''
        // }
      }
    }
  },
  computed: {
    columns: function() {
      if (this.list.length == 0) {
        return []
      }
      return Object.keys(this.list[0])
    },
    saldo: function() {
      if (this.list !== null && this.list.length > 0) {
        return this.list[this.list.length - 1].total_parcial
      } else {
        return 0
      }
    },
    filteredOptions() {
      return [
        {
          data: this.list_original.filter(option => {
            return option.cliente.toLowerCase().indexOf(this.query.toLowerCase()) > -1
          })
        }
      ]
    }
  },

  mounted() {
    this.getUser()
    this.getList()
    this.getList_original()
    this.token = getToken()
    if (this.checkPermission(['cliente'])) {
      this.selected.cliente_id = getToken().split(':')[1]
      this.filterHandle()
    }
  },
  methods: {
    clienteSet(params) {
      var row = params.row
      console.log('row:', row)
      this.selected.cliente_id = row.cliente_id
      this.selected.cliente = row.cliente
      this.clientesListFlg = false
      this.filterHandle()
    },
    timeConverter(UNIX_timestamp) {
      console.log('UNIX_timestamp:', UNIX_timestamp)
      if (UNIX_timestamp) {
        if (UNIX_timestamp.indexOf('-') > -1) {
          var date = UNIX_timestamp.split(' ')[0].split('-')
          date = date[2] + '/' + date[1] + '/' + date[0]
          var time = UNIX_timestamp.split(' ')[1]
          var ret = date + ' - ' + time
        } else {
          var a = new Date(+UNIX_timestamp)
          console.log('a:', a)
          var months = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          var year = a.getFullYear()
          // var month = months[a.getMonth()];
          var month = a.getMonth() + 1
          var date = a.getDate()
          var hour = a.getHours()
          var min = a.getMinutes()
          var sec = a.getSeconds()
          var ret = date + '/' + month + '/' + year + ' - ' + hour + ':' + min + ':' + sec
          console.log('log:', time)
        }
      }
      return ret
    },
    checkPermission,
    getUser() {
      var self = this
      getInfo().then(function(x) {
        self.info = x.data
        console.log(self.info)
      })
    },
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
    clearFilterHandle() {
      // Set the Query with finders
      this.listQuery = {
        page: 1,
        limit: 10,
        sort: '1 DESC'
        // find: {
        //   nome: '',
        //   doc: ''
        // }
      }
      this.query = ''
      this.selected = ''

      this.procura = false
      this.$nextTick(function() {
        this.procura = true
      })

      // this.selected.cliente_id = null
      // Get data in server
      this.getList_original()
    },
    filterHandle() {
      // Set the Query with finders
      this.listQuery = {
        page: 1,
        limit: 10,
        sort: '1 DESC',
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

            swal({
              title: 'Operação concluida!',
              text: 'Crédito lançado com sucesso',
              icon: 'success',
              buttons: {
                cancel: {
                  text: 'ok',
                  value: 'new'
                },
                new: {
                  text: 'ok',
                  value: 'new'
                }
              }
            })
              .then((value) => {
                switch (value) {
                  case 'ok':
                    break
                }
              })

            // this.$notify({
            //   title: 'Sucesso',
            //   message: 'Cliente cadastrado',
            //   type: 'success',
            //   duration: 2000
            // })
          })

          this.getList()
        })
      })
    },
    getList() {
      var self = this
      if (this.selected.cliente_id) {
        fetchList('f_clientes_faturados', this.listQuery).then(response => {
          this.total = response.data.total

          this.list = response.data.items

          this.list.map(function(x) {
            return x.created = self.timeConverter(x.created)
          })
        })

        // Pega o total
        fetchList('f_clientes_faturados_total', this.listQuery).then(response => {
          this.list_total = response.data.items[0]
        })
      }
    },
    getList_original() {
      var self = this
      fetchList('f_clientes_faturados').then(response => {
        this.total = response.data.total
        console.log(response.data)
        this.list = response.data.items
        this.list.map(function(x) {
          return x.created = self.timeConverter(x.created)
        })
        console.log('this.list_:', this.list_)
        this.list_original = response.data.items.map(function(item) {
          return { cliente_id: item.cliente_id, cliente: item.cliente }
        })

        this.list_original = this.list_original.reduce((acc, value) => acc.some(i => i.cliente_id === value.cliente_id) ? acc : acc.concat(value), []) // id your uniq key
      })
      // Pega o total
      fetchList('f_clientes_faturados_total', this.listQuery).then(response => {
        console.log('response.data.items:', response.data.items)
        // Do the Sum
        this.list_total = {
          credito: 0,
          debito: 0
        }
        var v = 0
        for (var t = 0; t < response.data.items.length; t++) {
          v = response.data.items[t]
          console.log('v.credito:', v.credito)
          // console.log(response.data.items[t].credito, response.data.items[t].debito)
          // console.log('response.data.items[t].credito:', response.data.items[t].credito);
          this.list_total.credito += v.credito
          this.list_total.debito += v.debito
          // this.list_total += this.list_total.credito - this.list_total.debito
        }
        console.log('this.list_total:', this.list_total)
        // this.list_total = response.data.items[0]
      })
    }
  }
}
</script>
