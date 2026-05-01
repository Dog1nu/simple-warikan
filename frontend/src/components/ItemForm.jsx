import { useState } from "react";
function ItemForm({onAdd}){
  const[name, setName] = useState('') //
  const[amount , setAmount] = useState(0)
  const[payerId, setPayerId] = useState(null)
  const[splitMemberIds, setSplitMemberIds] = useState([])
  const  handleSubmit = async() => {
    await fetch('http://localhost:3000/items',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, amount, payerId, itemMembers})
    })
    setName('')
    onAdd()
    }


  return  (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="商品名"
        />

      <button onClick={handleSubmit}>
        追加
      </button>
    </div>
  )

}

export default ItemForm