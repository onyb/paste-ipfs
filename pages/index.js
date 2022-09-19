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

        <p className={styles.description}>
          Share code snippets on the Interplanetary Web
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        
        <Highlighter/>
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://adybose.github.io"
        >
          Made with ❤️ in India
        </a>
      </footer>
    </div>
  )
}
