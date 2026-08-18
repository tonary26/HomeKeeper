<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { address, gallery, includedAmenities, rooms, telegram, telegramHref } from '../data/rooms';
import { roomMetaLabel } from '../utils/labels';

const activeGroup = ref('Все');
const groups = ['Все', 'Свободные'];
const selectedImageIndex = ref(-1);
const includedScroller = ref(null);
const availableCount = computed(() => rooms.filter((room) => room.available).length);

const filteredRooms = computed(() => {
  return rooms.filter((room) => {
    const matchesGroup = activeGroup.value === 'Все' || room.available;
    return matchesGroup;
  });
});

const priceText = (room) => `от ${room.price.toLocaleString('ru-RU')} ₽`;

const scrollIncluded = (direction) => {
  const scroller = includedScroller.value;
  if (!scroller) return;
  const distance = Math.min(560, window.innerWidth * 0.84);
  const atEnd = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 32;
  const atStart = scroller.scrollLeft <= 32;
  if (direction > 0 && atEnd) scroller.scrollTo({ left: 0, behavior: 'smooth' });
  else if (direction < 0 && atStart) scroller.scrollTo({ left: scroller.scrollWidth, behavior: 'smooth' });
  else scroller.scrollBy({ left: distance * direction, behavior: 'smooth' });
};
</script>

<template>
  <main>
    <section class="hero">
      <img src="https://in2it.ru/img/rooms/studio_comfort/01.jpg" alt="Апартаменты в апарт отеле IN2IT" />
      <div class="hero-shade"></div>
      <div class="hero-content">
        <h1>Апартаменты в Санкт Петербурге</h1>
        <p class="hero-copy">Комфортное проживание в Санкт Петербурге рядом с метро Купчино.</p>
      </div>


    </section>

    <section id="rooms" v-reveal class="section rooms-section">
      <div class="section-head">
        <div>
          <h2>Выберите апартаменты</h2>
          <p class="catalog-count">{{ rooms.length }} вариантов · сейчас свободно {{ availableCount }}</p>
        </div>
        <div class="filters" aria-label="Тип размещения">
          <button
            v-for="group in groups"
            :key="group"
            type="button"
            :class="{ active: activeGroup === group }"
            @click="activeGroup = group"
          >
            {{ group }}
          </button>
        </div>
      </div>

      <Transition name="rooms-fade" mode="out-in">
        <div v-if="filteredRooms.length" :key="activeGroup" class="room-grid">
          <article v-for="(room, index) in filteredRooms" :key="room.id" v-reveal class="room-card" :style="{ '--i': index }">
            <RouterLink :to="`/stay/${room.slug}`" class="room-image">
              <img :src="room.image" :alt="`${room.title}, ${room.city}`" loading="lazy" />
              <span v-if="room.badge" class="property-badge">{{ room.badge }}</span>
              <span v-if="room.available" class="availability-badge">Свободно</span>
            </RouterLink>
            <div class="room-info">
              <div class="property-line">
                <p>{{ room.group }} · {{ room.location }}</p>
                <span class="rating" :aria-label="`Рейтинг ${room.rating}`">★ {{ room.rating }}</span>
              </div>
              <h3>{{ room.title }}</h3>
              <span>{{ roomMetaLabel(room) }}</span>
              <div class="price-line">
                <strong>{{ priceText(room) }} <small>/ ночь</small></strong>
                <RouterLink class="text-link" :to="`/stay/${room.slug}`">Смотреть</RouterLink>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="empty-state" role="status">
          <h3>Подходящих вариантов пока нет</h3>
          <p>Попробуйте другой город, тип размещения или меньшее число гостей.</p>
          <button type="button" @click="destination = ''; guests = '2'; activeGroup = 'Все'">Сбросить поиск</button>
        </div>
      </Transition>
    </section>

    <section id="collections" v-reveal class="included-section">
      <div class="section-head section">
        <div>
          <h2>Все необходимое для проживания</h2>
        </div>
        <div class="included-actions" aria-label="Перемещение по подборкам">
          <button type="button" @click="scrollIncluded(-1)" aria-label="Назад">‹</button>
          <button type="button" @click="scrollIncluded(1)" aria-label="Вперед">›</button>
        </div>
      </div>
      <div ref="includedScroller" class="included-grid section">
        <article v-for="item in includedAmenities" :key="item.title" class="included-card">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
        </article>
      </div>
    </section>

    <section id="gallery" v-reveal class="section gallery-section">
      <div class="section-head">
        <div><h2>Интерьеры апартаментов</h2></div>
      </div>
      <div class="gallery-grid">
        <button v-for="(image, index) in gallery" :key="image" type="button" @click="selectedImageIndex = index">
          <img :src="image" alt="Интерьер апартаментов" loading="lazy" />
        </button>
      </div>
    </section>

    <section id="contacts" v-reveal class="contact-section">
      <div class="section contact-layout">
        <div>
          <h2>Поможем выбрать апартаменты и подтвердить бронирование.</h2>
        </div>
        <div class="contact-panel">
          <p>{{ address }}. Напишите даты и число гостей, чтобы мы подтвердили доступность.</p>
          <a class="primary-button" :href="telegramHref" target="_blank" rel="noreferrer">Написать в Telegram</a>
          <span>{{ telegram }}</span>
        </div>
      </div>
    </section>

    <ImageLightbox
      :images="gallery"
      :index="selectedImageIndex"
      alt="Увеличенная фотография апартаментов"
      @update:index="selectedImageIndex = $event"
      @close="selectedImageIndex = -1"
    />
  </main>
</template>
