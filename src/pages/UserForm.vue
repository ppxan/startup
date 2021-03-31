<template>
  <van-form @submit="onSubmit">
    <template v-for="item in questions">
      <van-field
        v-if="item.type === 'input'"
        :key="item.id"
        v-model="formState[item.id]"
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
          <van-radio-group v-model="formState[item.id]" direction="horizontal">
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
          <van-checkbox-group v-model="formState[item.id]" direction="horizontal">
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
      <van-button round block type="primary" @click="onSubmit"> 提交 </van-button>
    </div>
  </van-form>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Question } from '../types';
import { getForm, submitForm } from '../utils/api';
import { Toast } from 'vant';

export default defineComponent({
  name: 'UserForm',
  setup() {
    const route = useRoute();
    const formState = reactive<{ [key: string]: any }>({});
    const form = ref<Form | undefined>();

    // 加载数据
    onMounted(async () => {
      form.value = await getForm(route.params.id as string);
    });

    // 初始化表单
    watch(form, () => {
      form.value?.questions.forEach((item) => {
        if (item.type === 'checkboxGroup') {
          formState[item.id] = [];
        } else {
          formState[item.id] = '';
        }
      });
    });
    // 计算当前需要展示的表单项
    const getQuestionAndChildren = (q: Question): Question[] => {
      if (q.type !== 'radio') {
        return [q];
      }
      const selectedOption = q.options.find((option) => formState[q.id] === option.id);
      if (!selectedOption) {
        return [q];
      }
      let children = selectedOption.children || [];
      children = children.flatMap((item) => getQuestionAndChildren(item));
      return [q, ...children];
    };
    const questions = computed(() => {
      return form.value?.questions.flatMap(getQuestionAndChildren) || [];
    });

    // 提交表单
    const onSubmit = async (values: object) => {
      const result = await submitForm(route.params.id as string, values);
      if (result.ok) {
        Toast.success('提交成功啦！');
      }
    };

    return {
      formState,
      onSubmit,
      questions,
    };
  },
});
</script>

<style scoped></style>
