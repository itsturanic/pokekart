import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { openPack } from "@/lib/packOpening";

export async function POST(req: NextRequest) {
  const { userId, packId } = await req.json();

  const pack = await prisma.product.findUnique({
    where: { id: packId },
    include: { packSlots: true },
  });
  const wallet = await prisma.wallet.findUnique({ where: { userId } });

  if (!pack || !wallet) {
    return NextResponse.json({ error: "Paket veya cüzdan bulunamadı" }, { status: 404 });
  }
  if (Number(wallet.balance) < Number(pack.price)) {
    return NextResponse.json({ error: "Yetersiz jeton bakiyesi" }, { status: 400 });
  }

  const drawn = openPack(pack.packSlots, 10); // 10 kartlık paket varsayımı

  await prisma.wallet.update({ where: { userId }, data: { balance: { decrement: pack.price } } });
  await prisma.packOpenLog.create({ data: { userId, packId, resultJson: drawn } });
  const cardInstances = await prisma.cardInstance.createManyAndReturn({
    data: drawn.map((slot) => ({
      userId,
      cardId: slot.cardId,
      acquiredVia: "PACK_OPEN" as const,
    })),
    include: { card: true },
  });

  return NextResponse.json({ cards: cardInstances });
}
