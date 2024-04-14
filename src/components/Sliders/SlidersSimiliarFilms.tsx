import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {SimilarMovie} from "../../interfaces";
import {Link} from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface Props {
    similiarFilms: SimilarMovie[]
}

export function SliderSettingsFilms({similiarFilms}: Props) {
    return (
        <div className="wrapper__sliders__similiar">
            <Swiper
                modules={[Navigation]}
                loop={true}
                spaceBetween={50}
                slidesPerView={2}
                navigation
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                prevButton={<div className="swiper-button-prev">{"<"}</div>}
                nextButton={<div className="swiper-button-next">{">"}</div>}
                className="mySwiper"
            >
                {similiarFilms.map((photo) => (
                    <SwiperSlide key={photo.id}>
                        <Link to={`/id=${photo.id}`}>
                            <img src={photo.poster.url}/>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
