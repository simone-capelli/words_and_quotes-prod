'use client';

import { Word } from '@customTypes/interfaces';
import { suggestedMeaningByAI } from '@utils/functions';
import { PuffLoader } from 'react-spinners';
import Image from 'next/image';
import { useState } from 'react';
import { ActionModal } from './ActionModal';

export const Modal = ({
  word,
  isOpen,
  onClose,
}: {
  word: Word;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // DELETE MODAL
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  // EDIT/UPDATE MODAL
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const openUpdateModal = () => {
    setShowUpdateModal(true);

    updateWord();
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [updatedWord, setUpdatedWord] = useState(word);

  const updateWord = () => {
    const updatedWord: Word = {
      _id: word._id,
      userId: word.userId,
      word: word.word,
      color: tagColor,
      tag: tagInput,
      meaning: meaningInput,
      isLearned: isLearned,
      createdTime: word.createdTime,
    };

    setUpdatedWord(updatedWord);
  };

  const [isLearned, setIsLearned] = useState(word.isLearned);

  const [meaningSubmitting, setMeaningSubmitting] = useState(false);
  const [meaningInput, setMeaningInput] = useState(word.meaning);

  const handleMeaningInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setMeaningInput(value);
  };

  const suggestMeaning = async (e: React.MouseEvent<HTMLImageElement>) => {
    const maxWords = 50; // TODO: fare in modo che maxWords sia inserito dall'utente nelle impostazioni

    setMeaningSubmitting(true);
    setMeaningInput(await suggestedMeaningByAI(word.word, maxWords));
    setMeaningSubmitting(false);

    setIsEditing(true); // When you generate a Word with AI you enter EDIT MODE
  };

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
  const [tagColor, setTagColor] = useState(word.color);

  const handleChangeTagColor = (e: React.MouseEvent<HTMLImageElement>) => {
    let index = tagColorArray.indexOf(tagColor);
    if (index === tagColorArray.length - 1) {
      setTagColor(tagColorArray[0]);
    } else {
      setTagColor(tagColorArray[++index]);
    }
  };

  const [tagInput, setTagInput] = useState(word.tag);
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
  };

  return (
    <div className={`sm:pt-8 modal ${isOpen ? 'open' : ''}`}>
      <div className="p-4 flex flex-col justify-between w-[300px] h-[450px] shrink-0 rounded-[5px] border-[2px] border-solid border-black bg-white">
        <div>
          <div className="w-full flex flex-row justify-between items-center">
            <Image
              onClick={isEditing ? () => setIsLearned(!isLearned) : () => {}}
              src={
                isLearned
                  ? '/assets/icons/done_tick-green.png'
                  : '/assets/icons/question-mark.png'
              }
              alt={word.isLearned ? 'Word Learned' : 'Word To Learn'}
              width={word.isLearned ? 24 : 28}
              height={word.isLearned ? 24 : 28}
              className={isEditing ? 'cursor-pointer' : ''}
            />
            <p className="flex flex-row header-title capitalize">{word.word}</p>

            <Image
              onClick={isEditing ? handleChangeTagColor : () => {}}
              src={`/assets/icons/tags/tag-${tagColor}.png`}
              alt={`Tag ${tagColor}`}
              width={28}
              height={28}
              className={isEditing ? 'cursor-pointer' : ''}
            />
          </div>

          {isEditing ? (
            <div className="pt-2 flex-center items-center">
              <input
                className="px-2 py-1 rounded-lg border-2 border-solid border-[#D9D9D9] w-1/2"
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
          ) : (
            <p className="tag-text flex-center items-center">{`#${tagInput}`}</p>
          )}

          <p className="w-full mt-4 h-[1px] bg-black"></p>
        </div>

        <div className="h-[250px]">
          {isEditing || meaningInput ? (
            <textarea
              onChange={handleMeaningInputChange}
              className="px-2 pt-1 rounded-lg border-2 border-solid border-[#D9D9D9]
            w-full h-[250px] resize-none"
              maxLength={500}
              value={meaningInput}
              placeholder="Meaning"
              disabled={!isEditing}
            />
          ) : (
            <>
              <p className="pb-3" style={{ fontFamily: 'Outfit' }}>
                Add meaning or generate it with AI!
              </p>

              {meaningSubmitting ? (
                <PuffLoader
                  className="mx-auto mt-8"
                  color="#1d9ff3"
                  loading
                  size={100}
                  speedMultiplier={1}
                />
              ) : (
                <Image
                  onClick={suggestMeaning}
                  className="mx-auto mt-8 cursor-pointer"
                  src="/assets/icons/meaningInput.png"
                  alt="Light Bulb"
                  width={100}
                  height={100}
                />
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-row justify-between items-center px-2">
          <Image
            onClick={isEditing ? () => {} : openDeleteModal}
            src={'/assets/icons/trash.png'}
            alt="Delete button"
            width={28}
            height={28}
            className={isEditing ? 'opacity-50' : 'cursor-pointer'}
          />
          <button
            onClick={() => {
              onClose();
              setIsEditing(false);
            }} //TODO: here I can show a modal that say: "If you close this your updatings will be lost, do you want to exit? Yes (red) / No (opacity 50)"
            className="bg-white opacity-50 px-3 rounded-lg border-2 border-solid border-[#D9D9D9]"
          >
            Close
          </button>

          <Image
            onClick={
              isEditing ? openUpdateModal : () => setIsEditing(!isEditing)
            } // TODO: create a function that awaits the patch and display a loading
            src={
              isEditing ? '/assets/icons/update.png' : '/assets/icons/edit.png'
            }
            alt={`Tag ${word.color}`}
            width={28}
            height={28}
            className="cursor-pointer"
          />
        </div>
      </div>

      <ActionModal
        word={word}
        action="Delete"
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        closeParentModal={onClose}
      />

      <ActionModal
        word={updatedWord}
        action="Update"
        isOpen={showUpdateModal}
        onClose={closeUpdateModal}
        closeParentModal={onClose}
      />
    </div>
  );
};
