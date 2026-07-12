<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import ImageLightbox from '../components/ImageLightbox.vue';
import { address, email, gallery, includedAmenities, phone, phoneHref, rooms } from '../data/rooms';
import { roomMetaLabel } from '../utils/labels';

const activeGroup = ref('Все');
const groups = ['Все', 'Стандарт', 'Специальные', 'Бани / Сауны'];
const selectedImageIndex = ref(-1);
const includedScroller = ref(null);

const filteredRooms = computed(() => {
  if (activeGroup.value === 'Все') return rooms;
  return rooms.filter((room) => room.group === activeGroup.value);
});

const priceText = (room) => {
  if (room.priceLabel) return room.priceLabel;
  return `от ${room.price.toLocaleString('ru-RU')} ₽`;
};

const getIncludedScrollState = () => {
  const scroller = includedScroller.value;
  if (!scroller) return null;

  const maxScroll = scroller.scrollWidth - scroller.clientWidth;
  const scrollLeft = Math.ceil(scroller.scrollLeft);

  return {
    scroller,
    maxScroll,
    isAtEnd: scrollLeft >= maxScroll - 48,
    isAtStart: scrollLeft <= 48,
  };
};

const scrollIncluded = (direction) => {
  const state = getIncludedScrollState();
  if (!state) return;

  const { scroller, maxScroll, isAtEnd, isAtStart } = state;
  const cards = [...scroller.querySelectorAll('.included-card')];
  const getCardScrollLeft = (card) => card.offsetLeft - scroller.offsetLeft;
  const scrollToCard = (card) => {
    if (!card) return;
    scroller.scrollTo({
      left: Math.min(Math.max(getCardScrollLeft(card), 0), maxScroll),
      behavior: 'smooth',
    });
  };
  const currentIndex = cards.reduce((nearestIndex, card, index) => {
    const nearestDistance = Math.abs(getCardScrollLeft(cards[nearestIndex]) - scroller.scrollLeft);
    const distance = Math.abs(getCardScrollLeft(card) - scroller.scrollLeft);
    return distance < nearestDistance ? index : nearestIndex;
  }, 0);

  if (direction > 0 && isAtEnd) {
    scrollToCard(cards[0]);
    return;
  }

  if (direction < 0 && isAtStart) {
    scrollToCard(cards.at(-1));
    return;
  }

  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), cards.length - 1);
  scrollToCard(cards[nextIndex]);
};

const onIncludedWheel = (event) => {
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
    event.preventDefault();
  }
};

const openLightbox = (index) => {
  selectedImageIndex.value = index;
};

const closeLightbox = () => {
  selectedImageIndex.value = -1;
};
</script>

