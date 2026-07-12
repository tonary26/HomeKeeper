export const pluralRu = (value, forms) => {
  const absolute = Math.abs(value) % 100;
  const last = absolute % 10;

  if (absolute > 10 && absolute < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
};

export const guestLabel = (value) => `${value} ${pluralRu(value, ['гость', 'гостя', 'гостей'])}`;

export const bedLabel = (value) => {
  const count = Number.parseInt(String(value || ''), 10);
  if (!Number.isFinite(count) || count <= 0) return '';
  return `${count} ${pluralRu(count, ['кровать', 'кровати', 'кроватей'])}`;
};

export const isBathRoom = (room) => room.group === 'Бани / Сауны';

export const roomMetaLabel = (room) => {
  const parts = [guestLabel(room.max)];
  const beds = bedLabel(room.beds);

  if (!isBathRoom(room) && beds) parts.push(beds);
  return parts.join(' · ');
};
