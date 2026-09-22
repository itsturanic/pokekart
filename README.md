# PokeKart

Sanal jetonla çalışan Pokémon TCG temalı **paket aç → koleksiyon → savaş** platformu.

**Yok:** gerçek para, fiyat grafiği/borsa, kullanıcılar arası alım-satım.
**Var:** sabit fiyattan paket satın alma, gerçek kart istatistikleriyle (HP/ATK/DEF)
otomatik çözümlenen savaş sistemi, jeton ekonomisi (günlük giriş + savaş ödülü).

## Kurulum

```bash
npm install
cp .env.example .env      # DATABASE_URL'i kendi Postgres'ine göre düzenle
npx prisma migrate dev --name init
npm run dev
```

## Proje yapısı

```
prisma/schema.prisma        User, Wallet, CardSet, CardDefinition (oyun istatistikleri),
                             Product (sabit fiyatlı mağaza ürünü), PackSlot, CardInstance,
                             Deck/DeckCard, Battle
src/lib/packOpening.ts      ağırlıklı rastgele paket açma
src/lib/battle.ts           istatistik-tabanlı savaş çözümleyici (HP/ATK/DEF + crit şansı)
src/app/api/shop/buy        sabit fiyattan satın alma (borsa yok)
src/app/api/pack/open       paket açma → CardInstance üretimi
src/app/api/battle          iki deste arasında savaş çözümü + kazanana jeton ödülü
src/app/simulator           paket açma sayfası
src/app/envanter            koleksiyon sayfası (fiyatsız — sadece istatistik/nadirlik)
src/app/savas               savaş sayfası (tur tur log gösterimi)
```

## Ekonomi nasıl işliyor?

- Her kullanıcının bir `Wallet.balance`'ı var (başlangıçta 1000 jeton)
- Jeton kazanma yolları: günlük giriş bonusu (`lastDailyClaim`), savaş kazanma (+50)
- Jeton harcama: `/api/shop/buy` ile sabit fiyattan paket/kutu satın alma
- **Hiçbir ürünün fiyatı arz-talebe göre değişmez** — `Product.price` sabittir

## Savaş nasıl çözümleniyor?

`src/lib/battle.ts` iki destedeki kartları sırayla eşleştirir ("gauntlet" formatı):
saldıran kartın `attack`'ı savunanın `defense`'inin yarısı kadar azaltılarak hasar
hesaplanır, %15 ihtimalle kritik vuruş olur. Kartın HP'si biterse sıradaki kart
devreye girer. Tüm turlar `Battle.logJson` içine kaydedilir — UI'da replay
göstermek için kullanılabilir.

## Yol haritası

- [x] Şema + paket açma + sabit fiyatlı mağaza + savaş motoru (bu teslimat)
- [ ] Auth (NextAuth) + gerçek kullanıcı oturumu
- [ ] Deste kurma ekranı (drag&drop, max kart sayısı kontrolü)
- [ ] Gerçek kart kataloğu (pokemontcg.io'dan HP/ATK/DEF türetme ya da elle giriş)
- [ ] Matchmaking (rastgele rakip eşleştirme kuyruğu)
- [ ] Günlük jeton bonusu cron/route'u

## Not

Pokémon ve ilgili görseller The Pokémon Company'nin ticari markasıdır. Bu proje
resmi bir bağlantı iddia etmemeli; sayfalarda net bir "resmi değildir" ibaresi
bulunmalı.
