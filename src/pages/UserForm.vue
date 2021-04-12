<template>
  <div class="header">
    <div class="title">用户信息问卷</div>
    <div class="description">请如实填写你的信息</div>
  </div>
  <div class="form">
    <van-form @submit="submit">
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
        <van-button round block type="primary" :loading="formSubmit.loading" @click="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { reactive, computed, defineComponent, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Question } from '../types';
import { getForm, submitForm } from '../utils/api';
import { Toast } from 'vant';
import useFetch from '../utils/useFetch';
export default defineComponent({
  name: 'UserForm',
  setup() {
    const route = useRoute();
    const formState = reactive<{ [key: string]: any }>({});

    const pageLoad = useFetch<Form>(getForm);

    // 加载数据
    onMounted(async () => {
      pageLoad.data = await pageLoad.fetch(route.params.id);
    });

    // 初始化表单
    watch(pageLoad.data, () => {
      pageLoad.data.value?.questions.forEach((item) => {
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
      return pageLoad.data.value?.questions.flatMap(getQuestionAndChildren) || [];
    });
    const formSubmit = useFetch(submitForm);
    const submit = async () => {
      const res = await formSubmit.fetch(route.params.id, formState);
      if (res.ok) {
        Toast.success('提交成功啦！');
      }
    };

    return {
      formState,
      formSubmit,
      submit,
      questions,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  top: 0;
  height: 150px;
  width: 100%;
  background-color: #66eec9;
  padding: 24px 0 0 16px;
  position: fixed;
  z-index: -1;
  .title {
    margin-top: 24px;
    font-size: 1.75rem;
    font-weight: bold;
  }
  .description {
    margin-top: 8px;
    color: #444;
  }
}

.form {
  margin-top: 140px;
  padding-top: 16px;
  border-radius: 32px 32px 0 0;
  background-color: #fff;
}

.form .van-cell {
  background-color: unset;
}
</style>
