export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold tracking-tight text-parchment">
          Poke<span className="text-volt">Kart</span>
        </a>
        <nav className="hidden gap-6 text-sm text-parchment/70 sm:flex">
          <a href="/simulator" className="hover:text-parchment">Paket Aç</a>
          <a href="/envanter" className="hover:text-parchment">Envanter</a>
          <a href="/savas" className="hover:text-parchment">Savaş</a>
        </nav>
        <div className="card-frame flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
          <span className="ticker text-volt">₭ 1.000,00</span>
        </div>
      </div>
    </header>
  );
}
