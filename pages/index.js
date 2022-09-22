import React from 'react'

import Head from 'next/head'
import dynamic from 'next/dynamic'

import Footer from '../components/footer'
import styles from '../styles/Home.module.css'

const HomeComponent = dynamic(import('../components/home'), { ssr: false })


export default function Home () {
  const [isLoading, setIsLoading] = React.useState(true);
  
  const handleLoading = () => {
    setIsLoading(false);
  }

  React.useEffect(()=>{
    window.addEventListener("load",handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  },[])

  return !isLoading ? (
    <div className={styles.container}>
      <Head>
        <title>Paste@IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>Paste@IPFS</h1>
        <h3 className={styles.description}>Share code snippets on the Interplanetary Web</h3>
        <HomeComponent />
      </main>

      <Footer />
    </div>
  ) : (
    <div className={styles.container}>
      <Head>
        <title>Paste@IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>Paste@IPFS</h1>
        <h3 className={styles.description}>Share code snippets on the Interplanetary Web</h3>
        <h3 className={styles.description}>Loading...</h3>
      </main>
      
      <Footer />
    </div>
  )
}
