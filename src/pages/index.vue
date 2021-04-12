<template>
  <spacing :all="2">
    <div class="title">Start up</div>
    <spacing :v="2">
      <category-card
        title="问卷调查"
        subtitle="丰富的输入项，简单的配置，功能完善的逻辑规则"
      ></category-card>
    </spacing>
    <spacing :v="2">
      <category-card
        title="答题测试"
        subtitle="时间限制、分数规则、随机题库"
        color="#d8f2ff"
        disabled
      ></category-card>
    </spacing>
    <spacing :v="2">
      <category-card
        title="投票"
        subtitle="图文投票、单选多选"
        disabled
        color="#fff4db"
      ></category-card>
    </spacing>
  </spacing>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryCard from '../components/CategoryCard.vue';
import Spacing from '../components/Spacing.vue';
export default defineComponent({
  components: { CategoryCard, Spacing },
  setup() {},
});
</script>

<style scoped lang="scss">
.title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin: 16px 0;
}
</style>
