<script setup>
import { nextTick, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { phone, phoneHref } from './data/rooms';

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
    <RouterLink class="brand" to="/" @click="menuOpen = false">
      <img src="/images/rai-logo.png" alt="Логотип гостиницы Рай" />
      <span class="brand-name"><small>Гостиница</small><strong>Рай</strong></span>
    </RouterLink>

    <button class="menu-button" type="button" aria-label="Открыть меню" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
    </button>

    <nav :class="['main-nav', { open: menuOpen }]">
      <a href="/#rooms" @click.prevent="goToSection('rooms')">Номера</a>
      <a href="/#gallery" @click.prevent="goToSection('gallery')">Галерея</a>
      <a href="/#contacts" @click.prevent="goToSection('contacts')">Контакты</a>
      <a class="nav-phone" :href="phoneHref">{{ phone }}</a>
    </nav>
  </header>

  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
