import { createApp, h } from 'vue';
import UserForm from './pages/UserForm.vue';
import Vant from 'vant';
import 'vant/lib/index.css';

const routes = {
  '/form': UserForm,
};

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname,
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || { render: () => h('div', 'Not found') };
    },
  },

  render() {
    return h(this.CurrentComponent);
  },
};

const app = createApp(SimpleRouter);
app.use(Vant);
app.mount('#app');
