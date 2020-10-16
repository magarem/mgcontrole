<template>
  <div>
    <!-- <div v-for="(value, key) in obj" :key="key"> -->
      <!-- Debug <pre> key: {{key}}, value: {{value}}</pre> -->
      <!-- <div class="label" style="width: 200px;">{{ value.label }}</div> -->
      <!-- <div v-if="obj.type=='parent'" class="select">
        {{obj.label}}
      </div> -->
      <div v-if="obj.type=='select'" class="select">
        <!-- <el-select v-model="obj.value" placeholder="Selecione" style="width: 200px;"> -->
          <select v-model="obj.value" placeholder="Selecione" style="width: 200px;">
            <option 
            v-for="(value_radio, key_radio) in obj.options" :key="key_radio"
            :value="value_radio.split('|')[0]" selected="value_radio.split('|')[0] == obj.value">
            {{value_radio.split('|')[1]}}</option>
          </select>
          <!-- <el-option
            v-for="(value_radio, key_radio) in obj.options"
            :key="key_radio"
            :label="value_radio.split('|')[1]"
            :value="value_radio.split('|')[0]"
          /> -->
        <!-- </el-select> -->
      </div>
      <div v-if="obj.type=='checkbox'" class="radio">
         
        <!-- <div style="border:1px solid black; height: 200px; width: 500px; overflow: auto;"> -->
          <div v-for="op in obj.options" :key="op">
                <div v-if="op.indexOf('|') > -1">
                  <input type="checkbox" :value="op.split('|')[0]" v-model="obj.value">
                  <span for="">{{op.split('|')[1]}}</span>
                </div>
                <div v-else>
                  <input type="checkbox" :value="op" v-model="obj.value">
                  <span for="">{{op}}</span>
                </div>
          </div>
        <!-- <el-checkbox-group v-model="obj.value">
          <el-checkbox v-for="op in obj.options" :label="op.split('|')[0]" :key="op">{{op.split('|')[1]}}</el-checkbox>
        </el-checkbox-group> -->
      </div>
      <div v-if="obj.type=='radio'" class="radio">
        <div v-for="(value_radio, key_radio) in obj.options" :key="key_radio" >
          <input type="radio" :value="value_radio.split('|')[0]" v-model="obj.value"/>
          <span for="">{{value_radio.split('|')[1]}}</span><br>
        </div>
      </div>
      <div v-if="obj.type == 'textarea'" class="textarea">
        <textarea v-model="obj.value" style="width:400px; height:200px;"></textarea>
        <!-- <el-input
          v-model="obj.value"
          type="textarea"
          :rows="5"
          style="width:400px"
        /> -->
      </div>
      <div v-if="obj.type == 'input'">
        <input v-model="obj.value" class="input"  />
      </div>
    </div>
  <!-- </div> -->
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
