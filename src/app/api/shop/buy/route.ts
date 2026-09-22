import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Sabit fiyattan satın alma. Fiyat asla değişmez, borsa/arz-talep yok.
export async function POST(req: NextRequest) {
  const { userId, productId, quantity } = await req.json();

  if (!userId || !productId || !quantity || quantity <= 0) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const [product, wallet] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.wallet.findUnique({ where: { userId } }),
  ]);

  if (!product || !wallet) {
    return NextResponse.json({ error: "Ürün veya cüzdan bulunamadı" }, { status: 404 });
  }

  const total = Number(product.price) * quantity;
  if (Number(wallet.balance) < total) {
    return NextResponse.json({ error: "Yetersiz jeton bakiyesi" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.wallet.update({ where: { userId }, data: { balance: { decrement: total } } }),
    prisma.purchase.create({ data: { userId, productId, quantity, total } }),
  ]);

  return NextResponse.json({ ok: true, total });
}
