// import { submitGameAnswer } from '@/lib/extrinsic';
// import { NextRequest, NextResponse } from 'next/server';
// // import { submitGameAnswer } from '../../../path/to/your/functions';

// export async function POST(req: NextRequest) {
//   const { address, guess, gameId } = await req.json();

//   try {
//     const result = await submitGameAnswer(address, guess, gameId);
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     console.error('Failed to submit guess:', error);
//     return NextResponse.json({ error: 'Failed to submit guess' }, { status: 500 });
//   }
// }
