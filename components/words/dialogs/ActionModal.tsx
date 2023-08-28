'use client';

import { Word } from '@customTypes/interfaces';
import { useState } from 'react';

export const ActionModal = ({
  word,
  action,
  isOpen,
  onClose,
  closeParentModal,
}: {
  word: Word;
  action: string;
  isOpen: boolean;
  onClose: () => void;
  closeParentModal: () => void;
}) => {
  const [updating, setUpdating] = useState(false);

  const deleteWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpdating(true);
    await fetch(`/api/words/${word._id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: word._id }),
    });
    setUpdating(false);

    closeAllModals();
    window.location.reload();
  };

  const updateWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpdating(true);
    await fetch(`/api/words/${word._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ word }),
    });
    setUpdating(false);

    closeAllModals();
    window.location.reload();
  };

  const closeAllModals = () => {
    closeParentModal();
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="p-4 flex flex-col gap-2 justify-between rounded-[5px] border-[1px] border-solid border-black bg-white">
        <p className="outfit">
          Do you want to {action.toLowerCase()} this word?
        </p>
        <div className="flex flex-row justify-between mx-5 outfit">
          <button
            onClick={() => onClose()}
            className="opacity-50 px-3 rounded-lg border-2 border-solid border-[#D9D9D9]"
          >
            Close
          </button>
          {updating ? (
            <span className="loader_green-blue"></span>
          ) : (
            <button
              onClick={action === 'Update' ? updateWord : deleteWord}
              className={`${
                action === 'Update'
                  ? 'border-[#44A4F2] text-[#44A4F2]'
                  : 'border-[#FF0D0D] text-[#FF0D0D]'
              } border-[1px] rounded-[5px] px-2 py-1`}
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
