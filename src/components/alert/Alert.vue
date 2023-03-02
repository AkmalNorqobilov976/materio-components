<template>
    <div 
        
        class="alert flex align-items-center gap-3 px-3 py-2" 
        :style="isOutlined" 
        :class="[
            { 'flex-direction-row-reverse': right }, 
            borderType 
        ]"
        v-bind="$attrs"
    >
        
        <slot name="icon">
            <i :class="[icon, `text-h6`]" :style="isOutlinedBtn"></i>
            <div v-if="text" 
                :style="isOutlinedBtn"
                class="text-left"
            >
                <p class="text-subtitle1">
                    <slot>{{ text }}</slot>
                </p>
                <p class="text-caption">
                    {{ message }}
                </p>
            </div>
        </slot>
    </div>
</template>

<script lang="ts">
type AlertTypes = 'large' | 'medium' | 'small';
import { computed, defineComponent, PropType } from "vue";

    export default defineComponent({
        props: {
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
                type: String as PropType<AlertTypes>,
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
            },
            message: {
                type: String
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
.alert {
    border-radius: .5rem;
}
</style>