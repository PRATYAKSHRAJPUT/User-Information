"use client";

import { useState } from "react";
import styles from "@/css/login.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Login</h1>
          <input
            className={styles.input}
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Login</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
