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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className='min-h-screen bg-gray-100 p-6 flex justify-center'>
      <div className='w-full max-w-xl space-y-4'>
        <h1 className='text-2xl font-bold'>المنتجات</h1>

        {loading ? (
          <div className='bg-white p-6 rounded shadow'>جاري التحميل...</div>
        ) : products.length === 0 ? (
          <div className='bg-white p-6 rounded shadow'>لا يوجد منتجات</div>
        ) : (
          products.map(p => (
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
