import Head from "next/head"
import { useState } from "react"
import { InputForm } from "@/component/InputForm"
import styles from "styles/index.module.scss"
import { Layout } from "@/component/Layout"
import { Footer } from "@/component/Footer"

export default function Home() {
    const [foodInput, setFoodInput] = useState("")
    const [result, setResult] = useState("")

    return (
        <div>
        <Head>
            <title>Generate Dishes</title>
        </Head>
        <Layout>
        <main className={styles.main}>
            <div className={styles.title}>
            <p>Generate Dishes</p>
            <p>Put in some ingredients and find dishes!</p>
            </div>
            <InputForm
            foodInput={foodInput}
            setFoodInput={setFoodInput}
            setResult={setResult}
            />
            <div className={styles.result}>
            {result.split('\n').map((line, index) => {
                return <li key={index}>{line}<br/></li>
            })}
            </div>
        </main>
        </Layout>
        <Footer/>
        </div>
    )
    }
