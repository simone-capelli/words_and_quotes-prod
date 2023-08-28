import { connectToDB } from '@utils/database';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectToDB();

    const apiKey = process.env.CLERK_SECRET_KEY; // Sostituisci con la tua chiave API di Clerk
    const url = 'https://api.clerk.dev/v1/users';

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();

    return new Response(JSON.stringify(data.length), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
