<template>
    {{ selectedMonth }}
    <div class="datepicker paper-elevated inline-block pa-2">
        <div class="datepicker-calendar inline-block">
            <div class="datepicker-calendar--header text-subtitle1">
                <div class="datepicker-calendar--header__dates">
                    <span class="datepicker-calendar--header__dates year-and-month">
                        <span class="pick-month">
                            <select v-model="selectedMonth" class="text-subtitle1" name="" id="">
                                <option 
                                    v-for="(month, i) in months" 
                                    :key="i"
                                    :value="i"
                                >
                                    {{ month }}
                                </option>
                            </select>
                        </span>
                        <span class="pick-year">
                            <select v-model="selectedYear" class="text-subtitle1">
                                <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
                            </select>
                        </span>
                    </span>
                    <button @click="onSubstractionMonth" class="month-change go-to-previous-month text-subtitle1"> {{'<'}} </button>
                    <button @click="onAddMonth" class="month-change go-to-previous-month text-subtitle1"> {{'>'}} </button>
                </div>
                <div class="datepicker-calendar--header__days-row flex gap-3 my-2 justify-evenly text-center">
                    <div class="day-unit">M</div>
                    <div class="day-unit">T</div>
                    <div class="day-unit">W</div>
                    <div class="day-unit">T</div>
                    <div class="day-unit">F</div>
                    <div class="day-unit">S</div>
                    <div class="day-unit">S</div>
                </div>
            </div>

            <div class="datepicker-calendar--body">
                <div 
                    class="datepicker-calendar--body__days-row 
                    flex justify-evenly text-subtitle2 gap-3"
                >   
                    <div class="pa-1" v-for="othersDay in monthFirstDayWeekDay(1).getDay()" :key="othersDay"></div>
                    <div 
                        v-for="day in monthDays.getDate()" 
                        :key="day"
                        class="text-center day-unit pa-1"
                        :class="[{active: activeDates(day)}]" 
                        @click="onSelectedDates(day)"
                        >{{ day }}</div>
                </div>
            </div>
        </div>
    </div>
    {{ selectedDates }}
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

    export default defineComponent({
        props: {
            minYear: {
                type: Number,
                default: 1950
            },
            maxYear: {
                type: Number,
                default: 2050
            },
            weekDays: {
                type: [],
                default: ['']
            }
        },
        setup(props) {
            const months = ref([
                'January', 
                'February', 
                'March', 
                'April', 
                'May', 
                'June', 
                'July', 
                'August', 
                'September', 
                'October', 
                'November', 
                'December'
            ]);
            const selectedDates = ref<any>([]);
            const selectedMonth = ref(0);
            
            const selectedYear = ref(2023);
            const years = computed(() => {
                let arr = [];
                for(let i = props.minYear; i <= props.maxYear; i++) {
                    arr.push(i);
                }
                return arr;
            })

            const getDate = (year: any, month: any, day: any) => {
                return new Date(year, month, day);
            }


            const monthDays = computed(() => {
                return getDate(selectedYear.value, selectedMonth.value, 0);
            });

            const monthFirstDayWeekDay = computed(() => {
                return (day: any) => getDate(selectedYear.value, selectedMonth.value, day);
            })

            const onAddMonth = () => {
                if(selectedMonth.value == 11) {
                    selectedYear.value++;
                    selectedMonth.value = 0;
                    return ;
                }
                selectedMonth.value++;
            }

            const onSubstractionMonth = () => {
                if(selectedMonth.value == 0) {
                    selectedYear.value--;
                    selectedMonth.value = 11;
                    return ;
                }
                selectedMonth.value--;
            }

            const onSelectedDates = (day: any) => {
                console.log(getDate(selectedYear.value, selectedMonth.value, day));
                const date = getDate(selectedYear.value, selectedMonth.value, day).getTime();
                
                const isFound = selectedDates.value?.find((d: number) => 
                    d == date
                );
                
                if(isFound) {
                    selectedDates.value = selectedDates.value?.filter((d: number) => 
                     d != date
                    );
                } else {
                    selectedDates.value = [ ...selectedDates.value, date ];
                    selectedDates.value.sort();
                }                

                console.log(selectedDates.value.toString().includes(date.toString()));
                
                console.log(selectedDates.value, date);
                
            }

            const activeDates = computed (() => (day: any) => {
                console.log(monthFirstDayWeekDay.value(day).getTime());
                console.log(selectedDates.value, monthFirstDayWeekDay.value(day).getTime());
                
                const isFound = selectedDates.value.toString().includes(monthFirstDayWeekDay.value(day).getTime())
                console.log(isFound, 'activatedate');
                
                return isFound;
                
            })
            return {
                years,
                months,
                selectedMonth,
                selectedYear,
                monthDays,
                monthFirstDayWeekDay,
                onAddMonth,
                onSubstractionMonth,
                onSelectedDates,
                selectedDates,
                activeDates
            }
        }
    })
</script>


<style lang="scss" scoped>
    .datepicker {
        &-calendar {
            &--header {

                &__dates {
                    select {
                        appearance: none;
                        border: none;
                        background: transparent;
                        outline: none;
                        padding: .4rem;
                        option {
                            outline: none;
                            border: none;
                            appearance: none;
                            padding: .4rem;
                        }
                    }

                    button {
                        border: none;
                        outline: none;
                        padding: .4rem .8rem;
                        background: transparent;
                    }
                }
                &__days-row {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                }
            }

            &--body {
                &__days-row {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    .day-unit {
                        aspect-ratio: 1/1;
                        width: 1cqmax;
                        display: block;
                        a {
                            text-decoration: none;
                        }
                    }

                    .active {
                        border-radius: 50%;
                        align-self: center;
                        color: $white;
                        background: $primary;
                    }
                }
            }
        }
    }
</style>