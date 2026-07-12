<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  alt: {
    type: String,
    default: 'Увеличенная фотография',
  },
});

const emit = defineEmits(['close', 'update:index']);
const touchStartX = ref(0);

const isOpen = computed(() => props.index >= 0 && props.images.length > 0);
const currentImage = computed(() => props.images[props.index]);
const hasSeveralImages = computed(() => props.images.length > 1);

const close = () => emit('close');

const showImage = (direction) => {
  if (!hasSeveralImages.value) return;
  const total = props.images.length;
  emit('update:index', (props.index + direction + total) % total);
};

const onTouchStart = (event) => {
  touchStartX.value = event.changedTouches[0].clientX;
};

const onTouchEnd = (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX.value;
  if (Math.abs(delta) < 48) return;
  showImage(delta < 0 ? 1 : -1);
};

const onKeydown = (event) => {
  if (!isOpen.value) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowRight') showImage(1);
  if (event.key === 'ArrowLeft') showImage(-1);
};

watch(isOpen, (opened) => {
  document.body.classList.toggle('lightbox-open', opened);
}, { immediate: true });

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  document.body.classList.remove('lightbox-open');
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="lightbox"
    role="dialog"
    aria-modal="true"
    @click="close"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <button class="lightbox-close" type="button" aria-label="Закрыть" @click.stop="close">
      Закрыть
    </button>

    <button
      v-if="hasSeveralImages"
      class="lightbox-nav lightbox-prev"
      type="button"
      aria-label="Предыдущая фотография"
      @click.stop="showImage(-1)"
    >
      ‹
    </button>

    <figure class="lightbox-frame" @click.stop>
      <img :src="currentImage" :alt="alt" />
      <figcaption v-if="hasSeveralImages" class="lightbox-counter">
        {{ index + 1 }} / {{ images.length }}
      </figcaption>
      <figcaption v-if="hasSeveralImages" class="lightbox-dashes" aria-label="Текущая фотография">
        <span
          v-for="(_, imageIndex) in images"
          :key="imageIndex"
          :class="{ active: imageIndex === index }"
          aria-hidden="true"
        ></span>
      </figcaption>
    </figure>

    <button
      v-if="hasSeveralImages"
      class="lightbox-nav lightbox-next"
      type="button"
      aria-label="Следующая фотография"
      @click.stop="showImage(1)"
    >
      ›
    </button>
  </div>
</template>
