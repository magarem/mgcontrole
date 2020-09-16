<style scoped>
  .produto_button  {
    width: 98%;
    height: 83px;
    background-color: #d4d3d3;
    /* background-color: white; */
    border: none;
    margin: 1px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.19);
    /* border-radius: 25px; */
  }
  .produto_button  img{
    width: 98%;
  }

</style>

<template>
    <div>
        <!-- <button v-on:click="count++">You clicked me {{ count }} times.</button> -->
        <el-row :gutter="0" style="margin-left: -16px; margin-right: -16px; margin-top: -17px;">
            <el-col v-for="(row, rindex) in atalhos.itens" :key="rindex">
                <button class="produto_button"  @click="productSet('tomate')"><img :src="'tomate' | img_mini(produtos)"> </button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  name: 'ProductsThumbGridItem',
  filters: {
    img_mini: function(value, produtos) {
      var a = produtos.filter(item => item.descricao == value)[0]
      if (a) return a.img_mini
    },
  data: function () {
    return {
      atalhos:{
        itens:['tomate', 'pera']
      },
      count: 0
    }
  }
}
</script>