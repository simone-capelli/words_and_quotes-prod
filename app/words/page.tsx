import React from 'react';
import Image from 'next/image';
import BookMeaningSection from '@/components/words/BookMeaningSection';
import InputWordSection from '@/components/words/InputWordSection';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col mt-16">
      <a
        href="https://t.me/Words_and_Quotes"
        className="cta-btn bg-[#268C41]  text-center"
      >
        <button className="flex flex-row cta-title gap-3 items-center mx-4">
          <Image
            src="/assets/homepage/telegram.png"
            alt="Community"
            width={20}
            height={20}
          />{' '}
          <p className="text-[14px] text-[#fffffff2]">
            Unisciti e scopri la parola del giorno!
          </p>
        </button>
      </a>
      <Image
        className="mt-12"
        src="/assets/images/word_big-letter_colored.png"
        alt="Word Letter"
        width={117}
        height={117}
      />

      <div className="text-medium flex flex-row gap-1 pt-10">
        <p>Hai</p>
        <p className="text-[#268C41]">trovato</p>
        <p>delle</p>
        <p className="text-[#268C41]">nuove</p>
        <p>parole</p>
        <div className="text-[#268C41] flex flex-row">
          oggi
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
