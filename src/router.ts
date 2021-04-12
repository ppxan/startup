import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UserFrom from './pages/UserForm.vue';
import IndexPage from './pages/index.vue';

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes: RouteRecordRaw[] = [
  { path: '/form/:id', component: UserFrom },
  {
    path: '/',
    component: IndexPage,
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});
