import { useState, useEffect } from 'react'

function MemberList() {
  const [members, setMembers] = useState([])

  // ページ読み込み時一度だけ呼び出す
  useEffect(() => {
    fetch('http://localhost:3000/members')
      .then(res => res.json())
      .then(data => setMembers(data))
  }, [])

  return (
    <div>
      {members.map(member => (
        <p key={member.id}>{member.name}</p>
      ))}
    </div>
  )
}

export default MemberList