<template>
  <nav>
    <p v-tooltip.bottom class="bg-info" v-ripple>Hello</p>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <date-picker/>
  <TransferList :list-data="lists"/>
  <Tooltip :position="'right'"><span>Hihihi</span></Tooltip>
  <span v-tooltip class="pa-2 secondary" v-ripple>Tooltip directive</span>
  <div class="px-4">
    <Rating :showControl="false"/>
    <Switch color="#affffa" :label="'Salom sizlarga'"/>
  </div>
  <Button 
    v-ripple
    v-tooltip
    :text="'Button'" 
    :icon="'ri-arrow-left-line'" 
    :bgColor="'blue'" 
    :color="'#ffffff'" 
    :size="'large'"
    borderType="rounded"
  />
  
  <!-- <Slider/> -->
  <div>
    <SliderCustom/>
  </div>
  {{ data }}
  <Checkbox v-model="data" :idKey="'haha'" :label="'Label'" :icon="'minus'" circle :color="'blue'"/>
  <Radio class="px-3" v-model="data" value="Nomer" :name="'hi'" circle :color="'red'"/>
  <Radio class="px-3" v-model="data" value="SMS" :name="'hi'" :color="'red'"/>
  <Radio class="px-3" v-model="data" value="Tarif" :name="'hi'" :color="'red'"/>
  <Alert 
    message="Message"
    outlined
    :text="'Something went wrong'" 
    :icon="'ri-arrow-left-line'" 
    :color="'white'" 
    :bg-color="'#afffaa'"
  />
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Alert from "./components/alert/Alert.vue";
import Button from "./components/buttons/Button.vue";
import Checkbox from "./components/checkbox/Checkbox.vue";
import Radio from "./components/radio/Radio.vue";
// import Slider from "./components/slider/Slider.vue";
import SliderCustom from "./components/slider/SliderCustom.vue";
import Rating from "./components/star/Rating.vue";
import Tooltip from "./components/tooltip/Tooltip.vue";
import TransferList from "./components/transferList/TransferList.vue";
import Switch from "./components/switch/Switch.vue";
import DatePicker from "./components/datepicker/DatePicker.vue";
  export default defineComponent({
    components: {
    Button,
    Checkbox,
    Radio,
    Alert,
    TransferList,
    // Slider,
    SliderCustom,
    Tooltip,
    Rating,
    Switch,
        DatePicker
},
    data() {
      return {
        data: "",
        lists: [
          {
            name: "hi",
            value: "HIHIHII"
          },
          {
            name: "bye",
            value: "BYEBYEBYE"
          },
          {
            name: "YEYEYE",
            value: "YEEEYEE"
          }
        ]
      }
    }
  })
</script>
<style lang="scss">
  

</style>