import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { fetchAllProperties } from '@/app/actions';
import { addProperty } from '@/app/cron/actions';
import { getGameProperties } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 1;
export async function GET(req: Request) {
  const property = await fetchAllProperties();
  const chainProperties: any = await getGameProperties();

  if (chainProperties.length <= 0) {
    const upload = await addProperty(property.id, property.encryptedData);
    console.log('Property uploaded to chain:', JSON.stringify(upload, null, 2));
    console.log(chainProperties);
    revalidatePath('/');

    return new Response(
      JSON.stringify({ message: 'Property uploaded to chain:', data: upload }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
