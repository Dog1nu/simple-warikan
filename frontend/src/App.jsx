import {useState, useEffect} from 'react'
import MemberForm from './components/MemberForm'
import MemberList from './components/MemberList'


function App() { 
  const [members, setMembers] = useState([])

  const fetchMembers = async() =>{ 
    const res = await fetch('http://localhost:3000/members') //GETしたときresに中身を代入
    const data = await res.json()
    setMembers(data)　//再レンダリングしてメンバーリストを更新
  }

  useEffect(() => {
    fetchMembers()
  },[])
  return (
    <div>
      <h1>warikan app</h1>
      <MemberForm onAdd={fetchMembers}/>
      <MemberList members={members}/>
    </div>
  )
}

export default App