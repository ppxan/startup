<template>
  <div
    :class="['container', { disabled: disabled }]"
    :style="{ backgroundColor: color, boxShadow: color + ' 0px 0px 10px' }"
  >
    <div>
      <div class="title"> {{ title }}</div>
      <spacing :top="2">
        <div class="subtitle"> {{ subtitle }}</div></spacing
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Spacing from './Spacing.vue';
export default defineComponent({
  components: { Spacing },
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#defffc',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  border-radius: 16px;
  height: 175px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.disabled {
  opacity: 0.2;
}

.title {
  font-size: 2rem;
}

.subtitle {
  font-size: 0.75rem;
  color: #777;
}
</style>
