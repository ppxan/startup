import { Component, createApp, defineComponent, h } from 'vue';
import UserForm from './pages/UserForm.vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const routes: { [key: string]: Component } = {
  '/form': UserForm,
};

const SimpleRouter = defineComponent({
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent(): Component {
      return routes[this.currentRoute] || { render: () => h('div', 'Not found') };
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
});

const app = createApp(SimpleRouter);
app.use(Vant);
app.mount('#app');
