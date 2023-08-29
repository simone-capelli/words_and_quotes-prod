'use client';

import ContactForm from '@components/homepage/Contact';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Home = () => {
  const router = useRouter();

  // const [totalUsers, setTotalUsers] = useState(0);

  /* useEffect(() => {
    const fetchTotalUsers = async () => {
      const response = await fetch('/api/users', {
        method: 'GET',
      });
      const data = await response.json();

      setTotalUsers(data);
    };
    fetchTotalUsers();
  }); */

  return (
    <section id="home" className="w-full flex-col mt-12">
      <br />
      <br />

      <p className="font-inter text-[13px] font-medium">
        Facile. Veloce. Intuitivo.
      </p>
      <p className="mt-2 title text-[26px]">
        Salvare le tue parole non è mai stato così semplice.
      </p>
      <p className="mt-3 description">
        La piattaforma intelligente per salvare le tue parole in un istante, a
        portata di click.
      </p>

      <div className="flex flex-col flex-center text-center">
        {/* CTA */}
        <div
          onClick={() => router.push('/words')}
          className="mt-8 cta-btn bg-[#268C41]"
        >
          <button className="cta-title text-[30px]">Inizia ora</button>
        </div>

        <div
          onClick={() => router.push('/words')}
          className="mt-3 cta-btn bg-[#000]"
        >
          <button className="flex flex-row cta-title text-[30px] gap-3 items-center">
            Accedi
          </button>
        </div>

        <Image
          id="vision"
          className="mt-16 mx-auto"
          src="/assets/images/word_big-letter_colored.png"
          alt="Word Letter"
          width={142}
          height={142}
        />

        <p className="mt-12 green-section">Vision</p>
        <p className="mt-4 title text-[22px]">
          La soluzione per esprimerti al meglio in ogni conversazione.
        </p>
        <p id="features" className="mt-2 description">
          Questo sistema ti offre l’opportunità di arricchire il tuo lessico in
          modo facile e veloce. Con questa app migliorerai la tua capacità di
          esprimerti in modo chiaro e convincente. Non rimarrai mai a corto di
          parole con Words & Quotes!
        </p>

        <p className="mt-8 green-section">Features</p>

        {/* Salvataggio */}
        <div className="mt-6 w-14 h-14 rounded-full bg-[rgba(40,231,91,0.20)] flex justify-center items-center">
          <div className="w-10 h-10 rounded-full bg-[rgba(40,231,91,0.25)] flex justify-center items-center">
            <Image
              className="opacity-90"
              src="/assets/homepage/check-white.png"
              alt="Save"
              width={22}
              height={22}
            />
          </div>
        </div>

        <p className="mt-3 title text-[18px]">Capienza e salvataggio</p>
        <p className="mt-1 description mx-2">
          Salva fino a un massimo di 10 parole. Puoi contrassegnare le parole
          come &quot;imparate&quot; o &quot;non apprese&quot; per tenere traccia
          dei tuoi progressi di apprendimento.
        </p>

        {/* Ricerca */}
        <div className="mt-8 w-14 h-14 rounded-full bg-[rgba(40,231,91,0.20)] flex justify-center items-center">
          <div className="w-10 h-10 rounded-full bg-[rgba(40,231,91,0.25)] flex justify-center items-center">
            <Image
              className="opacity-90"
              src="/assets/homepage/lens-white.png"
              alt="Search"
              width={20}
              height={20}
            />
          </div>
        </div>

        <p className="mt-3 title text-[18px]">Ricerca semplice</p>
        <p className="mt-1 description mx-2">
          Grazie al filtro intuitivo è possibile ricercare le tue parole
          dividendole per parola appresa, categoria (tag) e colore.
        </p>

        {/* AI */}
        <div className="mt-8 w-14 h-14 rounded-full bg-[rgba(40,231,91,0.20)] flex justify-center items-center">
          <div className="w-10 h-10 rounded-full bg-[rgba(40,231,91,0.25)] flex justify-center items-center">
            <Image
              className="opacity-90"
              src="/assets/homepage/bulb-white.png"
              alt="AI"
              width={28}
              height={28}
            />
          </div>
        </div>

        <p className="mt-3 title text-[18px]">Intelligenza Artificiale</p>
        <p id="version" className="mt-1 description mx-2">
          Sfrutta l’innovazione per ottenere un significato in modo veloce e
          preciso, grazie all’intelligenza artificiale.
        </p>

        {/* Beta Testing */}
        <p className="mt-12 green-section">Version</p>
        <p className="mt-4 title text-[22px]">Beta-Testing</p>
        <div className="mt-1 description mx-2">
          La versione Beta offre un&apos;interfaccia semplice e diverse
          funzionalità, immergiti totalmente partecipando al nostro gruppo
          telegram per ottenere una <b>nuova parola ogni giorno</b> e rimanere
          aggiornato sulle prossime versioni!
        </div>
        <a
          href="https://t.me/Words_and_Quotes"
          className="mt-5 cta-btn bg-[#1f2329]"
        >
          <button className="flex flex-row cta-title text-[30px] gap-3 items-center">
            <Image
              src="/assets/homepage/telegram.png"
              alt="Community"
              width={20}
              height={20}
            />{' '}
            Unisciti a noi
          </button>
        </a>

        {/* <p className="mt-6 title text-[22px]">
          Il tuo contributo è importante!
        </p>

        <p id="quotes" className="mt-1 description">
          Lascia un feedback per aiutarci a migliorare questa applicazion web.
        </p> */}

        <p className="mt-10 title text-[22px]">E le Quotes?</p>
        <p className="bg-gray-100 border-l-4 border-gray-500 italic my-4 pl-4 py-2">
          &quot;La qualità è come la luce del sole: non è la quantità che conta,
          ma la sua intensità.&quot;
        </p>
        <p id="whoAmI" className="mt-2 description">
          Qualità = Priorità.
          <br /> Fornire un&apos;esperienza di valore e di apprendimento che
          soddisfi le esigenze degli utenti in modo completo e soddisfacente è
          la cosa più importante. Per questo motivo ho deciso di dedicarmi
          totalmente a questa versione, per poi passare alla prossima
          implementando le citazioni (quotes).
        </p>

        <p className="mt-12 green-section">Who am I</p>
        <p className="mt-4 title text-[22px]">
          La conoscenza è come una chiave che apre le porte
          dell&apos;opportunità.
        </p>

        <p className="mt-4 description">
          Ciao! Sono uno sviluppatore web <b>freelance</b> specializzato in
          React e Next.js.
        </p>

        <div className="flex_row mt-6 gap-10">
          <a href="https://www.linkedin.com/in/simone-capelli-373a49278/">
            <Image
              src="/assets/homepage/linkedin.png"
              alt="Linkedin"
              width={30}
              height={30}
            />
          </a>
          <a href="https://github.com/simone-capelli">
            <Image
              src="/assets/homepage/github.png"
              alt="Github"
              width={30}
              height={30}
            />
          </a>
        </div>

        <p className="mt-6 description">
          Sono appassionato di psicologia e crescita personale, e ho deciso di
          combinare queste due passioni con la mia esperienza nello sviluppo di
          app.
        </p>

        {/* <p className="title text-[22px]">Contattami qui sotto</p> */}
        <p id="contactMe" className="mt-12 green-section">
          Contact Me
        </p>
        <p className="my-3 title text-[22px]">
          Non esitare a contattarmi, una conversazione può aprire porte
          inaspettate!
        </p>

        <p className="mb-2 description">
          Sarebbe un piacere conoscere la tua storia e esplorare nuove
          possibilità insieme.
        </p>

        <ContactForm />
      </div>

      <br />
      <br />
      <br />
      <br />
    </section>
  );
};

export default Home;
