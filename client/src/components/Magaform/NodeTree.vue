<template>
  <li class="node-tree">
    <span class="label">{{ node.label }}</span><br>
    <Formitens :obj=node />
    <!-- <ul v-if="node.children && node.children.length"> -->
    <ul v-if="node.children">
      <node v-for="child in node.children" :node="child">
      </node>
    </ul>
  </li>
</template>
<style scoped>
  .label {
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
  }
};
</script>