<template>
  <main>
    <section class="hero">
      <img src="/images/user/hotel-front.webp" alt="Гостиница «Рай» в Тетюшах" />
      <div class="hero-shade"></div>
      <div class="hero-content">
        <p class="quiet-line">Тетюши, берег Волги</p>
        <h1>Гостиница «Рай»</h1>
        <p class="hero-copy">Спокойное размещение, номера для одного гостя, семей и рабочих бригад, банные комплексы и прямой звонок владельцу.</p>
        <a class="gold-button booking-button" :href="phoneHref">Забронировать по номеру: {{ phone }}</a>
      </div>
      <div class="hero-contact">
        <a :href="phoneHref">{{ phone }}</a>
      </div>
    </section>

    <section v-reveal class="intro section">
      <div>
        <p class="quiet-line">О гостинице</p>
        <h2>Без лишнего шума: выбрать номер, открыть детали, позвонить.</h2>
      </div>
      <p>
       На сайте собраны актуальные варианты размещения гостиницы «Рай»: стандартные номера, групповые номера и банные комплексы. Бронирование не уводит в сложную форму: звоните и договаривайтесь по номеру в правом верхнем углу.
      </p>
    </section>

    <section id="included" v-reveal class="section included-section">
      <div class="section-head">
        <div>
          <p class="quiet-line">Входит в отдых</p>
          <h2>Что доступно гостям на территории</h2>
        </div>
        <p class="section-note">Банные зоны, бильярдная, бассейн и места для отдыха собраны рядом с размещением, чтобы гостю не приходилось искать досуг отдельно.</p>
        <div class="included-actions" aria-label="Перемещение по доступным зонам">
          <button type="button" @click="scrollIncluded(-1)" aria-label="Назад">‹</button>
          <button type="button" @click="scrollIncluded(1)" aria-label="Вперед">›</button>
        </div>
      </div>
      <div
        ref="includedScroller"
        class="included-grid included-scroll"
        @wheel="onIncludedWheel"
      >
        <article
          v-for="(item, index) in includedAmenities"
          :key="item.title"
          v-reveal
          class="included-card"
          :style="{ '--i': Math.min(index, 7) }"
        >
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="rooms" v-reveal class="section rooms-section">
      <div class="section-head">
        <div>
          <p class="quiet-line">Каталог</p>
          <h2>Номера и банные комплексы</h2>
        </div>
        <div class="filters" aria-label="Фильтр размещений">
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
        <div :key="activeGroup" class="room-grid">
          <article
            v-for="(room, index) in filteredRooms"
            :key="room.id"
            v-reveal
            class="room-card"
            :style="{ '--i': Math.min(index, 8) }"
          >
            <RouterLink :to="`/room/${room.slug}`" class="room-image">
              <img :src="room.image" :alt="room.title" />
            </RouterLink>
            <div class="room-info">
              <p>{{ room.group }}</p>
              <h3>{{ room.title }}</h3>
              <span>{{ roomMetaLabel(room) }}</span>
              <strong>{{ priceText(room) }}</strong>
              <RouterLink class="text-link" :to="`/room/${room.slug}`">Подробнее</RouterLink>
            </div>
          </article>
        </div>
      </Transition>
    </section>

    <section id="gallery" v-reveal class="section gallery-section">
      <div class="section-head">
        <div>
          <p class="quiet-line">Галерея</p>
          <h2>Фотографии отеля внутри и снаружи</h2>
        </div>
      </div>
      <div class="gallery-grid">
        <button v-for="(image, index) in gallery" :key="image" type="button" @click="openLightbox(index)">
          <img :src="image" alt="Фотография гостиницы «Рай»" />
        </button>
      </div>
    </section>

    <section id="contacts" v-reveal class="section contacts">
      <div>
        <p class="quiet-line">Контакты</p>
        <h2>Позвоните и уточните свободный номер.</h2>
      </div>
      <div class="contact-panel">
        <a :href="phoneHref">{{ phone }}</a>
        <a :href="`mailto:${email}`">{{ email }}</a>
        <span>{{ address }}</span>
        <a class="gold-button" href="https://yandex.ru/maps/?text=Тетюши, Чернышевского, 48" target="_blank" rel="noreferrer">Построить маршрут</a>
      </div>
    </section>

    <section id="map" v-reveal class="map-reveal">
      <div class="map-copy">
        <p class="quiet-line">Как добраться</p>
        <h2>Гостиница «Рай» на карте</h2>
        <a class="gold-button" href="https://yandex.ru/maps/?text=Тетюши, Чернышевского, 48" target="_blank" rel="noreferrer">Открыть в Яндекс.Картах</a>
      </div>
      <iframe
        title="Гостиница Рай на Яндекс Картах"
        src="https://yandex.ru/map-widget/v1/?text=Тетюши%2C%20Чернышевского%2C%2048&z=16"
        loading="lazy"
      ></iframe>
    </section>

    <ImageLightbox
      :images="gallery"
      :index="selectedImageIndex"
      alt="Увеличенная фотография гостиницы"
      @update:index="selectedImageIndex = $event"
      @close="closeLightbox"
    />
  </main>
</template>
