export default function SimulatorPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-parchment">Paketi Yırt</h1>
      <p className="max-w-md text-parchment/70">
        Burada 3D paket açma animasyonu, ağırlıklı kart çekim mantığı
        (<code className="ticker text-holo1">lib/packOpening.ts</code>) ile bağlanacak.
        Şimdilik iskelet sayfa.
      </p>
      <button className="rounded-full bg-volt px-8 py-3 font-semibold text-ink">
        Paketi aç (₭ 120)
      </button>
    </div>
  );
}
