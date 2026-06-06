import { useState, useEffect } from "react";

function Result(){
  const [result, setResult] = useState([])
  const fetchResult = async() =>{ 
    const res = await fetch('http://localhost:3000/result') //GETしたときresに中身を代入
    const data = await res.json()
    setResult(data.settlements) //再レンダリングしてメンバーリストを更新
  }

  useEffect(() => {
    fetchResult()
  },[])
  return(
    <div>
      {result.map(result =>(
        <p key={result.from}>{result.from} → {result.to} : ￥{result.amount}</p>
      ))}
    </div>
  )
}

export default Result