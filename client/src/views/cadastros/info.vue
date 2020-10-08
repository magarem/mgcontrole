<style scoped>
  .teste {
      font-size: 200px !important;
  }
</style>

<template>
  <div class="app-container">
   <el-form ref="dataForm" style='width:70%; margin-left: 50px; '  :model="temp" label-position="top">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Cadastro" name="first">
        <el-row :gutter="10" class="bold center c" style="font-size: 18px; width: 100%;">
        <el-col :span="8">
            <el-form-item label="Nome" >
            <el-input v-model="temp.nome"  />
            </el-form-item>
            <el-form-item label="Tel" >
            <el-input v-model="temp.tel" />
            </el-form-item>
            <el-form-item label="Municipio" >
            <el-input v-model="temp.municipio" />
            </el-form-item>
            <el-form-item label="CEP" >
            <el-input v-model="temp.cep" />
            </el-form-item>
            <el-form-item label="Inscrição Estadual" >
            <el-input v-model="temp.ie" />
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="Nome Fantasia" >
            <el-input v-model="temp.nome_fantasia"  />
            </el-form-item>
            <el-form-item label="Endereço" >
            <el-input v-model="temp.endereco" />
            </el-form-item>
            <el-form-item label="País" >
            <el-input v-model="temp.pais" />
            </el-form-item>
            <el-form-item label="Im" >
            <el-input v-model="temp.im" />
            </el-form-item>
            <el-form-item label="Suframa" >
            <el-input v-model="temp.suframa" />
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="CNPJ" >
            <el-input v-model="temp.doc"  />
            </el-form-item>
            <el-form-item label="Bairro" >
            <el-input v-model="temp.bairro" />
            </el-form-item>
            <el-form-item label="UF" >
            <el-input v-model="temp.uf" />
            </el-form-item>
            <el-form-item label="E-mail" >
            <el-input v-model="temp.email" />
            </el-form-item>
        </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Preferências" name="second">
        <magaform :obj=printer></magaform>
      </el-tab-pane>
    </el-tabs>
    <el-row style="margin-top:15px;">
      <el-col :span='24'>
        <el-form-item>
          <el-button type="primary" @click="dialogStatus==='novo'?createData():updateData()">
            Salvar alterações
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
   </el-form>
  </div>
</template>

<script>
import { fetchList, update } from '@/api/generic'
import magaform from '@/components/Magaform'
export default {
  name: 'Info',
components: { magaform },
  data() {
    return {
      activeName: 'first',
      printer:{
          initCursor: {
            type: 'select',
            label: 'Iniciar cursor em',
            options: ['Código de barras,ean', 'Busca por nome,product_name'],
            value: 'ean'
          },
          width: {
            type: 'input',
            label: 'Largura',
            value: '80mm'
          },
          height: {
            type: 'input',
            label: 'Altura',
            value: '100mm'
          },
          status: {
            type: 'radio',
            label: 'Válido',
            options: ['verdadeiro,true', 'falso,false', 'vazio,nenhum'],
            value: 'false'
          },
          doc: {
            type: 'select',
            label: 'Tipo de doc',
            options: ['Jurídico,juri', 'Físico,fisi', 'Estrangeiro,estran'],
            value: 'fisi'
          },
          ops: {
            type: 'textarea',
            label: 'Opções',
            value: `tomate, cebola, alho, pimentao, limao, banana prata, banana nanica, banana terra, laranja, mamão papaia, abacaxi, maça, manga, pera, batatinha, chuchu, cenoura, beterraba, uva sem semente, repolho, pepino, melancia grande, melão, abacate, kiwi, coco verde, quiabo, inhame, ovos cartela, berinjela, limao siciliano, abobrinha, abobora japonesa, goiaba, alface crespa, rucula, salsa, coentro, couve, hortelan`.trim()}
        },
      tela: '40%',
      tableKey: 0,
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 1,
        sort: 'id DESC',
        find: {
          nome: '',
          doc: ''
        }
      },
      temp: {
        id: undefined
      },
      dialogStatus: '',
      textMap: {
        editar: 'editar',
        novo: 'novo'
      }
    }
  },
  created() {
    this.getList()
    this.x()
  },
  methods: {
    x() {
      if (screen.width < 400) { this.tela = '90%' } else { this.tela = '40%' }
    },
    getList() {
      const self = this
      fetchList('info', this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        console.log('this.list[0]:', this.list[0]);
        this.handleUpdate(this.list[0])
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'editar'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          update('info', tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.$notify({
              title: 'Sucesso',
              message: 'Registro alterado',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>
