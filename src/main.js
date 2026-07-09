import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import RoomView from './views/RoomView.vue';
import './styles.css';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/room/:slug', name: 'room', component: RoomView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
});

const revealDirective = {
  mounted(element) {
    element.classList.add('reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible');
      return;
    }

    const reveal = () => {
      element.classList.add('is-visible');
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const alreadyPassed = entry.boundingClientRect.top < 0;
        if (!entry.isIntersecting && !alreadyPassed) return;
        reveal();
        observer.unobserve(element);
      },
      { threshold: 0.04, rootMargin: '0px 0px 12% 0px' },
    );

    element._revealObserver = observer;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!element.isConnected) return;
        observer.observe(element);
      });
    });
  },
  unmounted(element) {
    element._revealObserver?.disconnect();
    delete element._revealObserver;
  },
};

createApp(App).use(router).directive('reveal', revealDirective).mount('#app');
