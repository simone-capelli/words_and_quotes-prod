import axios from 'axios';

export async function findMostMatchedString(
  inputString: string,
  userId: string
) {
  if (inputString === '') return '';

  const response = await fetch('/api/words/tags', {
    method: 'POST',
    body: JSON.stringify({ userId }),
    cache: 'no-store',
  });
  const tags = await response.json();

  // check if response is empty -> when there are no words yet
  if (!tags) return '';

  for (const string of tags) {
    if (string.includes(inputString)) {
      return string;
    }
  }

  return '';
}

export async function suggestedMeaningByAI(word: string, maxWords: number) {
  const prompt = `Fornisci una definizione chiara e completa della parola '${word}' in un massimo di ${maxWords} parole e un minimo di 25, in italiano.`;
  //console.log(prompt);

  try {
    const response = await axios.post(
      'https://chimeragpt.adventblocks.cc/api/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // gpt-4 not responding
        messages: [{ role: 'user', content: prompt }],
      },
      /* 'https://chimeragpt.adventblocks.cc/api/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: prompt,
      }, */
      {
        // prettier-ignore
        headers: {
          'Authorization': `Bearer oZP8mYQ5lAhwcxzIi_ZFMEtfkojvFz6htKVEmtiVMtM`, // Replace this with your API Key you got using the '/key get' Discord command
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    // const reply = response.data.choices[0].text; // davinci model

    return reply;
  } catch (error) {
    console.error(error);
  }
}
