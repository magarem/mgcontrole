<template>
  <div class="tree">
    <span class="tree-list">
      <node-tree :node="treeData"></node-tree>
    </span>
  </div>
</template>

<script>
import NodeTree from "./NodeTree.vue";

export default {
  props: {
    treeData: Object
  },
  components: {
    NodeTree
  }
} 
</script>

<style>
.tree-list ul {
  
  padding-left: 26px;
  margin: 10px 0;
}
</style>