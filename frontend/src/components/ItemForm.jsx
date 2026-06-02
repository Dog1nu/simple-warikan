import { useState } from "react";
function ItemForm({onAdd , members}){
  const[name, setName] = useState('') //空の文字列
  const[amount , setAmount] = useState(0) 
  const[payerId, setPayerId] = useState(null) //Idに0があるので0でなくnull
  const[splitMemberIds, setSplitMemberIds] = useState([]) //空の配列
  const  handleSubmit = async() => {
    await fetch('http://localhost:3000/items',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, amount, payerId, splitMemberIds})
    })
    setName('')
    }


  return  (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="商品名"
        />


      <input
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))} //e.target.valueは文字列なので、型キャスト
        placeholder="金額"
        />


      <select
        value={payerId}
        onChange={e=>setPayerId(Number(e.target.value))} //e.target.valueは文字列を返すので型キャスト
      >
        <option value="">支払った人を選択</option>
      {members.map(member =>(
        <option key={member.id} value={member.id}>{member.name}</option>
      )) }
      </select>


      <div>
        <p>割り勘メンバー</p>
        {members.map(member => (
          <label key={member.id}>
            <input
              type="checkbox"
              value={member.id}
              onChange={e=>{
                if(e.target.checked){ 
                  setSplitMemberIds([...splitMemberIds, member.id])
                }else{
                  setSplitMemberIds(splitMemberIds.filter(id => id !== member.id))
                }
              }}
              >
            </input>
              {member.name}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>
        追加
      </button>
    </div>
  )

}

export default ItemForm