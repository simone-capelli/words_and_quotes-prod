import React from 'react';
import Image from 'next/image';

const BookMeaningSection = () => {
  return (
    <section className="pt-20 flex flex-row gap-6 items-center">
      <div className="text-medium flex flex-col gap-1 items-start">
        <p>Inside this book,</p>
        <div className="flex flex-row gap-1">
          <p className="text-[#5B0CED]">meaning</p>
          <p>you will find.</p>
        </div>
        <p>Time has come,</p>
        <div className="flex flex-row gap-1">
          <p>now change your</p>
          <p className="text-[#0085FF]">mind</p>
        </div>
      </div>

      <Image
        src="/assets/images/meaning_book.png"
        alt="Meaning Book"
        width={79}
        height={82}
      />
    </section>
  );
};

export default BookMeaningSection;
