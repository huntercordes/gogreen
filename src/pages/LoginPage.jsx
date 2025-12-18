import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/LoginPage.module.css";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | signup
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        navigate("/", { replace: true });
        return;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (loginError) throw loginError;

      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const title = "Green Grocery";
  const subtitle =
    mode === "login"
      ? "Log in to continue"
      : "Create an account to start shopping smarter";

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <header className={styles.header}>
          {/* 
            Decorative logo: the app name is announced via the heading below.
            This avoids duplicate announcements for screen reader users.
          */}
          <div className={styles.brand}>
            <span className={styles.logoWrap} aria-hidden="true">
              <img src={logo} alt="" className={styles.logo} />
            </span>

            <div className={styles.brandText}>
              <h1 id="login-title" className={styles.title}>
                {title}
              </h1>
              <p className={styles.tagline}>{subtitle}</p>
            </div>
          </div>
        </header>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-describedby="login-error">
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              minLength={6}
              required
            />
          </div>

          {error && (
            <p id="login-error" className={styles.alert} role="alert">
              {error}
            </p>
          )}

          <button
            className={styles.buttonPrimary}
            type="submit"
            disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>

          <div className={styles.switchRow}>
            <p className={styles.switchText}>
              {mode === "login" ? "New here?" : "Already have an account?"}
            </p>
            <button
              className={styles.buttonSecondary}
              type="button"
              onClick={() =>
                setMode((m) => (m === "login" ? "signup" : "login"))
              }>
              {mode === "login" ? "Create account" : "Log in instead"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
