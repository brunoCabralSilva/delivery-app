import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Carousel({ list, data }) {
  return (
    <Swiper
      className="w-full h-full"
      modules={ [Autoplay] }
      loop="true"
      autoplay={ { delay: data.time } }
      direction={ data.direction }
      reverseDirection={ data.reverse }
    >
      {
        list.map((endpoint, index) => (
          <SwiperSlide key={ index }>
            <img
              className="object-cover h-full w-full"
              src={ require(`../images/${endpoint}.jpg`) }
              alt="imagem de comida"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}

Carousel.propTypes = {
  list: PropTypes.arrayOf().isRequired,
  data: PropTypes.shape({
    direction: PropTypes.string,
    time: PropTypes.string,
    reverse: PropTypes.string,
  }).isRequired,
};
