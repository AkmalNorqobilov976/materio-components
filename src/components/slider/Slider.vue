<template>
    <div class="slider">
        <div class="slider-styled"  ref="rangeRef" id="slider-round"></div>
    </div>
</template>

<script lang="ts">
    import * as noUiSlider from 'nouislider';
    import 'nouislider/dist/nouislider.css';
import { defineComponent, onMounted, PropType, ref } from 'vue';
    export default defineComponent({
        props: {
            max: {
                type: Number,
                default: 100
            },
            min: {
                type: Number,
                default: 0
            },
            modelValue: {

            },
            step: {
                type: Number,
                default: 1
            },
            orientation: {
                type: String as PropType<'horizontal' | 'vertical'>,
                default: 'horizontal'
            }
        },
        setup(props) {
            const rangeRef = ref<any>();
            onMounted(() => {
                noUiSlider.create(rangeRef.value, {
                    range: {
                        max: props.max,
                        min: props.min
                    },
                    start: props.modelValue || 0,
                    orientation: props.orientation,
                    behaviour: 'tap-drag',
                    tooltips: true,
                    step: props.step,
                    // pips: {
                    //     // mode: 'steps',
                    //     // stepped: true,
                    //     // density: 4
                    // }
                })
            })
            return {
                rangeRef
            }
        }
    })
</script>

<style lang="scss" scoped>
    #slider-round {
        height: 10px;
    }

    #slider-round .noUi-connect {
        background: #c0392b;
    }

    #slider-round .noUi-handle {
        height: 18px;
        width: 18px;
        top: -5px;
        right: -9px; /* half the width */
        border-radius: 9px !important;
    }
</style>