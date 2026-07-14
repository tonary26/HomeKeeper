<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const STORAGE_KEY = 'rai-room-card-hint-seen';
const visible = ref(false);
const closeButton = ref(null);
let autoCloseTimer;
let sectionObserver;

const close = async () => {
  if (!visible.value) return;
  window.clearTimeout(autoCloseTimer);
  visible.value = false;
  await nextTick();
  window.dispatchEvent(new CustomEvent('entry-hint:closed'));
};

const show = () => {
  if (visible.value || sessionStorage.getItem(STORAGE_KEY) === 'true') return;

  sessionStorage.setItem(STORAGE_KEY, 'true');
  visible.value = true;
  autoCloseTimer = window.setTimeout(close, 5000);
};

const onKeydown = (event) => {
  if (event.key === 'Escape' && visible.value) close();
};

watch(visible, async (isVisible) => {
  document.body.classList.toggle('entry-hint-open', isVisible);
  if (isVisible) {
    await nextTick();
    closeButton.value?.focus({ preventScroll: true });
  }
});

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') return;

  const roomsSection = document.getElementById('rooms');
  if (!roomsSection) return;

  sectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      sectionObserver.disconnect();
      show();
    },
    {
      threshold: 0.04,
      rootMargin: '0px 0px -28% 0px',
    },
  );
  sectionObserver.observe(roomsSection);
});

onBeforeUnmount(() => {
  window.clearTimeout(autoCloseTimer);
  sectionObserver?.disconnect();
  window.removeEventListener('keydown', onKeydown);
  document.body.classList.remove('entry-hint-open');
});
</script>

<template>
  <Transition name="entry-hint">
    <div
      v-if="visible"
      class="entry-hint"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-hint-title"
      @click="close"
    >
      <div class="entry-hint-content" @click.stop>
        <span class="entry-hint-mark" aria-hidden="true"></span>
        <p id="entry-hint-title">Нажмите на карточку номера для подробностей</p>
        <button ref="closeButton" type="button" @click="close">Понятно</button>
      </div>
    </div>
  </Transition>
</template>
