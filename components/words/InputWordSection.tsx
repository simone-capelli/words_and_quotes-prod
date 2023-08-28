'use client';

import { useState } from 'react';
import Image from 'next/image';
import { findMostMatchedString, suggestedMeaningByAI } from '@utils/functions';
import { PuffLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { wordsLimit } from '@constants';

const InputWordSection = () => {
  const router = useRouter();
  let { user } = useUser();
  const userId = String(user?.id);

  const tagColorArray = [
    'blue',
    'green',
    'red',
    'lightBlue',
    'yellow',
    'orange',
    'purple',
    'magenta',
  ];
  const [tagColor, setTagColor] = useState('blue');
  const [isLearned, setIsLearned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [meaningSubmitting, setMeaningSubmitting] = useState(false);

  const [wordInput, setWordInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [matchedTag, setMatchedTag] = useState('');
  const [meaningInput, setMeaningInput] = useState('');

  const saveWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMatchedTag('');

    const res = await fetch('/api/words', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
      }),
    });
    const count = await res.json();

    if (count > wordsLimit) return;

    if (!wordInput || !tagInput || meaningSubmitting) {
      return;
    }
    setSubmitting(true);

    try {
      //console.log(wordInput, tagInput, isLearned);

      const response = fetch('/api/words/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: userId,
          word: wordInput.toLowerCase(),
          tag: tagInput,
          isLearned: isLearned,
          meaning: meaningInput.trim(),
          color: tagColor,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSubmitting(false);
        // reset everything
        setIsLearned(false);
        setWordInput('');
        setTagInput('');
        setMatchedTag('');
        setMeaningInput('');
      }, 1500);
    }
  };

  const handleWordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWordInput(value.trim());
  };

  const handleTagInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTagInput(value);

    setMatchedTag(await findMostMatchedString(value, userId));
  };

  const handleChangeTagColor = (e: React.MouseEvent<HTMLImageElement>) => {
    let index = tagColorArray.indexOf(tagColor);
    if (index === tagColorArray.length - 1) {
      setTagColor(tagColorArray[0]);
    } else {
      setTagColor(tagColorArray[++index]);
    }
  };

  const handleMeaningInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setMeaningInput(value);
  };

  const suggestMeaning = async (e: React.MouseEvent<HTMLImageElement>) => {
    const word = wordInput;
    const maxWords = 50; // TODO: fare in modo che maxWords sia inserito dall'utente nelle impostazioni

    if (!word) {
      return;
    }

    setMeaningSubmitting(true);
    setMeaningInput(await suggestedMeaningByAI(word, maxWords));
    setMeaningSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4 pt-6">
      {/* Word Section */}
      <div className="inline-flex justify-center items-center gap-2 pl-[9px] pr-[11.12px] pt-[7px] pb-2">
        <Image
          onClick={
            isLearned ? () => setIsLearned(false) : () => setIsLearned(true)
          }
          src={
            isLearned
              ? '/assets/icons/done_tick-green.png'
              : '/assets/icons/question-mark.png'
          }
          alt={isLearned ? 'Word Learned' : 'Word To Learn'}
          width={isLearned ? 28 : 36}
          height={isLearned ? 28 : 36}
          className={isLearned ? ' ml-2' : ''}
        />

        <input
          className="p-2 rounded-lg border-2 border-solid border-[#D9D9D9]"
          type="text"
          maxLength={33}
          value={wordInput}
          placeholder="Word"
          onChange={handleWordInputChange}
        />
      </div>

      {/* Meaning Section */}
      {isLearned && (
        <div className="inline-flex justify-center items-center gap-2 pl-[9px] pr-[11.12px] pt-[7px] pb-2">
          {meaningSubmitting ? (
            <PuffLoader
              color="#1d9ff3"
              loading
              size={34}
              speedMultiplier={1}
              className="mr-2"
            />
          ) : (
            <Image
              onClick={suggestMeaning}
              className="mx-1"
              src="/assets/icons/meaningInput.png"
              alt="Light Bulb"
              width={28}
              height={28}
            />
          )}

          <textarea
            className="px-2 pt-1 rounded-lg border-2 border-solid border-[#D9D9D9]
            w-full min-h-[100px] max-h-64"
            maxLength={500}
            value={meaningInput}
            placeholder="Meaning"
            onChange={handleMeaningInputChange}
          />
        </div>
      )}

      {/* Tag Section */}
      <div className="flex flex-col">
        <div className="inline-flex justify-center items-center gap-2 pl-[9px] pr-[11.12px] pt-[7px] pb-2">
          <Image
            onClick={handleChangeTagColor}
            src={`/assets/icons/tags/tag-${tagColor}.png`}
            alt="Tag blue"
            width={36}
            height={36}
          />
          <input
            className="p-2 rounded-lg border-2 border-solid border-[#D9D9D9]"
            type="text"
            maxLength={50}
            value={tagInput}
            placeholder="Tag"
            onChange={handleTagInputChange}
            onBlur={() => {
              setTagInput(tagInput.trim());
            }}
          />
        </div>
        {matchedTag && (
          <div className="inline-flex justify-center items-center gap-2 pl-[9px] pr-[11.12px] pt-[7px] pb-2">
            <Image
              src="/assets/icons/right-arrow_blue.png"
              alt="Learn"
              width={30}
              height={30}
            />

            <div
              onClick={() => {
                setTagInput(matchedTag);
                setMatchedTag('');
              }}
              className="cursor-pointer max-w-[250px] rounded-lg p-2 border-2 border-solid border-[#d9d9d9d1] bg-white"
            >
              {matchedTag}
            </div>
          </div>
        )}
      </div>

      {/* Save and Change Section */}
      <div className="flex flex-row gap-2 mx-auto pt-3">
        <button className="btn" onClick={() => router.push('/words/storage')}>
          Words
          <Image
            src="/assets/icons/right-arrow.png"
            alt="Right Arrow"
            width={16}
            height={16}
          />
        </button>
        <button
          className="btn btn-save text-white font-medium"
          type="submit"
          onClick={saveWord}
        >
          {submitting ? (
            <Image
              src="/assets/icons/save_tick-white.png"
              alt="Saved"
              width={16}
              height={16}
            />
          ) : (
            'Save'
          )}
        </button>
      </div>
    </div>
  );
};

export default InputWordSection;
