import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('products').select('*');

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const body = await req.json();

    const { error } = await supabase.from('products').insert([
      { name: body.name, description: body.description, price: body.price },
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
