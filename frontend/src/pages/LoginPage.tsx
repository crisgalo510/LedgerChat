import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { setAccessToken } from "../auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const tokens = await login(username, password);
      setAccessToken(tokens.access);
      navigate("/transactions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "48px auto", padding: 16 }}>
      <h1>LedgerChat</h1>
      <p>Log in to view your transactions.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        {error && <div style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</div>}

        <button type="submit" disabled={isSubmitting} style={{ padding: 10 }}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}