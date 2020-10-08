<template>
  <div >
    <div v-for="(value, key) in obj" :key="key" >
      <div class=label style="width: 200px;">{{value.label}}</div>
      <div class=select v-if="value.type=='select'">
        <el-select v-model="obj[key].value" placeholder="Selecione" style="width: 200px;">
        <el-option
            v-for="(value_radio, key_radio) in value.options"
            :key="key_radio"
            :label="value_radio.split(',')[0]"
            :value="value_radio.split(',')[1]">
        </el-option>
        </el-select>
      </div>
      <div class=radio v-if="value.type=='radio'">
          <el-radio v-for="(value_radio, key_radio) in value.options" :key="key_radio" v-model="obj[key].value" :label="value_radio.split(',')[1]">{{value_radio.split(',')[0]}}</el-radio>
      </div>
      <div class=textarea v-if="value.type == 'textarea'">
          <el-input
          type="textarea"
          :rows="5"
          style="width:400px"
          v-model="obj[key].value">
          </el-input>
      </div>
      <div  v-if="value.type == 'input'">
          <el-input class=input v-model="obj[key].value" > </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Magaform',
  props: {
    obj: {
      type: Object
    }
  }
}
</script>

<style scoped>
  .label {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 15px;
    font-weight: bold;
    padding-bottom: 5px;
    width: 100%;
  }
  .select, .radio, .textarea, .input {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* font-size: 17px; */
    /* padding-bottom: 15px; */
    margin-left: 0px;
    margin-bottom: 15px;
  }

  .input {
    width: 200px;
  }
</style>
