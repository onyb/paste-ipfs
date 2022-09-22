import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import styles from '../styles/Home.module.css'

const HomeComponent = dynamic(import('../components/home'), { ssr: false })

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Paste IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>Paste IPFS</h1>
        <h3 className={styles.description}>Share code snippets on the Interplanetary Web</h3>
        <HomeComponent />
      </main>
    </div>
  )
}
