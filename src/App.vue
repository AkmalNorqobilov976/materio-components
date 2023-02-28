<template>
  <nav>
    <p  class="bg-info" v-ripple>Hello</p>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <Button 
    :text="'Button'" 
    :icon="'ri-arrow-left-line'" 
    outlined 
    :bgColor="'blue'" 
    :color="'#ffffff'" 
    :size="'medium'"

  />
  {{ data }}
  <Checkbox v-model="data" :idKey="'haha'" disabled :label="'Label'" :icon="'minus'" circle :color="'blue'"/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./components/buttons/Button.vue";
import Checkbox from "./components/checkbox/Checkbox.vue";

  export default defineComponent({
    components: {
      Button,
      Checkbox
    },
    data() {
      return {
        data: ""
      }
    }
  })
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
