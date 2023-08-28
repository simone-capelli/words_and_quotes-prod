import Word from '@models/word';
import { connectToDB } from '@utils/database';

export const POST = async (request: Request) => {
  const { userId } = await request.json();

  try {
    await connectToDB();
    const word = await Word.find({ userId: userId });

    return new Response(JSON.stringify(word), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
export const DELETE = async (request: Request) => {
  const { id } = await request.json();
  try {
    await connectToDB();
    const word = await Word.findByIdAndDelete(id);
    return new Response(JSON.stringify(word), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  const { word } = await request.json();
  try {
    await connectToDB();
    const updatedWord = await Word.findByIdAndUpdate(word._id, word, {
      new: true,
    });
    return new Response(JSON.stringify(updatedWord), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};
