export const pluralRu = (value, forms) => {
  const absolute = Math.abs(value) % 100;
  const last = absolute % 10;
  if (absolute > 10 && absolute < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
};

export const guestLabel = (value) => `${value} ${pluralRu(value, ['гость', 'гостя', 'гостей'])}`;
export const bedLabel = (value) => `${value} ${pluralRu(value, ['кровать', 'кровати', 'кроватей'])}`;
export const roomMetaLabel = (room) => [room.city, guestLabel(room.max), `${room.area} м²`].join(' · ');
