<template>
  <div class="switch flex align-items-center gap-2">
    <div>
      <input ref="inputRef" type="checkbox" @change="updateModel($event)" :id="idGenerator" class="switch__input">
      <label :for="idGenerator" class="switch__label"></label>
    </div>
    <span @click="onLabelClick" class="block cursor-pointer text-subtitle1">{{ label }}</span>
  </div>
</template>


<script lang="ts">
import ShortUnuqueId from 'short-unique-id'
import { computed, defineComponent, ref } from "vue";

    export default defineComponent({
      props: {
        color: {
          type: String,
          default: `#4D5056`
        },
        modelValue: {
          
        },
        label: {
          type: String
        }
      },
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        const inputRef = ref<HTMLElement>();
        const uiid = new ShortUnuqueId({length: 10});
        const idGenerator = computed(() => uiid())
        const switchBgColor = computed(() => `${props.color}70`);
        const onLabelClick = () => {
          inputRef.value?.click();
        }
        const updateModel = (e: any) => {
          emit('update:modelValue', e.target.checked);
        }
        return {
          idGenerator,
          switchBgColor,
          updateModel,
          inputRef,
          onLabelClick
        }
      }
    })
</script>
<style lang="scss" scoped>
  .switch {

    &__label {
      position: relative;
      display: inline-block;
      width: 4.5rem;
      height: 2rem;
      background: $secondary-dark;
      border-radius: 2rem;
      opacity: .8;
      transition: all .3s;


      &::after {
        content: '';
        background: $white;
        position: absolute;
        // height: 1.8rem;
        width: 2.2rem;
        aspect-ratio: 1/1;
        border-radius: 1.8rem;
        left: -.1rem;
        top: -.1rem;
        transition: all .3s;
      }
      &::before {
        content: '';
        position: absolute;
        width: 4.4rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background: $secondary-dark;
        opacity: .2;
        left: -(4.4rem-2.2rem)/2;
        top: -(4.4rem-2.2rem)/2;
        transition: all .3s;
      }
    }
    input[type="checkbox"] {
      display: none;
    }
    input[type="checkbox"]:checked + &__label {
      background: v-bind(switchBgColor);
      &::after { 
        transform: translateX(2.5rem);
        background: v-bind(color);
      }
       &::before { 
        transform: translateX(2.5rem);
        background: v-bind(color);
        opacity: .2;
      }

    } 

    input[type="checkbox"]:checked + &__label {
      // background: blue;
    } 


  }
</style>