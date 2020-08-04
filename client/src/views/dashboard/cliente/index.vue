<template>
  <div class="dashboard-cliente-container">
    <div class="clearfix">
      <h1>Área do cliente</h1>
      <h2>Bem vindo, {{ user }}</h2>
      <router-link to="/financeiro/clientes_contas" tag="button">Ir para minha conta</router-link>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
// import { getToken } from '@/utils/auth' // get token from cookie
import { getInfo } from '@/api/user'

export default {
  name: 'Dashboardcliente',
  components: { PanThumb},
  data() {
    return {
      user: null,
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  created() {
    this.getUser()
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    getUser(){
      var self = this
      getInfo().then(function(x){
          self.user = x.data.name;
          console.log(self.user);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-cliente-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
