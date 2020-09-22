<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%; max-height: 1200px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Vendas (últimos 7 dias)</span>
          </div>
          <apexchart width="100%" :options="chartOptions" :series="series"></apexchart>
           <!-- <line-chart :chart-data="vendas" /> -->
        </el-card>
      </el-col>
    </el-row><br>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Total de vendas por dia</span>
          </div>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
           
            highlight-current-row
            style="width: 100%; _font-size: 18px;"
            >
            <el-table-column label="Data" prop="data" sortable="custom" align="center" width="115">
              <template slot-scope="scope">
                <span>{{ scope.row.data }}</span>
              </template>
            </el-table-column>

            <el-table-column label="#" prop="n" sortable="custom" align="center" width="55">
              <template slot-scope="scope">
                <span>{{ scope.row.n }}</span>
              </template>
            </el-table-column>

            <el-table-column label="Total" prop="total" sortable="custom" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.total | money }}</span>
              </template>
            </el-table-column>
          
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%; max-height: 500px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Contas dos clientes</span>
          </div>
          <el-table :data="lista2"  highlight-current-row style="width: 100%; font-size: 17px;">
            <el-table-column label="Cliente_nome" prop="cliente_nome" sortable="custom" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.cliente_nome }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Total" prop="total" sortable="custom" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.total | money}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%; max-height: 500px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Movimento do caixa</span>
          </div>
          <el-table :data="list_caixa"  fit highlight-current-row style="width: 100%; font-size: 17px;">
            <el-table-column label="Data" prop="Data" sortable="custom" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.data }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Desc" prop="desc" sortable="custom" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.desc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Valor" prop="valor" sortable="custom" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.valor | money}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row><br>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Total de vendas por dia</span>
          </div>
          <bar-chart />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%; max-height: 400px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Contas dos clientes</span>
          </div>
           <pie-chart />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" style="width: 100%; max-height: 400px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Movimento do caixa</span>
          </div>
           <line-chart :chart-data="vendas" />
        </el-card>
      </el-col>
    </el-row>
    <br>
    <!-- <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 100, 100, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
import { fetchList } from '@/api/generic'
import Pagination from '@/components/Pagination'
import Teste from './components/Teste'
export default {
  name: 'DashboardAdmin',
  components: { Teste, Pagination, BarChart, PieChart, LineChart },
  // components: {
  //   GithubCorner,
  //   PanelGroup,
  //   LineChart,
  //   RaddarChart,
  //   PieChart,
  //   BarChart,
  //   TransactionTable,
  //   TodoList,
  //   BoxCard
  // },
  filters: {
     data(value){
      return moment(+value).format('DD-MM-YYYY, hh:mm:ss a')
    },
    decimal(value) {
      if (!value) return '0'
      return parseFloat(value).toFixed(2)
    },
    money(value) {
      if (!value) return 'R$ 0'
      value = value.toFixed(2).toString()
      if (value.indexOf('.') == -1) {
        value += ',00'
      }
      return 'R$ ' + value.replace('.', ',')
    }
  },
  data() {
    return {
       chartOptions: {
            dataLabels: {
              enabled: true,
            },
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }],
       vendas: {faturado:[], total:[]},
       lineChartData: lineChartData.newVisitis,
       lista2: [],
       listLoading: true,
       tableKey: 0,
       total: 0,
       list_caixa: [],
       list: [],
        listQuery: {
        tipo: 1,
        page: 1,
        limit: 7,
        sort: '1 ASC',
        find: {
          nome: '',
          doc: ''
        }
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    vai(local){
      if (local == 'ultimas vendas') {
        this.$router.push('/relatorios/vendas_total');
      }
    },
    getList() {
      // const changeValue = (list, prop) => {
      //   return list.map(item => {
      //     const obj = Object.assign({}, item);
      //     obj[prop] = "$" + obj[prop].toFixed(2)
      //     return obj;
      //   });
      // }
      this.listLoading = true
      const self = this
      fetchList('rel_vendas_total', this.listQuery).then(response => {
        this.list = response.data.items.reverse()
        this.chartOptions = {
         chart: {
            height: '350',
            width: '100%',
            type: 'bar',
            stacked: 'true',
            zoom: {
              enabled: true,
              type: 'x'
            }, dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
          }, 
           plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '85%',
               
              },
            },
             dataLabels: {
              enabled: true
            },
           tooltip: {
              followCursor: true,
              shared: false
            },
            markers: {
              size: 0,
              fillOpacity: 0,
              strokeOpacity: 0
            },
          stroke: {
            width: 1,
          },
          xaxis: {
            categories: this.list.map(function(x){return x.data})
          },
           yaxis: {
              title: {
                text: '$ (Valores)'
              },
              max: Math.max(...this.list.map(function(x){return x.total.toFixed(2)})),
            },
        }
        this.series = [{
          name: 'Total',
          type: "line",
          data: this.list.map(function(x){return x.total.toFixed(2)})
        },{
          name: 'A Vista',
          type: "bar",
          data: this.list.map(function(x){return (x.dinheiro + x.cartao).toFixed(2)})
        },{
          name: 'Faturado',
          type: "bar",
          data: this.list.map(function(x){return x.faturado.toFixed(2)})
        }]
        //this.series.data = this.list.map(function(x){return x.faturado})
        // this.vendas.faturado = this.list.map(function(x){return x.faturado})
        // this.vendas.avista = this.list.map(function(x){return x.dinheiro+x.cartao})
        this.total = response.data.total
        this.listLoading = false
        console.log('this.vendas.total:', this.vendas.total);
      })
      

      fetchList(`
        select f.cliente cliente_id, c.nome cliente_nome, count() faturas, sum(f.valor) total 
        from faturados f, clientes c 
        WHERE f.cliente = c.id
        GROUP by f.cliente
        Order by total limit 7`, {tipo: 'sql'}).then(response => {
        this.lista2 = response.data.items
        // this.lista2 = changeValue(this.lista2, this.lista2.total)
        console.log('lista2:', this.lista2);
      })

      fetchList('view_fin_caixa', this.listQuery).then(response => {
        this.list_caixa = response.data.items
        this.listLoading = false
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
