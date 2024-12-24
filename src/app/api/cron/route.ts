import { revalidatePath } from 'next/cache';
import { fetchAllProperties } from '@/app/actions';
import { addProperty } from '@/app/cron/actions';
import { getGameProperties } from '@/lib/queries';

// export const dynamic = 'force-dynamic';
// export const revalidate = 1;
// export async function GET(req: Request) {
//   const properties = await fetchAllProperties();
//   const chainProperties: any = await getGameProperties();
//   if (chainProperties.length <= 0) {
//     await Promise.all(
//       properties.map(async (property: any) => {
//         const upload = await addProperty(property.id, property.encryptedData);
//         console.log('Property uploaded to chain:', JSON.stringify(upload, null, 2));
//       })
//     );
//     revalidatePath('/');

//     return new Response(JSON.stringify({ message: 'Properties uploaded to chain.' }), {
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }
// export async function GET(req: Request) {
//   const properties = await fetchAllProperties();
//   const chainProperties: any = await getGameProperties();

//   if (chainProperties.length <= 0) {
//     for (let property of properties) {
//       const timeout = setTimeout(async () => {
//         const upload = await addProperty(property.id, property.encryptedData);
//         console.log('Property uploaded to chain:', JSON.stringify(upload, null, 2));
//       }, 3000);
//       clearTimeout(timeout);
//     }
//     revalidatePath('/');

//     return new Response(JSON.stringify({ message: 'Properties uploaded to chain.' }), {
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }

export async function GET(req: Request) {
  const properties = await fetchAllProperties();
  const chainProperties: any = await getGameProperties();

  const filteredProperties = properties.filter((property: any, index: any) => {
    if (index > 19) {
      return property;
    }
  });

  // if (chainProperties.length <= 0) {
  // Function to delay execution
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Process filtered properties sequentially with delay
  for (const property of filteredProperties) {
    try {
      const upload = await addProperty(property.id, property.encryptedData);
      console.log('Property uploaded to chain:', JSON.stringify(upload, null, 2));
    } catch (error) {
      console.error('Error uploading property:', error);
      // Continue to the next property even if there's an error
    }

    // Add 2-second delay before next upload
    await delay(2000);
  }

  revalidatePath('/');

  //   return new Response(JSON.stringify({ message: 'Properties uploaded to chain.' }), {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }

  // Return a response if chainProperties are not empty
  return new Response(
    JSON.stringify({ message: 'No properties to upload, chain already has properties.' }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
