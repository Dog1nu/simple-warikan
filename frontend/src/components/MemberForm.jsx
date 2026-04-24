import { useState } from "react";
function MemberForm(){
  const[name, setName] = useState('')
  const  handleSubmit = async() => {
    await fetch('http://localhost:3000/members',{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name})
    })
    setName('')
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