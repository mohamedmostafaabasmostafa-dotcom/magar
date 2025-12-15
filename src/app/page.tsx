'use client';
import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(async (r) => {
        const data = await r.json().catch(() => null);

        if (!r.ok) {
          const msg =
            data && typeof data === 'object' && 'error' in data
              ? String((data as any).error)
              : 'API error';
          throw new Error(msg);
        }

        setProducts(Array.isArray(data) ? (data as Product[]) : []);
      })
      .catch((e) => setError(e?.message || 'Network error'));
  }, []);

  if (error) return <div style={{ padding: 20 }}>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <b>{p.name}</b> - {p.price}
        </div>
      ))}
    </div>
  );
}
