<template>
  <div
    :style="{
      paddingLeft: (left || h || all) * 8 + 'px',
      paddingRight: (right || h || all) * 8 + 'px',
      paddingTop: (top || v || all) * 8 + 'px',
      paddingBottom: (bottom || v || all) * 8 + 'px',
    }"
    ><slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    all: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: undefined,
    },
    right: {
      type: Number,
      default: undefined,
    },
    top: {
      type: Number,
      default: undefined,
    },
    bottom: {
      type: Number,
      default: undefined,
    },
    v: {
      type: Number,
      default: undefined,
    },
    h: {
      type: Number,
      default: undefined,
    },
  },
});
</script>

<style lang="sass" scoped></style>
