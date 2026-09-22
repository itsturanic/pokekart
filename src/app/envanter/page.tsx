// Prototip envanter sayfası — gerçek sürümde CardInstance + CardDefinition join'i ile beslenecek.
const mockCollection = [
  { name: "Charizard ex", type: "Fire", rarity: "Secret Rare", hp: 330, attack: 90, defense: 40 },
  { name: "Pikachu", type: "Electric", rarity: "Common", hp: 60, attack: 30, defense: 10 },
  { name: "Gyarados", type: "Water", rarity: "Rare", hp: 180, attack: 70, defense: 55 },
];

export default function EnvanterPage() {
  return (
    <div className="py-12">
      <h1 className="text-2xl font-semibold text-parchment">Envanterim</h1>
      <p className="mt-2 text-parchment/70">
        Paket açarak kazandığın kartlar burada listelenir. Fiyat yok — sadece
        istatistik (HP / saldırı / savunma) ve nadirlik.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {mockCollection.map((c) => (
          <div key={c.name} className="card-frame p-4">
            <p className="text-xs text-holo1">{c.rarity} · {c.type}</p>
            <p className="mt-1 text-lg font-semibold text-parchment">{c.name}</p>
            <div className="ticker mt-3 flex gap-4 text-sm text-parchment/70">
              <span>HP {c.hp}</span>
              <span>ATK {c.attack}</span>
              <span>DEF {c.defense}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
