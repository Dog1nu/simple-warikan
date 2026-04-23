const express = require('express')
const router = express.Router()
const {PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req,res) => {
    const members = await prisma.member.findMany() //prismaからmemberテーブル取得
    res.json(members) // memberをJSONでかえす
 })

router.post('/', async(req,res) => {
    const { name } = req.body
    const member = await prisma.member.create({
        data: { name } //{name: name}の省略形
    })
    res.json(member)
})

module.exports = router