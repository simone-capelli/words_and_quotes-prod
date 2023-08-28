import React from 'react';
import Image from 'next/image';
import BookMeaningSection from '@/components/words/BookMeaningSection';
import InputWordSection from '@/components/words/InputWordSection';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col pt-12">
      <Image
        className="pt-16"
        src="/assets/images/word_big-letter_colored.png"
        alt="Word Letter"
        width={117}
        height={117}
      />

      <div className="text-medium flex flex-row gap-1 pt-10">
        <p>Have</p>
        <p className="text-[#268C41]">you</p>
        <p>found</p>
        <p className="text-[#268C41]">new</p>
        <p>words</p>
        <div className="text-[#268C41] flex flex-row">
          today
          <p className="text-black">?</p>
        </div>
      </div>

      <InputWordSection />

      <br />
      <br />
      <br />
      <br />
    </section>
  );
};

export default Home;
