// import { cookies } from 'next/headers';
// import { revalidatePath } from 'next/cache';

// export const dynamic = 'force-dynamic';
// export const revalidate = 1;
// export async function POST() {
//   cookies().delete('accountKey');

//   revalidatePath('/');

//   return Response.json({ signOut: true });
// }

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 1;
export async function POST(req: Request) {
  cookies().delete('accountKey');

  revalidatePath('/');

  return new Response(JSON.stringify({ signOut: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
