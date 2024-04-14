import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Poster } from "../../interfaces";
import styles from "../../css/SliderPosters.module.css";

interface Props {
    posters: Poster[],
}

export function SliderPosters({ posters }: Props) {
    return (
        <div className={styles.sliderContainer}>
            <Swiper
                modules={[Navigation]}
                loop={true}
                spaceBetween={20} // Пространство между слайдами
                slidesPerView={1} // Количество слайдов, отображаемых одновременно
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                prevButton={<div className="swiper-button-prev">{"<"}</div>}
                nextButton={<div className="swiper-button-next">{">"}</div>}
            >
                {posters.map((poster, index) => (
                    <SwiperSlide key={index}>
                        <img className={styles.image} src={poster.url} alt={`Poster ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
