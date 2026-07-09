<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { phone, phoneHref } from './data/rooms';

const menuOpen = ref(false);
</script>

<template>
  <header :class="['site-header', { 'menu-open': menuOpen }]">
    <RouterLink class="brand" to="/" @click="menuOpen = false">
      <span>Гостиница</span>
      <strong>Рай</strong>
    </RouterLink>

    <button class="menu-button" type="button" aria-label="Открыть меню" @click="menuOpen = !menuOpen">
      <span></span>
      <span></span>
    </button>

    <nav :class="['main-nav', { open: menuOpen }]">
      <a href="/#rooms" @click="menuOpen = false">Номера</a>
      <a href="/#gallery" @click="menuOpen = false">Галерея</a>
      <a href="/#contacts" @click="menuOpen = false">Контакты</a>
      <a class="nav-phone" :href="phoneHref">{{ phone }}</a>
    </nav>
  </header>

  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
