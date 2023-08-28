'use client';

import { Word } from '@customTypes/interfaces';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Modal } from '@components/words/dialogs/Modal';

interface Props {
  word: Word;
}

const WordCard = ({ word }: Props) => {
  const [showTooltipTag, setShowTooltipTag] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-row p-4 items-center justify-between w-full rounded-lg border-2 border-solid border-[rgba(0,0,0,0.70)]">
      <Image
        src={
          word.isLearned
            ? '/assets/icons/done_tick-green.png'
            : '/assets/icons/question-mark.png'
        }
        alt={word.isLearned ? 'Word Learned' : 'Word To Learn'}
        width={word.isLearned ? 20 : 24}
        height={word.isLearned ? 20 : 24}
      />

      <p className="text-medium">{word.word}</p>

      <div className="flex flex-row gap-2 items-center">
        <Tooltip
          title={word.tag}
          open={showTooltipTag}
          onClose={() => setShowTooltipTag(false)}
        >
          <Image
            onClick={() => setShowTooltipTag(!showTooltipTag)}
            src={`/assets/icons/tags/tag-${word.color}.png`}
            alt={`Tag ${word.color}`}
            width={22}
            height={22}
          />
        </Tooltip>
        <Image
          onClick={openModal}
          src="/assets/icons/info.png"
          alt="Info"
          width={20}
          height={20}
          className="cursor-pointer"
        />

        <Modal word={word} isOpen={modalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default WordCard;
