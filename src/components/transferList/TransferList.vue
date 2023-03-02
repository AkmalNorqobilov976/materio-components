<template>
    <div class="transfer-list flex justify-space-around">
        <div class="shadow-18 paper-elevated pa-3 col-5">
            <ul class="list-style-none">
                <li v-for="(list, i) in unTransferedList" :key="i"> 
                    <Checkbox 
                        selectType="value"
                        v-model="leftModelSelect"
                        :value="list" 
                        :label="list[value]" 
                        :color="color"
                        :idKey="idGenerator()"
                    />
                </li>
            </ul>
        </div>
        <div class="col-1 flex flex-direction-column gap-1 align-items-center">
            <div>
                
                <Button @click="onPassToRight" :color="color" :borderType="'circle'" :bgColor="color" :size="'large'" label outlined> 
                    <template #icon>
                        <div class="text-h6 circle pa-2">
                            <i class="ri-arrow-right-s-line"></i>
                        </div>
                    </template> 
                </Button>
            </div>
            <div>
                <Button 
                    @click="onPassToLeft"
                    :color="color"
                    :bgColor="color" 
                    label 
                    outlined
                    :borderType="'circle'"
                > 
                    <template #icon>
                        <div class="text-h6 circle pa-2">
                            <i class="ri-arrow-left-s-line"></i>
                        </div>
                    </template> 
                </Button>
            </div>
        </div>
        <div class="paper-elevated shadow-18 col-5 pa-3">
            <ul class="list-style-none flex flex-direction-column">
                <li v-for="(list, i) in transferedList" :key="i"> 
                    <Checkbox 
                        selectType="value"
                        v-model="rightModelSelect"
                        :value="list" 
                        :idKey="idGenerator()"
                        :label="list[value]" 
                        :color="color"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import ShortUnuqueId from 'short-unique-id'
import Button from "../buttons/Button.vue";
import Checkbox from "../checkbox/Checkbox.vue";
    export default defineComponent({
        props: {
            listData: {
                type: Array as PropType<any>
            },
            value: {
                type: String,
                default: 'value'
            },
            name: {
                type: String,
                default: 'name'
            },
            color: {
                default: '#9155FD'
            },
            selectedList: {
                type: Array as PropType<any>,
                default: () => []
            }
        },
        components: { Checkbox, Button },
        setup(props) {
            const leftModelSelect = ref([]);
            const rightModelSelect = ref([]);

            const leftDataList = ref([ ...props.listData ]);
            const uiid = new ShortUnuqueId({length: 10});
            const rightDataList = ref([ ...props.selectedList ])
            const unTransferedList = computed((() => [ ...leftDataList.value ]));
            const transferedList = computed(() => rightDataList.value)
            const idGenerator = computed(() => {
                return () => uiid();
            });

            const onPassToRight = () => {
                rightDataList.value = [ ...rightDataList.value, ...leftModelSelect.value ];
                for (const obj of leftModelSelect.value) {
                    leftDataList.value = unTransferedList.value?.filter(
                        val => val[props.value] != obj[props.value]
                    )
                }

                leftModelSelect.value = [];
            }


            const onPassToLeft = () => {
                console.log(transferedList.value);
                
                leftDataList.value = [ ...leftDataList.value, ...rightModelSelect.value ];
                for (const obj of rightModelSelect.value) {
                    rightDataList.value = transferedList.value?.filter(
                        val => val[props.value] != obj[props.value]
                    )
                }
                rightModelSelect.value = [];
            }

            return {
                unTransferedList,
                idGenerator,
                leftModelSelect,
                rightModelSelect,
                onPassToRight,
                transferedList,
                onPassToLeft
            }
        }
})
</script>


<style lang="scss" scoped>
</style>