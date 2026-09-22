/**
 * Ağırlıklı rastgele paket açma mantığı.
 * Her PackSlot bir dropWeight taşır; toplam ağırlığa göre rastgele seçim yapılır.
 */

export interface Slot {
  id: string;
  cardId: string;
  dropWeight: number;
}

export function openPack(slots: Slot[], cardsPerPack = 10): Slot[] {
  const totalWeight = slots.reduce((sum, s) => sum + s.dropWeight, 0);
  const results: Slot[] = [];

  for (let i = 0; i < cardsPerPack; i++) {
    let roll = Math.random() * totalWeight;
    for (const slot of slots) {
      roll -= slot.dropWeight;
      if (roll <= 0) {
        results.push(slot);
        break;
      }
    }
  }
  return results;
}
