<template>
  <li class="node-tree">
    <span class="label" v-if=node.label>{{ capitalizeFirstLetter(node.label) }}</span><br>
    <Formitens :obj=node />
    <!-- <ul v-if="node.children && node.children.length"> -->
    <ul v-if="node.children">
      <node v-for="child in node.children" :node="child">
      </node>
    </ul>
  </li>
</template>
<style scoped>
  li {
    list-style:none;
  }
  .label {
    list-style:none;
    font-size: 17px;
    font-weight: bold;
  }
</style>
<script>
import Formitens from "./Formitens.vue";
export default {
  name: "node",
  components: {
    Formitens
  },
  props: {
    node: Object
  },
  methods: {
    capitalizeFirstLetter(string) {
      console.log('string:', string);
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }
};
</script>