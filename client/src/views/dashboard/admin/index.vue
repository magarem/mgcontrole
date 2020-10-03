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
    
      <el-col :span="11">
        <el-card class="box-card" style="width: 100%; height: 490px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Contas dos clientes</span>
          </div>
          <el-table :data="lista2" height="360" highlight-current-row style="width: 100%; font-size: 16px;">
            <el-table-column label="Cliente_nome" prop="cliente_nome" sortable="custom" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.cliente_nome }}</span>
              </template>
            </el-table-column>
             <el-table-column label="N" prop="faturas" sortable="custom" align="center" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.faturas }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Total" prop="total" sortable="custom" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.total | money}}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="text-align: right; font-size: 25px; margin-top: 10px; margin-right: 45px;">Total: {{ttt_}}</div>
        </el-card>
      </el-col>
      <el-col :span="13">
        <el-card class="box-card" style="width: 100%; height: 490px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Contas dos clientes (Percentuais)</span>
          </div>
           <apexchart type="pie" width="380" :options="chartOptions_2" :series="series_2"></apexchart>
        </el-card>
      </el-col>
     
    </el-row><br>
    <el-row :gutter="20">
       <el-col :span="8">
        <el-card class="box-card" style="width: 100%; _height: 490px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Livro caixa (últimos lançamentos)</span>
          </div>
          <el-table :data="list_caixa" height="360" highlight-current-row style="width: 100%; font-size: 16px;">
            <el-table-column label="Data"  width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.date }}</span>
              </template>
            </el-table-column>
             <el-table-column label="N"  width="35">
              <template slot-scope="scope">
                <span>{{ scope.row.n }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Total" align="right" width="130">
              <template slot-scope="scope">
                <span>{{ scope.row.value | money}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card" style="width: 100%; _height: 490px;">
          <div slot="header" class="clearfix">
            <span @click="vai('ultimas vendas')">Livro caixa (últimos lançamentos)</span>
          </div>
        <apexchart width="100%" :options="chartOptions_cash_flow" :series="series_cash_flow"></apexchart>
      </el-card>
      </el-col>
    </el-row>
    <br>
  </div>
</template>

<script>
import { fetchList } from '@/api/generic'
import Pagination from '@/components/Pagination'
export default {
  name: 'DashboardAdmin',
  components: { Pagination },
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
      ttt_: 0,
      chartOptions: {
       
        chart: {
          id: 'vuechart-example'
        },
        
      },
      series: [],
      chartOptions_cash_flow: {
       
        chart: {
          id: 'vuechart-example'
        },
        
      },
      series_cash_flow: [],
      series_2: [],
      chartOptions_2: {
          labels: []
      },
      vendas: {faturado:[], total:[]},
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
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
           if (index === 2) {
              sums[index] =  'R$ ' + values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0).format(2, 3, '.', ',');
           }else{
             sums[index] =  values.reduce((prev, curr) => {
                  const value = Number(curr);
                  if (!isNaN(value)) {
                    return prev + curr;
                  } else {
                    return prev;
                  }
                }, 0);
           }
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      },
    vai(local){
      if (local == 'ultimas vendas') {
        this.$router.push('/relatorios/vendas_total');
      }
    },
    getList() {
      this.listLoading = true
      const self = this
      fetchList('rel_vendas_total', this.listQuery).then(response => {
        this.list = response.data.items.reverse()
        this.chartOptions = {
          chart: {
            id: 'vuechart-example',
            height: '350',
            width: '100%',
            type: 'bar',
            stacked: 'true',
            zoom: {
              enabled: true,
              type: 'x'
            }, 
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            }
          }, 
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '85%',
            }
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
        // var media = (this.list.slice(7).map(function(x){return x.total}).reduce((a, b) => {
        //   return a + b
        // }, 0))
        var media = (this.list.slice(0,7).map(function(x){return x.total}).reduce((a, b) => a + b) / 7); 
        console.log('media:', media.toFixed(2));
        this.series = [
        {
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
        this.total = response.data.total
        this.listLoading = false
        console.log('this.vendas.total:', this.vendas.total);
      })

      fetchList(`
        select f.cliente cliente_id, c.nome cliente_nome, count() faturas, sum(f.valor) total 
        from faturados f, clientes c 
        WHERE f.cliente = c.id
        GROUP by f.cliente
        Order by total`, {tipo: 'sql'})
      .then(response => {
        this.lista2 = response.data.items
        var t1 = this.lista2.map(function(x){return +x.total.toFixed(2)*-1})
        this.ttt_ = 'R$ ' + response.data.items.map(function(x){return +x.total}).reduce((a, b) => {
          return a + b
        }, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).toString();
        //Separa os 5 primeiros
        var lista_5_nomes = this.lista2.slice(0,7).map(function(x){return x.cliente_nome})
        var lista_5_valores = this.lista2.slice(0,7).map(function(x){return +x.total.toFixed(2)*-1})
        
        var ttt0 = this.lista2.slice(7).map(function(x){return +x.total*-1}).reduce((a, b) => {
          return a + b
        }, 0).toFixed(2)

        var lista_completo_nomes = [...lista_5_nomes, 'Outros']
        var lista_completo_valores = [...lista_5_valores, +ttt0]
        
        this.series_2 = lista_completo_valores
        this.chartOptions_2 = {
          chart: {
            width: 550,
            type: 'pie',
          },
          plotOptions: {
            pie: {
              size: 550
            },
             donut: {
      size: '65%',
      background: 'transparent',
      labels: {
        show: false,
        name: {
          show: true,
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: undefined,
          offsetY: -10,
          formatter: function (val) {
            return val
          }
        },
        value: {
          show: true,
          fontSize: '20px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 400,
          color: undefined,
          offsetY: 16,
          formatter: function (val) {
            return val
          }
        },
        total: {
          show: true,
          showAlways: true,
          label: 'Total',
          fontSize: '22px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 600,
          color: '#373d3f',
          formatter: function (w) {
            return this.lista2.map(function(x){return +x.total*-1}).reduce((a, b) => {
              return a + b
            }, 0).toFixed(2)
          }
        }
      }
    },      
  },
         
          labels: lista_completo_nomes,
          
        }
      
      })

      fetchList('cash_flow_total_by_day', {page: 1, limit: 7, sort: '1 ASC'}).then(response => {
        this.list_caixa = response.data.items
        console.log('this.list_caixa:', this.list_caixa);
         this.chartOptions_cash_flow = {
          chart: {
            id: 'vuechart-example',
            height: '350',
            width: '100%',
            type: 'bar',
            stacked: 'true',
            zoom: {
              enabled: true,
              type: 'x'
            }, 
            dropShadow: {
              enabled: true,
              color: '#000',
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2
            }
          }, 
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '85%',
            }
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
            categories: this.list_caixa.map(function(x){return x.date})
          },
          yaxis: {
            title: {
              text: '$ (Valores)'
            },
            max: Math.max(...this.list_caixa.map(function(x){return x.value.toFixed(2)})),
          },
        }
        this.series_cash_flow = [{
          name: 'Total',
          type: "bar",
          data: this.list_caixa.map(function(x){return x.value.toFixed(2)})
        }]
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
