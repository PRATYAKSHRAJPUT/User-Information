 "use client";

import Link from "next/link";
import styles from "@/css/taskhome.module.css";

export default function Home(){
  return(
    <>
  <div className={styles.main}>
    <main className={styles.master}>
      <h1 className={styles.heading}>
        TaskMaster - Task Management App
      </h1>
      <Link
        href="/tasks"
        className={styles.button}
      >
        Go to Tasks
      </Link>
    </main>
  </div>

    </>
  )
}