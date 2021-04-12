import { reactive, toRefs } from 'vue';

export default function useFetch<T>(fetcher: (...args: any[]) => Promise<T>) {
  const state = reactive<{
    loading: boolean;
    data: T | null;
    error: Error | string | null;
  }>({
    loading: false,
    data: null,
    error: null,
  });
  const { loading, data, error } = toRefs(state);
  return {
    loading,
    data,
    error,
    async fetch(...args: any[]) {
      loading.value = true;
      try {
        data.value = await fetcher(...args);
      } catch (e) {
        error.value = e;
      }
      loading.value = false;
      return data.value;
    },
  };
}
