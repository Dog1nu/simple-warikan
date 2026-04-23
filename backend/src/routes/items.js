const express = require('express')
const router = express.Router()
const {PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/', async (req,res) => {
    const items = await prisma.item.findMany({
    include: {
  itemMembers: {
    include: {
      member: true //外部のDBにアクセスできるようにする
    }
  },
  payer: true //外部のDBにアクセスできるようにする
}
}) //prismaからitemテーブル取得

    res.json(items) // itemテーブルをJSONでかえす
    
 })

router.post('/', async(req,res) => {
    const { name, amount, payerId, splitMemberIds } = req.body
    const item = await prisma.item.create({
        data: { name,
                amount,
                payerId,
                itemMembers:{
                    create:splitMemberIds.map(memberId => ({ memberId }))
                }
         } 
    })
    res.json(item)
})

module.exports = router