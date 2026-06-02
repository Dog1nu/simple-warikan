const express = require('express')
const router = express.Router()
const {PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req,res) => {
  //処理１：全アイテムの情報を取得
  const allItems = await prisma.item.findMany({ 
    include: {
    itemMembers: {
       include: {
        member: true
      }
    },
    payer: true
  }
  })  

  // 処理２：人数分だけ収支の配列要素を作り、０を代入
  const balance = {} //配列の初期化
  const members = await prisma.member.findMany() //全レコードを取得
  members.forEach(member => {
    balance[member.id] = 0
  })

  // 処理３：計算
  allItems.forEach(item => {
    balance[item.payerId] += item.amount //支払者に支払金額を代入
    const share = Math.round(item.amount / item.itemMembers.length) //金額÷人数の値
    item.itemMembers.forEach(itemMember =>{
      balance[itemMember.memberId] -= share 
    })
  })
  
  //処理４：
  const settlements = []
  const debtors = members.filter(m => balance[m.id] < 0).map(m => ({ name: m.name, amount: -balance[m.id] }))
  const creditors = members.filter(m => balance[m.id] > 0).map(m => ({ name: m.name, amount: balance[m.id] }))

  let di = 0, ci = 0
  while (di < debtors.length && ci < creditors.length) {
    const pay = Math.min(debtors[di].amount, creditors[ci].amount)
    if (pay > 0) settlements.push({ from: debtors[di].name, to: creditors[ci].name, amount: pay })
    debtors[di].amount -= pay
    creditors[ci].amount -= pay
    if (debtors[di].amount === 0) di++
    if (creditors[ci].amount === 0) ci++
  }

  res.json({ settlements })

})


module.exports = router