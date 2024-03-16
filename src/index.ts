import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


//เอาทุกอัน
app.get('/fund', async (req, res) => {
  const funds = await prisma.fund.findMany()
  res.json(funds)
})
//เอาอันที่ไอดีตรง
app.get('/fund/:unique_id', async (req, res) => {
  try {
    const { unique_id } = req.params;

    // Use Prisma to query the database
    const fund = await prisma.fund.findMany({
      where: { unique_id},
    }); 

    if (!fund) {
      return res.status(404).json({ error: 'Fund not found' });
    }

    res.json(fund);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// /filter?searchString={searchString}&take={take}&skip={skip}&orderBy={orderBy}
app.get('/filter', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or: Prisma.FundWhereInput = searchString
    ? {
      OR: [
        { proj_name_th: { contains: searchString as string } },
        { proj_name_en: { contains: searchString as string } },
      ],
      }
    : {}
  const funds = await prisma.fund.findMany({
    where: {
      ...or,
    },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      proj_name_en: orderBy as Prisma.SortOrder,
    },
  })

  res.json(funds)
})

///////////////////////////////// test /////////////////////////////////////////
//เอาทุกอัน
app.get('/product', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
})

// /filter/product?searchString={searchString}&take={take}&skip={skip}&orderBy={orderBy}
app.get('/filter/product', async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query

  const or: Prisma.ProductWhereInput = searchString
    ? {
      OR: [
        { proj_name_th: { contains: searchString as string } },
        { proj_name_en: { contains: searchString as string } },
        { proj_abbr_name: { contains: searchString as string }},
      ],
      }
    : {}
  const products = await prisma.product.findMany({
    where: {
      ...or,
    },
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      proj_name_en: orderBy as Prisma.SortOrder,
    },
  })

  res.json(products)
})

app.listen(5173)