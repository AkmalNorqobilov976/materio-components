<template>
    <span :tooltip="tooltipText" :position="position">
        <slot />
    </span>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    props: {
        tooltipText: {
            type: String,
            default: "Tooltip text",
        },
        position: {
            type: String as PropType<'top' | 'right' | 'left' | 'bottom'>,
            default: "top",
        },
    },
});
</script>
  