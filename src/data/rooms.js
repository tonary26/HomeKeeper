export const telegram = '@IN2ITOpart';
export const telegramHref = 'https://t.me/IN2ITOpart';
export const address = 'Санкт Петербург, Витебский проспект, 101, корпус 1';

const stockImage = (name) => `/images/homekeeper/${name}.webp`;

export const rooms = [
  {
    id: 1,
    title: 'Atelier на Сретенке',
    slug: 'atelier-sretenka',
    group: 'Квартиры',
    city: 'Москва',
    location: 'Сретенка · 7 минут до метро',
    description: 'Светлая квартира для коротких поездок в центре Москвы.',
    details: 'Отдельная спальня, полноценная кухня и спокойная рабочая зона. Подойдет паре или одному гостю, который хочет жить в центре и возвращаться в тихое пространство.',
    max: 2,
    beds: 1,
    area: 41,
    rating: 4.9,
    reviews: 128,
    price: 6400,
    available: true,
    unit: 'за ночь',
    badge: 'Выбор гостей',
    amenities: ['Wi-Fi', 'Кухня', 'Кондиционер', 'Стиральная машина'],
    image: stockImage('apartment-green'),
    gallery: [stockImage('apartment-green'), stockImage('apartment-airy'), stockImage('bedroom-soft')],
  },
  {
    id: 2,
    title: 'Nordline Hotel',
    slug: 'nordline-hotel',
    group: 'Отели',
    city: 'Санкт-Петербург',
    location: 'Петроградская сторона · рядом с набережной',
    description: 'Небольшой городской отель с тихими номерами и круглосуточной стойкой.',
    details: 'Лаконичный номер с большой кроватью, рабочим столом и затемняющими шторами. Завтрак можно добавить при бронировании, стойка регистрации работает круглосуточно.',
    max: 2,
    beds: 1,
    area: 27,
    rating: 4.8,
    reviews: 346,
    price: 7900,
    available: false,
    unit: 'за ночь',
    badge: 'Завтрак включен',
    amenities: ['Wi-Fi', 'Завтрак', 'Ресепшен 24/7', 'Кондиционер'],
    image: stockImage('bedroom-curved'),
    gallery: [stockImage('bedroom-curved'), stockImage('hotel-pool'), stockImage('bedroom-view')],
  },
  {
    id: 3,
    title: 'Family Loft у Кремля',
    slug: 'family-loft-kazan',
    group: 'Квартиры',
    city: 'Казань',
    location: 'Старо-Татарская слобода · исторический центр',
    description: 'Просторная квартира для семьи или компании до четырех человек.',
    details: 'Две изолированные зоны для сна, кухня-гостиная и место для детской кроватки. В пешей доступности набережная, кафе и главные городские маршруты.',
    max: 4,
    beds: 2,
    area: 68,
    rating: 4.9,
    reviews: 92,
    price: 7200,
    available: false,
    unit: 'за ночь',
    badge: 'Для семьи',
    amenities: ['Wi-Fi', 'Кухня', 'Детская кроватка', 'Парковка'],
    image: stockImage('apartment-airy'),
    gallery: [stockImage('apartment-airy'), stockImage('bedroom-soft'), stockImage('apartment-green')],
  },
  {
    id: 4,
    title: 'Volga House',
    slug: 'volga-house',
    group: 'Отели',
    city: 'Нижний Новгород',
    location: 'Верхне-Волжская набережная · вид на реку',
    description: 'Современный отель для спокойного городского уикенда.',
    details: 'Номер с панорамным окном, удобной кроватью и зоной для вечернего отдыха. В здании есть ресторан, камера хранения и круглосуточная помощь гостям.',
    max: 2,
    beds: 1,
    area: 31,
    rating: 4.7,
    reviews: 214,
    price: 6100,
    available: true,
    unit: 'за ночь',
    badge: 'Вид на Волгу',
    amenities: ['Wi-Fi', 'Ресторан', 'Камера хранения', 'Лифт'],
    image: stockImage('bedroom-view'),
    gallery: [stockImage('bedroom-view'), stockImage('hotel-pool'), stockImage('bedroom-curved')],
  },
  {
    id: 5,
    title: 'White Pines Residence',
    slug: 'white-pines-residence',
    group: 'Квартиры',
    city: 'Сочи',
    location: 'Хоста · 12 минут до моря',
    description: 'Апартаменты с террасой для неспешного отдыха у моря.',
    details: 'Отдельная спальня, гостиная с диваном и кухня для длительного проживания. На территории есть бассейн и место для автомобиля.',
    max: 4,
    beds: 2,
    area: 54,
    rating: 4.8,
    reviews: 177,
    price: 8500,
    available: false,
    unit: 'за ночь',
    badge: 'Бассейн',
    amenities: ['Wi-Fi', 'Кухня', 'Терраса', 'Парковка'],
    image: stockImage('hotel-pool'),
    gallery: [stockImage('hotel-pool'), stockImage('apartment-green'), stockImage('apartment-airy')],
  },
  {
    id: 6,
    title: 'Forma Hotel',
    slug: 'forma-hotel',
    group: 'Отели',
    city: 'Екатеринбург',
    location: 'Центр · 5 минут до метро',
    description: 'Функциональный отель для деловой поездки и короткого отдыха.',
    details: 'Тихий номер с рабочим местом, быстрым Wi-Fi и плотными шторами. Ранний завтрак и поздний выезд доступны по запросу.',
    max: 2,
    beds: 1,
    area: 24,
    rating: 4.6,
    reviews: 301,
    price: 5800,
    available: false,
    unit: 'за ночь',
    badge: 'Для командировок',
    amenities: ['Wi-Fi', 'Рабочее место', 'Завтрак', 'Поздний заезд'],
    image: stockImage('bedroom-soft'),
    gallery: [stockImage('bedroom-soft'), stockImage('bedroom-curved'), stockImage('bedroom-view')],
  },
  {
    id: 7, title: 'Arbat Studio', slug: 'arbat-studio', group: 'Квартиры', city: 'Москва', location: 'Арбат · 4 минуты до метро',
    description: 'Компактная студия для прогулок по центру.', details: 'Светлая студия с кухней, двуспальной кроватью и всем необходимым для короткой городской поездки.',
    max: 2, beds: 1, area: 32, rating: 4.8, reviews: 74, price: 6900, available: true, unit: 'за ночь', badge: 'Центр города',
    amenities: ['Wi-Fi', 'Кухня', 'Кондиционер', 'Лифт'], image: stockImage('apartment-green'), gallery: [stockImage('apartment-green'), stockImage('bedroom-soft'), stockImage('apartment-airy')],
  },
  {
    id: 8, title: 'Neva Loft', slug: 'neva-loft', group: 'Квартиры', city: 'Санкт-Петербург', location: 'Васильевский остров · рядом с Невой',
    description: 'Лофт с высоким потолком и видом на город.', details: 'Пространство для пары или небольшой семьи: кухня-гостиная, отдельная спальня и быстрый Wi-Fi.',
    max: 3, beds: 2, area: 57, rating: 4.7, reviews: 109, price: 7600, available: true, unit: 'за ночь', badge: 'Высокие потолки',
    amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина', 'Рабочее место'], image: stockImage('apartment-airy'), gallery: [stockImage('apartment-airy'), stockImage('bedroom-view'), stockImage('bedroom-soft')],
  },
  {
    id: 9, title: 'Riverside Inn', slug: 'riverside-inn', group: 'Отели', city: 'Калининград', location: 'Рыбная деревня · у реки',
    description: 'Небольшой отель для спокойных выходных.', details: 'Уютный номер, круглосуточная стойка и завтрак в кафе на первом этаже.',
    max: 2, beds: 1, area: 26, rating: 4.8, reviews: 263, price: 6300, available: false, unit: 'за ночь', badge: 'У реки',
    amenities: ['Wi-Fi', 'Завтрак', 'Ресепшен 24/7', 'Камера хранения'], image: stockImage('bedroom-view'), gallery: [stockImage('bedroom-view'), stockImage('bedroom-curved'), stockImage('hotel-pool')],
  },
  {
    id: 10, title: 'Morskaya Residence', slug: 'morskaya-residence', group: 'Квартиры', city: 'Владивосток', location: 'Эгершельд · 8 минут до моря',
    description: 'Апартаменты с балконом для поездки к морю.', details: 'Спальня, кухня и открытый балкон с видом на бухту. Подойдет для продолжительного отдыха.',
    max: 4, beds: 2, area: 63, rating: 4.9, reviews: 81, price: 8900, available: false, unit: 'за ночь', badge: 'Балкон',
    amenities: ['Wi-Fi', 'Кухня', 'Балкон', 'Парковка'], image: stockImage('hotel-pool'), gallery: [stockImage('hotel-pool'), stockImage('apartment-airy'), stockImage('apartment-green')],
  },
  {
    id: 11, title: 'Siberia Hotel', slug: 'siberia-hotel', group: 'Отели', city: 'Новосибирск', location: 'Тихий центр · рядом с театром',
    description: 'Городской отель с понятным сервисом.', details: 'Номер с плотными шторами и рабочим столом. На первом этаже — кафе и зона для встреч.',
    max: 2, beds: 1, area: 28, rating: 4.6, reviews: 194, price: 5200, available: false, unit: 'за ночь', badge: 'Тихий центр',
    amenities: ['Wi-Fi', 'Рабочее место', 'Завтрак', 'Лифт'], image: stockImage('bedroom-soft'), gallery: [stockImage('bedroom-soft'), stockImage('bedroom-curved'), stockImage('bedroom-view')],
  },
  {
    id: 12, title: 'Yamskaya Flat', slug: 'yamskaya-flat', group: 'Квартиры', city: 'Ярославль', location: 'Исторический центр · у Волжской набережной',
    description: 'Тихая квартира для семьи в старом центре.', details: 'Две комнаты, кухня и удобный стол для работы или долгих семейных завтраков.',
    max: 4, beds: 2, area: 61, rating: 4.9, reviews: 67, price: 5500, available: true, unit: 'за ночь', badge: 'Для семьи',
    amenities: ['Wi-Fi', 'Кухня', 'Детская кроватка', 'Парковка'], image: stockImage('apartment-airy'), gallery: [stockImage('apartment-airy'), stockImage('apartment-green'), stockImage('bedroom-soft')],
  },
  {
    id: 13, title: 'Central Park Hotel', slug: 'central-park-hotel', group: 'Отели', city: 'Самара', location: 'Ленинградская улица · центр',
    description: 'Отель рядом с прогулочными маршрутами.', details: 'Удобный номер для двух гостей, ранний заезд по запросу и круглосуточная поддержка.',
    max: 2, beds: 1, area: 25, rating: 4.7, reviews: 155, price: 4900, available: false, unit: 'за ночь', badge: 'Рядом с центром',
    amenities: ['Wi-Fi', 'Ресепшен 24/7', 'Завтрак', 'Кондиционер'], image: stockImage('bedroom-curved'), gallery: [stockImage('bedroom-curved'), stockImage('hotel-pool'), stockImage('bedroom-view')],
  },
  {
    id: 14, title: 'Baikal View', slug: 'baikal-view', group: 'Квартиры', city: 'Иркутск', location: 'Улица Карла Маркса · 10 минут до набережной',
    description: 'Апартаменты для остановки перед поездкой на Байкал.', details: 'Отдельная спальня, кухня и просторная гостиная для спокойного вечера после дороги.',
    max: 3, beds: 2, area: 49, rating: 4.8, reviews: 92, price: 5700, available: false, unit: 'за ночь', badge: 'Уютная гостиная',
    amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина', 'Трансфер'], image: stockImage('apartment-green'), gallery: [stockImage('apartment-green'), stockImage('bedroom-view'), stockImage('apartment-airy')],
  },
  {
    id: 15, title: 'Krona Hotel', slug: 'krona-hotel', group: 'Отели', city: 'Казань', location: 'Кремлевская · исторический центр',
    description: 'Небольшой отель у главных городских маршрутов.', details: 'Удобные кровати, тихий внутренний двор и завтрак с локальными блюдами.',
    max: 3, beds: 2, area: 30, rating: 4.8, reviews: 278, price: 7100, available: false, unit: 'за ночь', badge: 'Исторический центр',
    amenities: ['Wi-Fi', 'Завтрак', 'Ресепшен 24/7', 'Трансфер'], image: stockImage('bedroom-view'), gallery: [stockImage('bedroom-view'), stockImage('bedroom-curved'), stockImage('hotel-pool')],
  },
  {
    id: 16, title: 'Mira Apartments', slug: 'mira-apartments', group: 'Квартиры', city: 'Екатеринбург', location: 'Проспект Мира · рядом с парком',
    description: 'Светлые апартаменты для деловой поездки.', details: 'Функциональная квартира с кухней, рабочим местом и тихой спальней.',
    max: 2, beds: 1, area: 38, rating: 4.7, reviews: 118, price: 5100, available: false, unit: 'за ночь', badge: 'Рабочая зона',
    amenities: ['Wi-Fi', 'Кухня', 'Рабочее место', 'Кондиционер'], image: stockImage('bedroom-soft'), gallery: [stockImage('bedroom-soft'), stockImage('apartment-green'), stockImage('bedroom-curved')],
  },
  {
    id: 17, title: 'Seasons Hotel', slug: 'seasons-hotel', group: 'Отели', city: 'Сочи', location: 'Центральный район · 6 минут до моря',
    description: 'Современный отель для отдыха у моря.', details: 'Номер с балконом, бассейн на территории и помощь с маршрутами по побережью.',
    max: 2, beds: 1, area: 29, rating: 4.7, reviews: 352, price: 9400, available: false, unit: 'за ночь', badge: 'У моря',
    amenities: ['Wi-Fi', 'Бассейн', 'Завтрак', 'Балкон'], image: stockImage('hotel-pool'), gallery: [stockImage('hotel-pool'), stockImage('bedroom-view'), stockImage('apartment-airy')],
  },
  {
    id: 18, title: 'Amber House', slug: 'amber-house', group: 'Квартиры', city: 'Калининград', location: 'Амалиенау · тихий район',
    description: 'Просторная квартира для длинных выходных.', details: 'Две спальни, полноценная кухня и зелёный двор — удобный вариант для семьи.',
    max: 5, beds: 3, area: 74, rating: 4.9, reviews: 58, price: 7800, available: true, unit: 'за ночь', badge: 'Зелёный двор',
    amenities: ['Wi-Fi', 'Кухня', 'Парковка', 'Детская кроватка'], image: stockImage('apartment-airy'), gallery: [stockImage('apartment-airy'), stockImage('apartment-green'), stockImage('bedroom-soft')],
  },
  {
    id: 19, title: 'Bolshevik Hotel', slug: 'bolshevik-hotel', group: 'Отели', city: 'Ростов-на-Дону', location: 'Набережная · у реки Дон',
    description: 'Отель с уютными номерами у городской набережной.', details: 'Стильный номер, ресторан и удобный доступ к центральным улицам города.',
    max: 2, beds: 1, area: 27, rating: 4.6, reviews: 188, price: 5400, available: false, unit: 'за ночь', badge: 'Набережная',
    amenities: ['Wi-Fi', 'Ресторан', 'Ресепшен 24/7', 'Кондиционер'], image: stockImage('bedroom-curved'), gallery: [stockImage('bedroom-curved'), stockImage('bedroom-view'), stockImage('hotel-pool')],
  },
  {
    id: 20, title: 'Taiga Lodge', slug: 'taiga-lodge', group: 'Квартиры', city: 'Красноярск', location: 'Столбы · рядом с природным парком',
    description: 'Загородные апартаменты для отдыха на природе.', details: 'Тёплое пространство с кухней, камином и террасой для неспешных выходных.',
    max: 4, beds: 2, area: 66, rating: 4.8, reviews: 73, price: 6800, available: true, unit: 'за ночь', badge: 'Терраса',
    amenities: ['Wi-Fi', 'Кухня', 'Терраса', 'Парковка'], image: stockImage('hotel-pool'), gallery: [stockImage('hotel-pool'), stockImage('apartment-green'), stockImage('bedroom-view')],
  },
];

