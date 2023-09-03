import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const prisma = new PrismaClient()
  const product = await prisma.products.findUnique({ where: { id } })
  await prisma.$disconnect()
  return product ?? event.respondWith(new Response('Not found', { status: 404 }))
})
