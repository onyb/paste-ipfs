import Head from 'next/head'
import dynamic from 'next/dynamic'

import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

const Highlighter = dynamic(import('../components/Highlighter'), { ssr: false })

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Paste IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>PasteIPFS</h1>
        <h3 className={styles.description}>Share code snippets on the Interplanetary Web</h3>
        <Highlighter />
      </main>

      <Footer />
    </div>
  )
}
