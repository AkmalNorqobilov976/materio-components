<template>
    <div 
        class="button inline-flex gap-medium" 
        :style="outlined ? 
            `background-color: ${bgColor}; color: ${color};`
            :  `border: .2rem solid ${bgColor}; color: ${bgColor};`" 
        :class="[{'flex-direction-row-reverse': right}, `btn-${size}` ]">
        <slot name="icon">
            <i :class="icon"></i>
            <button :class="[bgColor, color]" 
            :style="outlined || `color: ${bgColor};`">
                <slot>{{ text }}</slot>
            </button>
        </slot>
    </div>
</template>

<script lang="ts">
type BtnTypes = 'large' | 'medium' | 'small';
import { defineComponent, PropType } from "vue";

    export default defineComponent({
        props: {
            outlined: {},
            icon: {},
            size: {
                type: String as PropType<BtnTypes>,
                default: 'medium'
            },
            bgColor: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: 'action-disabled'
            },

            text: {
                type: String
            },
            right: {
                type: Boolean
            }
        }
    })
</script>

<style lang="scss" scoped>
button {
    outline: none;
    border: none;
    background: transparent;
}

.button {
    border-radius: .5rem;
}
</style>