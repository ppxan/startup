<template>
  <van-form @submit="onSubmit">
    <template v-for="item in questions">
      <van-field
        v-if="item.type === 'input'"
        :key="item.id"
        v-model="state[item.id]"
        :name="item.id"
        :label="item.label"
      />
      <van-field
        v-else-if="item.type === 'radio'"
        :key="item.id"
        :name="item.type"
        :label="item.label"
      >
        <template #input>
          <van-radio-group v-model="state[item.id]" direction="horizontal">
            <van-radio v-for="option in item.options" :key="option.id" :name="option.id">{{
              option.label
            }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-else-if="item.type === 'checkboxGroup'"
        :key="item.id"
        :name="item.type"
        :label="item.label"
      >
        <template #input>
          <van-checkbox-group v-model="state[item.id]" direction="horizontal">
            <van-checkbox
              v-for="option in item.options"
              :key="option.id"
              :name="option.id"
              shape="square"
              >{{ option.label }}</van-checkbox
            >
          </van-checkbox-group>
        </template>
      </van-field>
    </template>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, ref } from 'vue';
import mockdata from '../mockdata';
import { Question } from '../types';

export default defineComponent({
  name: 'UserForm',
  setup: () => {
    console.log(1);
    const a: { [key: string]: any } = {};
    mockdata.questions.forEach((item) => {
      if (item.type === 'checkboxGroup') {
        a[item.id] = ref([]);
      } else {
        a[item.id] = '';
      }
    });
    const state = reactive(a);
    const getQuestionAndChildren = (q: Question): Question[] => {
      if (q.type !== 'radio') {
        return [q];
      }
      const selectedOption = q.options.find((option) => state[q.id] === option.id);
      if (!selectedOption) {
        return [q];
      }
      let children = selectedOption.children || [];
      children = children.flatMap((item) => getQuestionAndChildren(item));
      return [q, ...children];
    };

    const questions = computed(() => {
      return mockdata.questions.flatMap(getQuestionAndChildren);
    });

    const onSubmit = (values: object) => {
      console.log('submit', values);
    };
    return { state, onSubmit, mockdata, questions };
  },
});
</script>

<style scoped></style>
