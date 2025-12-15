'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [err, setErr] = useState<string | null>(null);

  async function loadProducts() {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        data && typeof data === 'object' && 'error' in data
          ? String((data as any).error)
          : 'API error';
      setErr(msg);
      setProducts([]);
      return;
    }

    setErr(null);
    setProducts(Array.isArray(data) ? (data as Product[]) : []);
  }

  async function addProduct() {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price: Number(price) }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const msg =
        data && typeof data === 'object' && 'error' in data
          ? String((data as any).error)
          : 'API error';
      setErr(msg);
      return;
    }

    setName('');
    setDescription('');
    setPrice('');
    setErr(null);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className='p-6 max-w-xl mx-auto space-y-4'>
      <h1 className='text-2xl font-bold'>لوحة التحكم</h1>

      {err ? (
        <div className='bg-white p-4 rounded shadow'>
          حصل خطأ: <span className='font-mono'>{err}</span>
        </div>
      ) : null}

      <div className='bg-white p-4 rounded shadow space-y-2'>
        <input className='w-full border p-2' placeholder='اسم المنتج' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='w-full border p-2' placeholder='وصف المنتج' value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className='w-full border p-2' type='number' placeholder='السعر' value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className='bg-black text-white px-4 py-2 rounded' onClick={addProduct}>إضافة المنتج</button>
      </div>

      <div className='space-y-2'>
        {products.map((p) => (
          <div key={p.id} className='bg-white p-4 rounded shadow'>
            <b>{p.name}</b> - {p.price}
            {p.description ? <div className='text-sm text-gray-600'>{p.description}</div> : null}
          </div>
        ))}
      </div>
    </main>
  );
}
