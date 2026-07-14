import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomeView from './views/HomeView.vue';
import RoomView from './views/RoomView.vue';
import './styles.css';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 86, behavior: 'smooth' };
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

    let observer;

    const reveal = () => {
      element.classList.add('is-visible');
    };

    const getMobileRootMargin = () => {
      if (element.classList.contains('room-card')) return '0px 0px 4% 0px';
      if (element.classList.contains('included-card')) return '0px 0px 2% 0px';
      return '0px 0px 8% 0px';
    };

    const revealWhenReady = () => {
      if (!document.body.classList.contains('entry-hint-open')) {
        reveal();
        return true;
      }

      if (!element._entryHintRevealHandler) {
        element._entryHintRevealHandler = () => {
          reveal();
          observer?.unobserve(element);
          delete element._entryHintRevealHandler;
        };
        window.addEventListener('entry-hint:closed', element._entryHintRevealHandler, { once: true });
      }

      return false;
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        const alreadyPassed = entry.boundingClientRect.top < 0;
        if (!entry.isIntersecting && !alreadyPassed) return;
        if (revealWhenReady()) observer.unobserve(element);
      },
      {
        threshold: 0.04,
        rootMargin: window.matchMedia('(max-width: 760px)').matches ? getMobileRootMargin() : '0px 0px 12% 0px',
      },
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
    if (element._entryHintRevealHandler) {
      window.removeEventListener('entry-hint:closed', element._entryHintRevealHandler);
      delete element._entryHintRevealHandler;
    }
    delete element._revealObserver;
  },
};

createApp(App).use(router).directive('reveal', revealDirective).mount('#app');
