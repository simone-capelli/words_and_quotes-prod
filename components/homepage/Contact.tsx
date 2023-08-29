'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Ring } from '@uiball/loaders';
import {
  ErrorMessage,
  errorMessage,
  initialFormData,
} from '@customTypes/interfaces';

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState(errorMessage);

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // prettier-ignore
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  // prettier-ignore
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  // prettier-ignore
  const msgRegex = /^[\s\S]+$/;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
  ) => {
    setErrorMessages(validation(formData));
  };

  const validation = (formValues: any) => {
    let error: ErrorMessage = {
      name: '',
      surname: '',
      email: '',
      msg: '',
    };

    if (!formData.name) error.name = 'Il nome è richiesto.';
    else if (!nameRegex.test(formData.name)) {
      error.name = 'Il nome può contenere solo lettere e spazi.';
    }

    if (!formData.surname) error.surname = 'Il cognome è richiesto.';
    else if (!nameRegex.test(formData.surname)) {
      error.surname = 'Il cognome può contenere solo lettere e spazi.';
    }

    //prettier-ignore
    if (!formData.email) error.email = 'L\'indirizzo email è richiesto';
    else if (!emailRegex.test(formData.email)) {
      error.email = 'Inserisci un indirizzo email valido.';
    }

    if (!formData.msg) error.msg = 'Il messaggio è richiesto';
    else if (!msgRegex.test(formData.msg)) {
      error.msg = 'Inserisci un messaggio valido.';
    }

    console.log(error);

    return error;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessages(validation(formData));

    if (
      !errorMessages.name &&
      !errorMessages.surname &&
      !errorMessages.email &&
      !errorMessages.msg
    ) {
      setIsLoading(true);
      const res = await fetch('/api/contact', {
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          surname: formData.surname,
          message: formData.msg,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      setFormData(initialFormData);

      setIsLoading(false);
      setIsSent(true);
    }
    //console.log(name, email, surname, message);
  };

  return (
    <>
      {isSent ? (
        <div className="flex flex-col items-center flex-center">
          <p className="title text-[24px] mt-10 mb-1">Messaggio ricevuto!</p>
          <p className="description mb-1">Adoro la tua intraprendenza.</p>

          <Image
            src="/assets/homepage/happiness.png"
            alt="Success"
            width={80}
            height={80}
            className="mt-5 mb-6"
          />
          <p className="description">
            Ti risponderò entro
            <br /> 24h
          </p>
        </div>
      ) : (
        <form className="w-full flex flex-col" onSubmit={handleSubmit}>
          <div className="w-full flex flex-row gap-4 flex-center">
            <div className="w-1/2 flex flex-col">
              <p className="mb-2 w-full mt-4 title text-[18px]">Nome</p>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.name}
                placeholder="Il tuo nome"
                type="text"
                name="name"
                id="name"
                maxLength={25}
                className="p-2 w-full rounded-lg border-2 border-solid border-[#D9D9D9]"
              />
              <span className="error_msg">{errorMessages.name}</span>
              {errorMessages.surname && !errorMessages.name && (
                <span className="mt-4"></span>
              )}
            </div>
            <div className="w-1/2 flex flex-col">
              <p className="mb-2 w-full mt-4 title text-[18px]">Cognome</p>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.surname}
                placeholder="Il tuo cognome"
                type="text"
                name="surname"
                id="email"
                maxLength={25}
                className="p-2 w-full rounded-lg border-2 border-solid border-[#D9D9D9]"
              />
              <span className="error_msg">{errorMessages.surname}</span>
              {errorMessages.name && !errorMessages.surname && (
                <span className="mt-4"></span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col">
            <p className="mb-2 w-full mt-4 title text-[18px]">Email</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.email}
              placeholder="nome.cognome@gmail.com"
              type="email"
              name="email"
              id="email"
              maxLength={50}
              className="p-2 w-full rounded-lg border-2 border-solid border-[#D9D9D9]"
            />
            <span className="error_msg">{errorMessages.email}</span>
          </div>

          <div>
            <p className="mb-2 w-full mt-4 title text-[18px]">Messaggio</p>
            <textarea
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData.msg}
              placeholder="Scrivi qui il tuo messaggio..."
              name="msg"
              id="msg"
              maxLength={800}
              className="w-full h-[120px] p-2 rounded-lg border-2 border-solid border-[#D9D9D9]"
            ></textarea>
            <span className="error_msg">{errorMessages.msg}</span>
          </div>

          <div
            //onClick={() => router.push('/words')}
            className="mt-4 cta-btn bg-[#268C41]"
          >
            {isLoading ? (
              <Ring size={30} lineWeight={5} speed={2} color="white" />
            ) : (
              <button className="cta-title text-[30px]" type="submit">
                Invia
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default ContactForm;
