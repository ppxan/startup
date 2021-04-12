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
import { Question, Form } from '../types';

export default defineComponent({
  name: 'CreateForm',
  setup: () => {
    const form = reactive<Form>({ questions: [] });
    return { form };
  },
});
</script>

<style scoped></style>
