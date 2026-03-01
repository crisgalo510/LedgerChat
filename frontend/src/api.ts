export type TokenPair = {
  access: string;
  refresh: string;
};

export type Transaction = {
  id: number;
  amount: string; // DRF decimals come back as strings
  category: string;
  transaction_type: "income" | "expense";
  description: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

async function jsonFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return (await res.json()) as T;
}

export async function login(username: string, password: string): Promise<TokenPair> {
  return jsonFetch<TokenPair>("/api/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function listTransactions(accessToken: string): Promise<Transaction[]> {
  return jsonFetch<Transaction[]>("/api/transactions/", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}