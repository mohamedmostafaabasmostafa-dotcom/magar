'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  async function loadProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  }

  async function addProduct() {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: Number(price),
      }),
    });

    setName('');
    setDescription('');
    setPrice('');
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <main className='p-6 max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>لوحة التحكم</h1>

      <div className='mb-6 space-y-2'>
        <input className='w-full border p-2' placeholder='اسم المنتج' value={name} onChange={e => setName(e.target.value)} />
        <input className='w-full border p-2' placeholder='وصف المنتج' value={description} onChange={e => setDescription(e.target.value)} />
        <input className='w-full border p-2' type='number' placeholder='السعر' value={price} onChange={e => setPrice(e.target.value)} />
        <button className='bg-black text-white px-4 py-2' onClick={addProduct}>
          إضافة المنتج
        </button>
      </div>

      <h2 className='text-xl font-semibold mb-2'>المنتجات</h2>
      <ul className='space-y-2'>
        {products.map(p => (
          <li key={p.id} className='border p-2'>
            <strong>{p.name}</strong> – {p.price} جنيه
            <div className='text-sm text-gray-600'>{p.description}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
