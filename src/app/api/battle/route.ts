import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resolveBattle, type BattleCard } from "@/lib/battle";

export async function POST(req: NextRequest) {
  const { playerAId, deckAId, playerBId, deckBId } = await req.json();

  const [deckA, deckB] = await Promise.all([
    prisma.deck.findUnique({
      where: { id: deckAId },
      include: { cards: { include: { cardInstance: { include: { card: true } } } } },
    }),
    prisma.deck.findUnique({
      where: { id: deckBId },
      include: { cards: { include: { cardInstance: { include: { card: true } } } } },
    }),
  ]);

  if (!deckA || !deckB) {
    return NextResponse.json({ error: "Deste bulunamadı" }, { status: 404 });
  }

  const toBattleCards = (deck: typeof deckA): BattleCard[] =>
    deck.cards.map((dc) => ({
      instanceId: dc.cardInstance.id,
      name: dc.cardInstance.card.name,
      hp: dc.cardInstance.card.hp,
      attack: dc.cardInstance.card.attack,
      defense: dc.cardInstance.card.defense,
    }));

  const outcome = resolveBattle(toBattleCards(deckA), toBattleCards(deckB));

  const battle = await prisma.battle.create({
    data: {
      playerAId,
      deckAId,
      playerBId,
      deckBId,
      result: outcome.result,
      logJson: outcome.log,
    },
  });

  // Kazanana küçük bir jeton ödülü — borsa yok, sadece oynanış teşviki
  const winnerId = outcome.result === "A_WON" ? playerAId : outcome.result === "B_WON" ? playerBId : null;
  if (winnerId) {
    await prisma.wallet.update({
      where: { userId: winnerId },
      data: { balance: { increment: 50 } },
    });
  }

  return NextResponse.json({ battleId: battle.id, result: outcome.result, log: outcome.log });
}
