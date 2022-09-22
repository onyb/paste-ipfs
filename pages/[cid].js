import React from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Footer from '../components/footer'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
// import ReactLoading from "react-loading";

const Viewer = dynamic(import('../components/viewer'), { ssr: false })


export default function ViewCID () {
  const [isLoading, setIsLoading] = React.useState(true);
  
  const handleLoading = () => {
    setIsLoading(false);
  }

  React.useEffect(()=>{
    window.addEventListener("load",handleLoading);
    return () => window.removeEventListener("load", handleLoading);
  },[])

  const router = useRouter()
  const { cid } = router.query

  return !isLoading ? (
    <div className={styles.container}>
      <Head>
        <title>Paste@IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>
          <h1 className={styles.navbar}>
              <Link href="/">Paste@IPFS</Link>
          </h1>
          <h3 className={styles.description}>Your snippet powered by IPFS</h3>
        </div>
        {/* <div className={styles.main}>
          <Viewer
            cid={cid} />
        </div> */}
        <Viewer
          cid={cid} />
        <Footer />
      </main>
    </div>
  ) : (
    <>
      <div className={styles.container}>
      <Head>
        <title>Paste@IPFS</title>
        <meta name='description' content='Share code snippets on the Interplanetary Web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div>
          <h1 className={styles.navbar}>
              <Link href="/">Paste@IPFS</Link>
          </h1>
          <h3 className={styles.description}>Loading...</h3>
          {/* <ReactLoading type="bubbles" color="#0000FF" height={100} width={50} /> */}
        </div>
      </main>
    </div>
    </>
  )
}
