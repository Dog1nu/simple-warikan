import {useState, useEffect} from 'react'
import MemberForm from './components/MemberForm'
import MemberList from './components/MemberList'
import ItemForm from './components/ItemForm'
import Result from './components/Result'


function App() { 
  const [members, setMembers] = useState([])
  const [result, setResult] = useState([])

  const fetchMembers = async() =>{ 
    const res = await fetch('http://localhost:3000/members') //GETしたときresに中身を代入
    const data = await res.json()
    setMembers(data) //再レンダリングしてメンバーリストを更新
  }

  useEffect(() => {
    fetchMembers()
  },[])
  return (
    <div>
      <h1>warikan app</h1>
      <MemberForm onAdd={fetchMembers}/>
      <MemberList members={members}/>
      <ItemForm members={members}/>
      <Result result={result}/>

    </div>
  )
}

export default App