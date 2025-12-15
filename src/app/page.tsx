export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100 p-6'>
      <div className='w-full max-w-xl space-y-4'>
        <h1 className='text-2xl font-bold'>المنتجات</h1>

        {products.length === 0 ? (
          <div className='bg-white p-6 rounded-xl shadow'>لا يوجد منتجات بعد</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className='bg-white p-6 rounded-xl shadow'>
              <h2 className='text-xl font-bold mb-1'>{p.name}</h2>
              {p.description ? (
                <p className='text-gray-600 mb-3'>{p.description}</p>
              ) : null}
              <p className='font-bold mb-4'>السعر: {p.price} جنيه</p>
              <button className='bg-black text-white px-4 py-2 rounded'>
                أضف للسلة
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
