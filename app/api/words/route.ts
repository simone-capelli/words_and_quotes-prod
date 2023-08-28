import { connectToDB } from '@utils/database';
import Word from '@models/word';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectToDB();

    const words = await Word.find({}); // returns all words

    return new Response(JSON.stringify(words), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all words', { status: 500 });
  }
};

export const POST = async (request: Request) => {
  const { userId } = await request.json();

  try {
    await connectToDB();
    const count = await Word.countDocuments({ userId: userId });

    return new Response(JSON.stringify(count.toString()), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
