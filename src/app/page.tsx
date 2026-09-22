// Ana sayfa — borsa/fiyat vitrini yok. Odak: paket aç, koleksiyon, savaş.

const features = [
  {
    title: "Paketi yırt",
    body: "Günlük jetonunla booster paket aç, gerçek düşme oranlarına yakın ağırlıklı çekilişle kartını yakala.",
    href: "/simulator",
    cta: "Paket aç",
  },
  {
    title: "Koleksiyonunu kur",
    body: "Açtığın her kart envanterine düşer. Setleri tamamla, nadir kartları biriktir.",
    href: "/envanter",
    cta: "Envanteri gör",
  },
  {
    title: "Destenle savaş",
    body: "Kartlarının HP/attack/defense istatistikleriyle diğer oyuncuların destesine karşı otomatik çözümlenen savaşlara gir, jeton kazan.",
    href: "/savas",
    cta: "Savaşa git",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="flex flex-col items-start gap-6 py-16">
        <span className="ticker text-sm text-holo1">jeton ile oynanır · gerçek para yok · borsa yok</span>
        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] text-parchment">
          Paketi yırt, kartını yakala,
          <br />
          destenle savaşa gir.
        </h1>
        <p className="max-w-xl text-lg text-parchment/70">
          PokeKart'ta ne gerçek para geçer ne de kart fiyatı dalgalanır. Günlük jetonunla
          paket açar, koleksiyonunu büyütür, topladığın kartlarla diğer oyunculara karşı
          savaşırsın.
        </p>
        <a href="/simulator" className="rounded-full bg-volt px-6 py-3 font-semibold text-ink">
          Ücretsiz paket aç
        </a>
      </section>

      <section className="grid gap-4 py-10 sm:grid-cols-3">
        {features.map((f) => (
          <a key={f.title} href={f.href} className="card-frame flex flex-col gap-3 p-6">
            <h2 className="text-lg font-semibold text-parchment">{f.title}</h2>
            <p className="flex-1 text-sm text-parchment/70">{f.body}</p>
            <span className="text-sm text-holo1">{f.cta} →</span>
          </a>
        ))}
      </section>
    </div>
  );
}
