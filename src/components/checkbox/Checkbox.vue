<template>
    <div 
        class="checkbox flex align-items-center"
        :class="[  {'flex-direction-row-reverse': right} ]"
    >
        <input 
            :id="idKey" 
            type="checkbox" 
            :style="`--shadow-color: rgba($color: ${color}, $alpha: 0.08);`"  
            :class="[icon, { circle: circle }]" 
            :value="value" 
            v-model="model"
            />
            <!-- @change="updateModel($event)" -->
        <label :for="idKey" class="text-body1"> {{ label }} </label>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

    export default defineComponent({
        props: {
            selectType: {
                type: String as PropType<'value' | 'checked'>,
                default: 'checked'
            },
            right: {
                type: Boolean,
                default: false
            },
            circle: {
                type: Boolean,
                default: false,
            },
            modelValue: {
                type: [Array, Boolean]
            },

            value: {
                type: [Boolean, Object]
            },
            label: {
                type: String
            },
            idKey: {
                type: String as PropType<any>
            },
            color: {
                type: String
            },
            icon: {
                type: String as PropType<'check' | 'minus'>,
                default: 'check'
            }
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {

            const model = computed(({
                get() {
                    return props.modelValue
                },
                set(value) {
                    emit('update:modelValue', value)
                }
            }))
            const updateModel = (e: any) => {
                emit('update:modelValue', e.target[props.selectType])
            }
            const iconComputed = computed(() => `rgba($color: ${props.color}, $alpha: 0.08)`)
            return {
                updateModel,
                iconComputed,
                model
            }
        }
    })
</script>

<style lang="scss" scoped>
    $checkbox-color: rgba(58, 53, 65, 0.6);

    $color: v-bind(color);
    .checkbox {
        gap: 1.3rem;    
        input[type="checkbox"] {
            appearance: none;

            width: 1.6rem;
            aspect-ratio: 1/1;
            border-radius: .3rem;
            border: .1rem solid $checkbox-color;
            line-height: 2.6rem;
        }
        
        input[type="checkbox"]:checked {
            background-color: v-bind(color) !important;
            border: none;
            transition: background-color .3s ease;
            position: relative;
            &::after {
                position: absolute;
                content: '';
                z-index: -1;
                left: -1rem;
                top: -1rem;
                right: -1rem;
                bottom: -1rem;
                background: v-bind(color);
                opacity: .08;
                border-radius: 50%;
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