import React from 'react'
import style from './style.module.css'

export default function Restart({restart, setRestart}) {

  const restartHandler = () => {
    setRestart(true)
    console.log(restart);
  }

  return (
    <button onClick={restartHandler} id='retry' className={style.restartBtn}>Restart</button>
  )
}
