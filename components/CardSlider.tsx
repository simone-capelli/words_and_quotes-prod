import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardCarousel = () => {
  const cards = [
    { id: 1, title: 'Card 1', text: 'Testo della card 1' },
    { id: 2, title: 'Card 2', text: 'Testo della card 2' },
    { id: 3, title: 'Card 3', text: 'Testo della card 3' },
    // Aggiungi altre card se necessario
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="w-full">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-lg shadow-md p-4 mx-4">
          <h3 className="text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-gray-600">{card.text}</p>
        </div>
      ))}
    </Slider>
  );
};

export default CardCarousel;
