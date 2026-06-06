import { useState } from "react";
function MemberForm({onAdd}){
  const[name, setName] = useState('')
  const  handleSubmit = async() => {
    //未入力があればアラート
    if(!name || !amount || !payerId || splitMemberIds.length === 0){
      alert("すべての項目を入力してください！")
      return 
    }
    await fetch('http://localhost:3000/members',{
      method:'POST', //POSTリクエストで追加時にmember追加APIをたたく
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name})
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
        placeholder="メンバー名"
        />
      <button onClick={handleSubmit}>
        追加
      </button>
    </div>
  )

}

export default MemberForm