import styles from '../styles/Home.module.css'

export default function About() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <a href="https://twitter.com/marukun_92"><h1>製作者:marukun_</h1></a>
                <h1>アルバ・セラさんの歌枠からタイムスタンプコメントを取得して音楽プレイヤーのように再生できるサイトです。</h1>
            </main>
        </div>
    )
}