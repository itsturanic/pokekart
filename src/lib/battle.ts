/**
 * PokeKart Savaş Motoru
 * ─────────────────────
 * Borsa/fiyat sistemiyle hiçbir ilgisi yok — iki destenin kartları
 * sırayla eşleşir, HP/attack/defense istatistiklerine göre çarpışır.
 * Küçük bir rastgelelik (crit şansı) eklenerek her savaş öngörülebilir
 * olmaktan çıkarılır.
 */

export interface BattleCard {
  instanceId: string;
  name: string;
  hp: number;
  attack: number;
  defense: number;
}

export interface TurnLog {
  turn: number;
  attackerName: string;
  defenderName: string;
  damage: number;
  crit: boolean;
  defenderHpAfter: number;
}

export interface BattleOutcome {
  result: "A_WON" | "B_WON" | "DRAW";
  log: TurnLog[];
}

function calcDamage(attacker: BattleCard, defender: BattleCard) {
  const crit = Math.random() < 0.15;
  const raw = Math.max(attacker.attack - defender.defense * 0.5, attacker.attack * 0.2);
  const damage = Math.round(crit ? raw * 1.5 : raw);
  return { damage, crit };
}

/** İki desteyi kart kart karşılaştırıp savaşı çözer (basit "gauntlet" formatı) */
export function resolveBattle(deckA: BattleCard[], deckB: BattleCard[]): BattleOutcome {
  const log: TurnLog[] = [];
  const queueA = deckA.map((c) => ({ ...c }));
  const queueB = deckB.map((c) => ({ ...c }));
  let turn = 0;

  while (queueA.length > 0 && queueB.length > 0 && turn < 200) {
    turn++;
    const a = queueA[0];
    const b = queueB[0];

    // A saldırır
    const hitA = calcDamage(a, b);
    b.hp -= hitA.damage;
    log.push({ turn, attackerName: a.name, defenderName: b.name, damage: hitA.damage, crit: hitA.crit, defenderHpAfter: Math.max(b.hp, 0) });
    if (b.hp <= 0) {
      queueB.shift();
      continue;
    }

    // B karşılık verir
    const hitB = calcDamage(b, a);
    a.hp -= hitB.damage;
    log.push({ turn, attackerName: b.name, defenderName: a.name, damage: hitB.damage, crit: hitB.crit, defenderHpAfter: Math.max(a.hp, 0) });
    if (a.hp <= 0) {
      queueA.shift();
    }
  }

  if (queueA.length === 0 && queueB.length === 0) return { result: "DRAW", log };
  return { result: queueA.length > 0 ? "A_WON" : "B_WON", log };
}
