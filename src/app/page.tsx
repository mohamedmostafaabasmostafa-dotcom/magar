'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => Array.isArray(d) ? setProducts(d) : setError('API error'))
      .catch(() => setError('Network error'));
  }, []);

  if (error) return <div style={{padding:20}}>Error: {error}</div>;

  return (
    <div style={{padding:20}}>
      {products.map(p => (
        <div key={p.id} style={{marginBottom:10}}>
          <b>{p.name}</b> - {p.price}
        </div>
      ))}
    </div>
  );
}
