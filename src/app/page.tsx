'use client';

import { useEffect, useState } from 'react';

type Product = { id: string; name: string; description: string | null; price: number };

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          const msg = data && typeof data === 'object' && 'error' in data ? String((data as any).error) : 'Server error';
          throw new Error(msg);
        }

        setProducts(Array.isArray(data) ? data : []);
        setErr(null);
      })
      .catch((e) => {
        setProducts([]);
        setErr(e?.message || 'Failed to load');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className='min-h-screen bg-gray-100 p-6 flex justify-center'>
      <div className='w-full max-w-xl space-y-4'>
        <h1 className='text-2xl font-bold'>المنتجات</h1>

        {loading ? (
          <div className='bg-white p-6 rounded shadow'>جاري التحميل...</div>
        ) : err ? (
          <div className='bg-white p-6 rounded shadow'>
            حصل خطأ: <span className='font-mono'>{err}</span>
          </div>
        ) : products.length === 0 ? (
          <div className='bg-white p-6 rounded shadow'>لا يوجد منتجات</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className='bg-white p-6 rounded shadow'>
              <h2 className='text-xl font-bold'>{p.name}</h2>
              {p.description ? <p className='text-gray-600'>{p.description}</p> : null}
              <p className='font-bold mt-2'>السعر: {p.price} جنيه</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
