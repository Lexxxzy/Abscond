import React from 'react'
import cn from "classnames"
import styles from "./LoginManager.module.sass"
import Login from '../Login'

export const LoginManager = () => {
  return (
    <div className={cn(styles.login)}>
        <Login isFromManagement={true}/>
    </div>
  )
}