const officialImage = (path) => path.startsWith('/') ? path : `https://in2it.ru/img/rooms/${path}`;

const apartmentTypes = [
  { title: 'Студия Компакт', area: 18, max: 2, price: 7500, images: ['/images/homekeeper/apartment-01.jpg'] },
  { title: 'Студия Стандарт', area: 24, max: 2, price: 2500, images: ['/images/homekeeper/apartment-02.jpg'] },
  { title: 'Студия Комфорт', area: 26, max: 2, price: 2700, images: ['/images/homekeeper/apartment-03.jpg'] },
  { title: 'Делюкс', area: 34, max: 2, price: 7500, images: ['/images/homekeeper/apartment-04.jpg'] },
  { title: 'Делюкс Евро', area: 35, max: 4, price: 3800, images: ['/images/homekeeper/apartment-05.jpg'] },
  { title: 'Двухкомнатный', area: 49, max: 4, price: 6500, images: ['/images/homekeeper/apartment-06.jpg'] },
  { title: 'Студия Компакт, корпус 2', area: 18, max: 2, price: 2700, images: ['/images/homekeeper/apartment-07.jpg'] },
  { title: 'Студия Стандарт, корпус 2', area: 24, max: 2, price: 2700, images: ['/images/homekeeper/apartment-08.jpg'] },
  { title: 'Студия Комфорт, корпус 2', area: 26, max: 2, price: 2700, images: ['/images/homekeeper/apartment-09.jpg'] },
];

