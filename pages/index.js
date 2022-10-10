import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Fetch from '../components/fetch'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          歌一覧
        </h1>
        <hr className='py-10'></hr>
        <Fetch />
      </main>
    </div>
  )
}
