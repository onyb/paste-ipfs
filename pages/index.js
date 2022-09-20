import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Link from 'next/link'
import Highlighter from '../components/Highlighter'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Paste IPFS</title>
        <meta name="description" content="Share code snippets on the Interplanetary Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          PasteIPFS
        </h1>
        <h3 className={styles.description}>
          Share code snippets on the Interplanetary Web
        </h3>
        <Highlighter/>     
      </main>
      
      <footer className={styles.footer}>
        <span>
          <a
          href="https://twitter.com/adybose"
          >
            © 2022 Aditya Bose
          </a>
          Made with ❤️ in India 🇮🇳
        </span>
      </footer>
    </div>
  )
}
