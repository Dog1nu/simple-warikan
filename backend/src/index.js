const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const membersRouter = require ('./routes/members')
const itemsRouter = require ('./routes/items')
const resultRouter = require ('./routes/result')

app.use(cors())
app.use(express.json())
app.use('/members',membersRouter)
app.use('/items',itemsRouter)
app.use('/result',resultRouter)

app.get('/', (req,res)=>{
  res.json({ message: 'Hello,claude!'})
})

app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`)
})
