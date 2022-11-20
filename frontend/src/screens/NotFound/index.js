import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.sass'

export const NotFound = () => {
  return (
    <div className={styles.section}>
        <div className={styles.body}>
             <div className={styles.wrapper}>
                <h1 className={styles.header}>404 - Not Found!</h1>
                <Link className={styles.home} to="/">Go Home</Link>
            </div>
        </div>
    </div>
  )
}
