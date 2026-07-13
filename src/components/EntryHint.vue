<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const STORAGE_KEY = 'rai-room-card-hint-seen';
const visible = ref(false);
const closeButton = ref(null);

const close = () => {
  visible.value = false;
  sessionStorage.setItem(STORAGE_KEY, 'true');
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
  if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
    requestAnimationFrame(() => {
      visible.value = true;
    });
  }
});

onBeforeUnmount(() => {
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
