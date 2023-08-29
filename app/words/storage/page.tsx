'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import WordCard from '@components/words/WordCard';
import { Word } from '@customTypes/interfaces';
import { useUser } from '@clerk/nextjs';
import { findMostMatchedString } from '@utils/functions';

const WordsList = ({ words }: { words: Word[] }) => {
  if (!useUser().user) return (window.location.href = '/');

  return (
    <div className="pt-4 w-full flex flex-col gap-2">
      {words.map((word: Word) => (
        <WordCard word={word} key={word._id} />
      ))}
    </div>
  );
};

const Page = () => {
  const { user } = useUser();
  const userId = String(user?.id);

  const [words, setWords] = useState<Word[]>([]);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      const response = await fetch(`/api/words/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ userId }),
        cache: 'no-store',
      });

      const data = await response.json();
      setWords(data);
      setFilteredWords(data);

      setLoading(false);
    };

    fetchWords();
  }, [userId]);

  const [filterByLearned, setFilterByLearned] = useState(0);

  const [tagInput, setTagInput] = useState('');
  const [matchedTag, setMatchedTag] = useState('');

  const [tagColor, setTagColor] = useState('unselect');

  const handleFilterByLearned = () => {
    setTagColor('unselect');
    setMatchedTag('');
    setTagInput('');

    if (filterByLearned === 0) {
      setFilteredWords(words.filter((word) => word.isLearned === false));
      setFilterByLearned(1);
    } else if (filterByLearned === 1) {
      setFilteredWords(words.filter((word) => word.isLearned === true));
      setFilterByLearned(2);
    } else {
      setFilteredWords(words);
      setFilterByLearned(0);
    }
  };

  const handleFilterByTagName = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTagColor('unselect');
    setFilterByLearned(0);
    setTagInput(e.target.value);

    const tag = await findMostMatchedString(e.target.value, userId);
    console.log(tag);
    setMatchedTag(tag);

    if (tag) {
      setFilteredWords(words.filter((word) => word.tag === tag));
    } else {
      setFilteredWords(words);
      setMatchedTag('');
    }
  };

  const handleSelectedTag = (e: React.MouseEvent<HTMLImageElement>) => {
    setFilterByLearned(0);
    setMatchedTag('');
    setTagInput('');

    const color = e.currentTarget.id;
    console.log(color);
    setTagColor(color);

    setFilteredWords(words.filter((word) => word.color === color));

    const element = document.getElementById('tagSection');
    if (element) element.style.visibility = 'hidden';
  };

  return (
    <section className="w-full pt-12 text-[#000000]">
      {loading && (
        <span className="loader ml-[19%] md:ml-[40%] sm:ml-[35%] md:mt-[15%] mt-[20%]">
          L &nbsp; ading
        </span>
      )}
      {!loading && (
        <>
          <div className="fixed w-full flex items-center justify-between z-10 px-10 bg-slate-50 right-1">
            <div className="pt-10 p-2 w-full flex flex-row justify-between items-center">
              {filterByLearned === 0 ? (
                <Image
                  onClick={handleFilterByLearned}
                  src={'/assets/icons/filterIsLearned.png'}
                  alt="Filter Not selected"
                  width={32}
                  height={32}
                  className="opacity-50 cursor-pointer"
                />
              ) : filterByLearned === 1 ? (
                <Image
                  onClick={handleFilterByLearned}
                  src={'/assets/icons/question-mark.png'}
                  alt="Learned"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              ) : (
                <Image
                  onClick={handleFilterByLearned}
                  src={'/assets/icons/done_tick-green.png'}
                  alt="To Learn"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              )}

              {/* tag search */}
              <div className="w-full flex flex-col justify-center items-center">
                <input
                  onChange={handleFilterByTagName}
                  value={tagInput}
                  placeholder="Filtra per tag"
                  type="text"
                  maxLength={33}
                  className="p-2 text-center w-[150px] rounded-[15px] border-2 border-solid border-[#D9D9D9]"
                />
              </div>

              <Image
                onClick={() => {
                  if (tagColor !== 'unselect') {
                    setTagColor('unselect');
                    setFilteredWords(words);
                  }

                  const element = document.getElementById('tagSection');
                  if (element) {
                    if (
                      element.style.visibility === 'hidden' &&
                      tagColor === 'unselect'
                    )
                      element.style.visibility = 'visible';
                    else element.style.visibility = 'hidden';
                  }
                }}
                src={`/assets/icons/tags/tag-${tagColor}.png`}
                alt="Tag Selection"
                width={32}
                height={32}
              />
            </div>
          </div>

          <div
            style={{ visibility: 'hidden' }}
            id="tagSection"
            className="fixed w-full flex justify-end items-center z-10 mt-20 right-1"
          >
            <div className="p-2 gap-4 w-[150px] flex flex-col border rounded-[5px] border-solid border-black bg-white">
              <div className="flex flex-row justify-between">
                <Image
                  onClick={handleSelectedTag}
                  id="blue"
                  src={'/assets/icons/tags/tag-blue.png'}
                  alt="blue"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="purple"
                  src={'/assets/icons/tags/tag-purple.png'}
                  alt="purple"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="green"
                  src={'/assets/icons/tags/tag-green.png'}
                  alt="green"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="red"
                  src={'/assets/icons/tags/tag-red.png'}
                  alt="red"
                  width={32}
                  height={32}
                />
              </div>

              <div className="flex flex-row justify-between">
                <Image
                  onClick={handleSelectedTag}
                  id="lightBlue"
                  src={'/assets/icons/tags/tag-lightBlue.png'}
                  alt="lightBlue"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="magenta"
                  src={'/assets/icons/tags/tag-magenta.png'}
                  alt="magenta"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="orange"
                  src={'/assets/icons/tags/tag-orange.png'}
                  alt="orange"
                  width={32}
                  height={32}
                />
                <Image
                  onClick={handleSelectedTag}
                  id="yellow"
                  src={'/assets/icons/tags/tag-yellow.png'}
                  alt="yellow"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>

          <br />
          {matchedTag && tagInput ? (
            <div className="pt-20 text-[#000] flex flex-center">
              <br />
              <p>#{matchedTag}</p>
              <Image
                onClick={() => {
                  setMatchedTag('');
                  setTagInput('');
                  setFilteredWords(words);
                }}
                src="/assets/icons/remove.png"
                alt="remove_tag"
                width={15}
                height={15}
                className="ml-2"
              />
            </div>
          ) : (
            <div className="pt-16" />
          )}
          <WordsList words={filteredWords} />
        </>
      )}
      <br />
      <br />
      <br />
    </section>
  );
};

export default Page;

// const [alphabetFilter, setAlphabetFilter] = useState(0);

/* const handleAlphabeticOrder = () => {
    if (alphabetFilter === 0 || alphabetFilter === 2) {
      setFilteredWords(
        filteredWords.sort((a, b) => a.word.localeCompare(b.word))
      );
      setAlphabetFilter(1);
    } else if (alphabetFilter === 1) {
      setFilteredWords(
        filteredWords.sort((a, b) => b.word.localeCompare(a.word))
      );
      setAlphabetFilter(2);
    }
  }; */

/* {alphabetFilter === 0 ? (
  <Image
    onClick={handleAlphabeticOrder}
    src={'/assets/icons/line.png'}
    alt="Down Arrow"
    width={32}
    height={32}
  />
) : alphabetFilter === 1 ? (
  <Image
    onClick={handleAlphabeticOrder}
    src={'/assets/icons/down-arrow.png'}
    alt="Down Arrow"
    width={32}
    height={32}
  />
) : (
  <Image
    onClick={handleAlphabeticOrder}
    src={'/assets/icons/down-arrow.png'}
    alt="Down Arrow"
    width={32}
    height={32}
    className="rotate-180"
  />
)} */
