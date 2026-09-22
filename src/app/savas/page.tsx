"use client";

import { useState } from "react";

interface TurnLog {
  turn: number;
  attackerName: string;
  defenderName: string;
  damage: number;
  crit: boolean;
  defenderHpAfter: number;
}

export default function SavasPage() {
  const [log, setLog] = useState<TurnLog[] | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Prototip: gerçek sürümde kullanıcı kendi destesini ve rakip eşleşmeyi seçecek
  async function startBattle() {
    setLoading(true);
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerAId: "demo-a",
          deckAId: "demo-deck-a",
          playerBId: "demo-b",
          deckBId: "demo-deck-b",
        }),
      });
      const data = await res.json();
      if (data.error) {
        setResult(data.error);
      } else {
        setResult(data.result === "A_WON" ? "Kazandın! +50 jeton" : data.result === "B_WON" ? "Kaybettin" : "Berabere");
        setLog(data.log);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold text-parchment">Savaş</h1>
      <p className="mt-2 max-w-xl text-parchment/70">
        Destendeki kartlar sırayla rakip kartlarla eşleşir, HP/attack/defense
        istatistiklerine göre otomatik çözümlenir. Fiyat/borsa hiçbir şekilde
        işin içinde değil — sadece kart gücü ve biraz şans.
      </p>

      <button
        onClick={startBattle}
        disabled={loading}
        className="mt-6 rounded-full bg-volt px-6 py-3 font-semibold text-ink disabled:opacity-50"
      >
        {loading ? "Savaşılıyor..." : "Rastgele rakiple savaş"}
      </button>

      {result && (
        <div className="card-frame mt-6 p-5">
          <p className="text-lg font-semibold text-parchment">{result}</p>
        </div>
      )}

      {log && (
        <ol className="mt-4 space-y-1">
          {log.map((t, i) => (
            <li key={i} className="ticker text-sm text-parchment/70">
              Tur {t.turn}: {t.attackerName} → {t.defenderName} için {t.damage} hasar
              {t.crit ? " (KRİTİK)" : ""} — kalan can {t.defenderHpAfter}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
