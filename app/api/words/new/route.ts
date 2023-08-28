import { connectToDB } from '@utils/database';
import Word from '@models/word';

export const POST = async (request: Request) => {
  const { userId, word, tag, isLearned, meaning, color } = await request.json();
  console.log(userId);

  try {
    await connectToDB();

    const newWord = new Word({
      userId,
      word,
      tag,
      isLearned,
      meaning,
      color,
    });

    await newWord.save();

    return new Response(JSON.stringify(newWord), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
