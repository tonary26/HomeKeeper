<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { address, phone, phoneHref, rooms } from '../data/rooms';

const route = useRoute();
const router = useRouter();
const selectedImageIndex = ref(-1);
const relatedScroller = ref(null);
const touchStartX = ref(0);
const room = computed(() => rooms.find((item) => item.slug === route.params.slug) || rooms[0]);
const roomGallery = computed(() => room.value.gallery || [room.value.image]);
const groupRooms = computed(() => rooms.filter((item) => item.group === room.value.group));
const roomIndex = computed(() => groupRooms.value.findIndex((item) => item.slug === room.value.slug));
const previousRoom = computed(() => groupRooms.value[(roomIndex.value - 1 + groupRooms.value.length) % groupRooms.value.length]);
const nextRoom = computed(() => groupRooms.value[(roomIndex.value + 1) % groupRooms.value.length]);
const related = computed(() => groupRooms.value.filter((item) => item.slug !== room.value.slug));

const priceText = computed(() => {
  if (room.value.priceLabel) return room.value.priceLabel;
  return `от ${room.value.price.toLocaleString('ru-RU')} ₽ ${room.value.unit}`;
});

const goToRoom = (target) => {
  selectedImageIndex.value = -1;
  router.push(`/room/${target.slug}`);
};

const onTouchStart = (event) => {
  if (event.target.closest('.related-scroll, .room-gallery-grid, .lightbox')) return;
  touchStartX.value = event.changedTouches[0].clientX;
};

const onTouchEnd = (event) => {
  if (selectedImageIndex.value >= 0) return;
  if (event.target.closest('.related-scroll, .room-gallery-grid, .lightbox')) return;
  const delta = event.changedTouches[0].clientX - touchStartX.value;
  if (Math.abs(delta) < 70) return;
  goToRoom(delta < 0 ? nextRoom.value : previousRoom.value);
};

const openLightbox = (index) => {
  selectedImageIndex.value = index;
};

const closeLightbox = () => {
  selectedImageIndex.value = -1;
};

const scrollRelated = (direction) => {
  relatedScroller.value?.scrollBy({
    left: direction * Math.min(520, window.innerWidth * 0.82),
    behavior: 'smooth',
  });
};
</script>

<template>
  <main class="room-page" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
    <section class="room-hero">
      <img :src="room.image" :alt="room.title" />
      <button v-if="groupRooms.length > 1" class="room-nav-arrow room-nav-prev" type="button" @click="goToRoom(previousRoom)" :aria-label="`Предыдущее размещение: ${previousRoom.title}`">
        <span>‹</span>
      </button>
      <button v-if="groupRooms.length > 1" class="room-nav-arrow room-nav-next" type="button" @click="goToRoom(nextRoom)" :aria-label="`Следующее размещение: ${nextRoom.title}`">
        <span>›</span>
      </button>
      <div class="room-hero-copy">
        <RouterLink class="back-link" to="/">← Все номера</RouterLink>
        <p class="quiet-line">{{ room.group }}</p>
        <h1>{{ room.title }}</h1>
        <p>{{ room.description }}</p>
        <a class="gold-button booking-button" :href="phoneHref">Забронировать по номеру: {{ phone }}</a>
      </div>
    </section>

    <section v-reveal class="section room-detail">
      <div class="room-description">
        <p class="quiet-line">Описание</p>
        <h2>Что важно знать перед звонком</h2>
        <p>{{ room.details }}</p>
      </div>
      <dl class="feature-list">
        <div>
          <dt>Стоимость</dt>
          <dd>{{ priceText }}</dd>
        </div>
        <div>
          <dt>Гостей</dt>
          <dd>до {{ room.max }}</dd>
        </div>
        <div>
          <dt>Кровати</dt>
          <dd>{{ room.beds || 'комната отдыха' }}</dd>
        </div>
        <div>
          <dt>Включено</dt>
          <dd>Wi-Fi, чай, кофе</dd>
        </div>
        <div>
          <dt>Адрес</dt>
          <dd>{{ address }}</dd>
        </div>
      </dl>
    </section>

    <section v-reveal class="section room-gallery-section">
      <div class="section-head">
        <div>
          <p class="quiet-line">Галерея</p>
          <h2>Фотографии {{ room.title }}</h2>
        </div>
      </div>
      <div :class="['room-gallery-grid', `photo-count-${roomGallery.length}`]">
        <button
          v-for="(image, index) in roomGallery"
          :key="image"
          type="button"
          @click="openLightbox(index)"
        >
          <img :src="image" :alt="`${room.title}: фотография номера`" />
        </button>
      </div>
    </section>

    <section v-reveal class="section related-section">
      <div class="section-head">
        <div>
          <p class="quiet-line">Еще варианты</p>
          <h2>Еще из раздела «{{ room.group }}»</h2>
        </div>
        <div v-if="related.length > 1" class="related-actions" aria-label="Перемещение по другим размещениям">
          <button type="button" @click="scrollRelated(-1)" aria-label="Назад">‹</button>
          <button type="button" @click="scrollRelated(1)" aria-label="Вперед">›</button>
        </div>
      </div>
      <div ref="relatedScroller" class="related-grid related-scroll">
        <RouterLink v-for="item in related" :key="item.id" :to="`/room/${item.slug}`">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <span>{{ item.title }}</span>
        </RouterLink>
      </div>
    </section>

    <ImageLightbox
      :images="roomGallery"
      :index="selectedImageIndex"
      :alt="`${room.title}: увеличенная фотография`"
      @update:index="selectedImageIndex = $event"
      @close="closeLightbox"
    />
  </main>
</template>
