import { useState, useEffect } from 'react'

function MemberList({members}) {

  return (
    <div>
      {members.map(member => (
        <p key={member.id}>{member.name}</p>
      ))}
    </div>
  )
}

export default MemberList