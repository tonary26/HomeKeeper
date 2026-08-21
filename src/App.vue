<script setup>
import { nextTick, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { telegramHref } from './data/rooms';
import { Analytics } from '@vercel/analytics/vue';

const menuOpen = ref(false);
const route = useRoute();
const router = useRouter();

const goToSection = async (sectionId) => {
  menuOpen.value = false;

  if (route.path !== '/') {
    await router.push({ path: '/', hash: `#${sectionId}` });
  } else {
    await router.push({ hash: `#${sectionId}` });
  }

  await nextTick();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<template>
  <header :class="['site-header', { 'menu-open': menuOpen }]">
    <RouterLink class="brand brand-text" to="/" aria-label="IN2IT, на главную" @click="menuOpen = false">
      <span>IN2IT</span>
      <small>апарт отель</small>
    </RouterLink>

    <button
      class="menu-button"
      type="button"
      :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
    </button>

    <nav :class="['main-nav', { open: menuOpen }]">
      <a href="/#rooms" @click.prevent="goToSection('rooms')">Варианты</a>
      <a href="/#collections" @click.prevent="goToSection('collections')">Подборки</a>
      <a href="/#contacts" @click.prevent="goToSection('contacts')">Помощь</a>
      <a class="nav-contact" :href="telegramHref" target="_blank" rel="noreferrer">Написать в Telegram</a>
    </nav>
  </header>

  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>

  <Analytics />
</template>
