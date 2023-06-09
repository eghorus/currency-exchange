import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/home.module.css";
import ExchangeCalculator from "@/components/exchange-calculator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Money Exchange</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={[styles.main, inter.className].join(" ")}>
        <h1 className={styles.mainHeading}>Money Exchange</h1>
        <ExchangeCalculator />
      </main>
    </>
  );
}
