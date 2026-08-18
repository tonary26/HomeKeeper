<script setup>
import { computed, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { rooms, telegramHref } from '../data/rooms';
import { bedLabel, guestLabel } from '../utils/labels';

const route = useRoute();
const router = useRouter();
const selectedImageIndex = ref(-1);
const relatedScroller = ref(null);
const galleryScroller = ref(null);
const activeGalleryIndex = ref(0);
const roomSwipe = ref({ active: false, identifier: null, x: 0, y: 0 });
const room = computed(() => rooms.find((item) => item.slug === route.params.slug) || rooms[0]);
const roomGallery = computed(() => room.value.gallery || [room.value.image]);
const groupRooms = computed(() => rooms.filter((item) => item.group === room.value.group));
const roomIndex = computed(() => groupRooms.value.findIndex((item) => item.slug === room.value.slug));
const previousRoom = computed(() => groupRooms.value[(roomIndex.value - 1 + groupRooms.value.length) % groupRooms.value.length]);
const nextRoom = computed(() => groupRooms.value[(roomIndex.value + 1) % groupRooms.value.length]);
const related = computed(() => groupRooms.value.filter((item) => item.slug !== room.value.slug));
const bookingHref = computed(() => `${telegramHref}?text=${encodeURIComponent(`Здравствуйте! Хочу уточнить доступность: ${room.value.title}`)}`);

const priceText = computed(() => `${room.value.price.toLocaleString('ru-RU')} ₽ / ночь`);

const goToRoom = (target) => {
  selectedImageIndex.value = -1;
  router.push(`/stay/${target.slug}`);
};

const onTouchStart = (event) => {
  if (event.target.closest('.related-scroll, .room-gallery-grid, .lightbox')) return;
  if (event.touches.length !== 1) return;
  const touch = event.changedTouches[0];
  roomSwipe.value = { active: true, identifier: touch.identifier, x: touch.clientX, y: touch.clientY };
};

const onTouchEnd = (event) => {
  if (!roomSwipe.value.active) return;
  roomSwipe.value.active = false;
  const touch = [...event.changedTouches].find((item) => item.identifier === roomSwipe.value.identifier);
  if (!touch || selectedImageIndex.value >= 0) return;
  const deltaX = touch.clientX - roomSwipe.value.x;
  const deltaY = touch.clientY - roomSwipe.value.y;
  if (Math.abs(deltaX) < 70 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.35) return;
  goToRoom(deltaX < 0 ? nextRoom.value : previousRoom.value);
};

const onGalleryScroll = () => {
  const scroller = galleryScroller.value;
  if (!scroller) return;
  const cards = [...scroller.querySelectorAll('button')];
  activeGalleryIndex.value = cards.reduce((nearest, card, index) => (
    Math.abs(card.offsetLeft - scroller.scrollLeft) < Math.abs(cards[nearest].offsetLeft - scroller.scrollLeft) ? index : nearest
  ), 0);
};

watch(() => room.value.slug, () => {
  activeGalleryIndex.value = 0;
  galleryScroller.value?.scrollTo({ left: 0 });
});

const scrollRelated = (direction) => relatedScroller.value?.scrollBy({ left: direction * Math.min(520, window.innerWidth * 0.82), behavior: 'smooth' });
</script>

<template>
  <main class="room-page">
    <section class="room-hero" @touchstart.passive="onTouchStart" @touchend.passive="onTouchEnd">
      <img :src="room.image" :alt="`${room.title}, ${room.city}`" />
      <div class="hero-shade"></div>
      <button v-if="groupRooms.length > 1" class="room-nav-arrow room-nav-prev" type="button" @click="goToRoom(previousRoom)" :aria-label="`Предыдущий объект: ${previousRoom.title}`">‹</button>
      <button v-if="groupRooms.length > 1" class="room-nav-arrow room-nav-next" type="button" @click="goToRoom(nextRoom)" :aria-label="`Следующий объект: ${nextRoom.title}`">›</button>
      <div class="room-hero-copy">
        <RouterLink class="back-link" to="/#rooms">← Все варианты</RouterLink>
        <h1>{{ room.title }}</h1>
        <a class="primary-button" :href="bookingHref" target="_blank" rel="noreferrer">Проверить доступность</a>
      </div>
    </section>

    <section v-reveal class="section room-detail">
      <div class="room-description">
        <h2>Все важное до бронирования</h2>
        <p>{{ room.details }}</p>
        <ul class="amenity-list" aria-label="Удобства">
          <li v-for="amenity in room.amenities" :key="amenity">{{ amenity }}</li>
        </ul>
      </div>
      <aside class="booking-summary">
        <p><strong>{{ priceText }}</strong><span>Итоговая цена зависит от дат и числа гостей.</span></p>
        <dl class="feature-list">
          <div><dt>Формат</dt><dd>{{ room.group }}</dd></div>
          <div><dt>Вместимость</dt><dd>{{ guestLabel(room.max) }}</dd></div>
          <div><dt>Площадь</dt><dd>{{ room.area }} м²</dd></div>
          <div><dt>Спальные места</dt><dd>{{ bedLabel(room.beds) }}</dd></div>
        </dl>
        <a class="primary-button" :href="bookingHref" target="_blank" rel="noreferrer">Оставить запрос</a>
      </aside>
    </section>

    <section class="section room-gallery-section">
      <div class="section-head"><div><h2>{{ room.title }} внутри</h2></div></div>
      <div ref="galleryScroller" :class="['room-gallery-grid', `photo-count-${roomGallery.length}`]" @scroll.passive="onGalleryScroll">
        <button v-for="(image, index) in roomGallery" :key="image" type="button" @click="selectedImageIndex = index">
          <img :src="image" :alt="`${room.title}: фотография ${index + 1}`" loading="lazy" />
        </button>
      </div>
      <div v-if="roomGallery.length > 1" class="room-gallery-indicator" aria-label="Текущая фотография">
        <span v-for="(_, index) in roomGallery" :key="index" :class="{ active: index === activeGalleryIndex }" aria-hidden="true"></span>
      </div>
    </section>

    <section v-reveal class="section related-section">
      <div class="section-head">
        <div><h2>Другие {{ room.group.toLocaleLowerCase('ru') }}</h2></div>
        <div v-if="related.length > 1" class="related-actions" aria-label="Другие варианты размещения">
          <button type="button" @click="scrollRelated(-1)" aria-label="Назад">‹</button>
          <button type="button" @click="scrollRelated(1)" aria-label="Вперед">›</button>
        </div>
      </div>
      <div ref="relatedScroller" class="related-grid related-scroll">
        <RouterLink v-for="item in related" :key="item.id" :to="`/stay/${item.slug}`">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <span><strong>{{ item.title }}</strong><small>{{ item.city }} · от {{ item.price.toLocaleString('ru-RU') }} ₽</small></span>
        </RouterLink>
      </div>
    </section>

    <ImageLightbox :images="roomGallery" :index="selectedImageIndex" :alt="`${room.title}: увеличенная фотография`" @update:index="selectedImageIndex = $event" @close="selectedImageIndex = -1" />
  </main>
</template>
