import React from 'react'
import style from './style.module.css'

export default function Score({score}) {
  return (
    <div className={style.score}>{score}</div>
  )
}
