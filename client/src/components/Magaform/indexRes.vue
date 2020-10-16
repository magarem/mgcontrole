<template>
  <div>
    <div v-for="(value, key) in obj" :key="key">

      <div v-if="value.type=='group'" class="select">
        <b>{{value.label}}</b>
      </div>

      {{key}}
      <div class="label" style="width: 200px;">{{ value.label }}</div>
      <div v-if="value.type=='select'" class="select">
        <el-select v-model="obj[key].value" placeholder="Selecione" style="width: 200px;">
          <el-option
            v-for="(value_radio, key_radio) in value.options"
            :key="key_radio"
            :label="value_radio.split('|')[1]"
            :value="value_radio.split('|')[0]"
          />
        </el-select>
      </div>
      <div v-if="value.type=='checkbox'" class="radio">
        <el-checkbox-group v-model="obj[key].value">
          <el-checkbox v-for="op in value.options" :label="op.split('|')[0]" :key="op">{{op.split('|')[1]}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="value.type=='radio'" class="radio">
        <el-radio v-for="(value_radio, key_radio) in value.options" :key="key_radio" v-model="obj[key].value" :label="value_radio.split('|')[0]">{{ value_radio.split('|')[1] }}</el-radio>
      </div>
      <div v-if="value.type == 'textarea'" class="textarea">
        <el-input
          v-model="obj[key].value"
          type="textarea"
          :rows="5"
          style="width:400px"
        />
      </div>
      <div v-if="value.type == 'input'">
        <el-input v-model="obj[key].value" class="input" />
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
