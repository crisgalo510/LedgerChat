import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTransactions } from "../api";
import type { Transaction } from "../api";
import { clearAccessToken, getAccessToken } from "../auth";

export function TransactionsPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function run() {
      setIsLoading(true);
      setError(null);

      const token = getAccessToken();
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const data = await listTransactions(token);
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load transactions");
      } finally {
        setIsLoading(false);
      }
    }

    void run();
  }, [navigate]);

  function logout() {
    clearAccessToken();
    navigate("/");
  }

  return (
    <div style={{ maxWidth: 900, margin: "48px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h1>Transactions</h1>
        <button onClick={logout} style={{ padding: 10, height: 40 }}>
          Log out
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <div style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</div>}

      {!isLoading && !error && (
        <table width="100%" cellPadding={10} style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                <td>{t.date}</td>
                <td>{t.transaction_type}</td>
                <td>{t.category}</td>
                <td>{t.description}</td>
                <td>{t.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}