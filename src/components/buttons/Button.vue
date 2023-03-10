<template>
    <div 
        :aria-disabled="disabled"
        class="button" 
        :style="isOutlined" 
        :class="[
            { 'flex-direction-row-reverse': right }, 
            { 'gap-medium': text }, 
            text && `btn-${size}`, 
            borderType,
            block ? 'block' : 'inline-flex',
            disabled && 'btn-disabled' 
            
        ]"
        v-bind="$attrs"
    >
        
        <slot name="icon">
            <i :class="[icon, !text && `icon-${size}`]" :style="isOutlinedBtn"></i>
            <button v-if="text" 
                :style="isOutlinedBtn">
                <slot>{{ text }}</slot>
            </button>
        </slot>
    </div>
</template>

<script lang="ts">
type BtnTypes = 'large' | 'medium' | 'small';
import { computed, defineComponent, PropType } from "vue";

    export default defineComponent({
        props: {
            block: {
                type: Boolean,
                default: false
            },
            outlined: {
                type: Boolean,
                default: false
            },
            borderType: {
                type: String as PropType<'rounded' | 'circle'>,
                default: "",
            },
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
            disabled: {
                type: Boolean,
                default: false
            },
            text: {
                type: String
            },
            right: {
                type: Boolean
            }
        },

        setup(props) {
            const isOutlined = computed(() => !props.outlined ? 
                `background-color: ${props.bgColor || 'transparent'}; color: ${props.color };` 
                : `border: .1rem solid ${props.bgColor}; color: ${props.bgColor};`
            )
            const isOutlinedBtn = computed(() => 
                props.outlined 
                    ? `color: ${props.bgColor};` 
                    : `color: ${props.color };`
                );
            return {
                isOutlined,
                isOutlinedBtn
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