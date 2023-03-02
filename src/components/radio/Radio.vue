<template>
    <div 
        class="checkbox flex align-items-center py-1"
        :class="[  {'flex-direction-row-reverse': right} ]"    
    >
        <input 
            :id="idKey"
            :name="name" 
            type="radio" 
            :style="`--shadow-color: rgba($color: ${color}, $alpha: 0.08);`"  
            :class="[icon, {circle: circle}, { 'after-circle': circle }]" 
            :value="value" 
            v-bind="$attrs"
            @change="updateModel($event)"
        />
        <label :for="idKey" class="text-body1"> {{ label }} </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

    export default defineComponent({
        props: {
            circle: {
                type: Boolean,
                default: false,
            },
            value: {},
            modelValue: {},
            label: {
                type: String
            },
            idKey: {
                type: String
            },
            color: {
                type: String
            },
            icon: {
                type: String as PropType<'check' | 'minus'>,
                default: ''
            },
            name: {
                type: String
            },
            right: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            const updateModel = (e: any) => {
                emit('update:modelValue', e.target.value)
            }
            const iconComputed = computed(() => `rgba($color: ${props.color}, $alpha: 0.08)`)
            return {
                updateModel,
                iconComputed
            }
        }
    })
</script>

<style lang="scss" scoped>
    $checkbox-color: rgba(58, 53, 65, 0.6);

    $color: v-bind(color);
    .checkbox {
        gap: 1.3rem;    
        input[type="radio"] {
            appearance: none;
            padding: .6rem;
            width: 1.6rem;
            aspect-ratio: 1/1;
            // border-radius: .3rem;
            border: .2rem solid $checkbox-color;
            line-height: 2.6rem;
        }
        
        input[type="radio"]:checked {
            outline: .2rem solid v-bind(color);
            outline-offset: .4rem;
            background-color: v-bind(color) !important;
            border: none;
            transition: background-color .3s ease;
            position: relative;
            &::after {
                position: absolute;
                content: '';
                left: -1rem;
                top: -1rem;
                right: -1rem;
                bottom: -1rem;
                background: v-bind(color);
                opacity: .08;
                
                // var(--shadow-color)
            }
        }
        .check:checked {
            background: url('@/assets/icons/checkboxIcons/check.svg') no-repeat ;
            background-size: 1.2rem 1.2rem;
            background-position: center center;

        }

        .minus:checked {
            background: url('@/assets/icons/checkboxIcons/minus.svg') no-repeat ;
            background-size: 1.2rem 1.2rem;
            background-position: center center;

        }

        .circle {
            border-radius: 50% !important;
            width: 1.8rem !important;
            
        }
    }
</style>