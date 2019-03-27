import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Chat from './views/Chat.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
        if (to.params.user) next();
        else next({ name: 'home' });
      },
    },
  ],
});