const in2itImages = apartmentTypes.flatMap((type) => type.images.map(officialImage));
const suppliedGalleryPhotos = Array.from(
  { length: 70 },
  (_, index) => `/images/homekeeper/room-gallery-${String(index + 1).padStart(2, '0')}.jpg`,
);

const araratDescriptions = [
  'Светлая студия с кухней, удобной кроватью и местом для отдыха после дороги.',
  'Уютные апартаменты для двоих с продуманным хранением и спокойной атмосферой.',
  'Компактный номер с кухонной зоной для короткой поездки в Санкт Петербург.',
  'Пространство с большой кроватью, рабочей зоной и всем необходимым для проживания.',
  'Апартаменты с современным интерьером для отдыха, работы и городских прогулок.',
];

rooms.splice(8);

rooms.forEach((room, index) => {
  const type = apartmentTypes[index % apartmentTypes.length];
  const start = Math.floor(index * suppliedGalleryPhotos.length / rooms.length);
  const end = Math.floor((index + 1) * suppliedGalleryPhotos.length / rooms.length);
  const gallery = suppliedGalleryPhotos.slice(start, end);
  const image = gallery[0];
  room.title = type.title;
  room.group = 'Апартаменты';
  room.city = 'Санкт Петербург';
  room.location = 'Апарт отель IN2IT, Витебский проспект, 101, корпус 1';
  room.description = araratDescriptions[index % araratDescriptions.length];
  room.details = `${araratDescriptions[index % araratDescriptions.length]} Во всех апартаментах бесконтактное заселение. После подтверждения бронирования отправим понятную инструкцию для заезда.`;
  room.badge = '';
  room.available = [0, 3, 5, 6].includes(index);
  room.area = type.area;
  room.max = type.max;
  room.price = type.price;
  const customImages = { 0: '/images/homekeeper/кровать1.jpg', 1: '/images/homekeeper/кровать2.jpg', 2: '/images/homekeeper/кровать3.jpg', 3: '/images/homekeeper/кровать0.jpg', 4: '/images/homekeeper/кровать6.jpg', 5: '/images/homekeeper/кровать7.jpg', 6: '/images/homekeeper/кровать8.jpg', 7: '/images/homekeeper/кровать11.jpg' };
  room.image = customImages[index] ?? image;
  room.gallery = gallery;
});

export const includedAmenities = [
  { title: 'Кухня в каждом номере', text: 'Можно приготовить завтрак, перекусить после дороги и жить в привычном ритме.', image: '/images/homekeeper/room-gallery-05.jpg' },
  { title: 'Бесконтактное заселение', text: 'Во всех апартаментах заселение проходит без ожидания на стойке.', image: '/images/homekeeper/bedroom-curved.webp' },
  { title: 'Рядом с метро', text: 'До станции Купчино можно дойти за несколько минут.', image: '/images/homekeeper/room-gallery-18.jpg' },
  { title: 'Для коротких и долгих поездок', text: 'Подойдет для отдыха, командировки и проживания на несколько недель.', image: '/images/homekeeper/bedroom-view.webp' },
];

export const gallery = [
  '/images/homekeeper/room-gallery-03.jpg',
  '/images/homekeeper/room-gallery-11.jpg',
  '/images/homekeeper/room-gallery-22.jpg',
  '/images/homekeeper/room-gallery-35.jpg',
  '/images/homekeeper/room-gallery-47.jpg',
  '/images/homekeeper/room-gallery-58.jpg',
];
