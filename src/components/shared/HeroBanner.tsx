// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { bannerLists } from "../utils";

const colors = ["bg-banner-color1", "bg-banner-color2", "bg-banner-color3"];

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="py-2 rounded-md">
      <Swiper
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
      >
        {bannerLists.map((item, i) => (
          <SwiperSlide key={item.id}>
            <div
              className={`carousel-item rounded-md sm:h-[500px] h-96 ${colors[i]}  `}
            >
              <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center h-full">
                <div className="lg:w-1/2 w-full p-4 lg:p-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                  <h3 className="text-3xl text-white font-bold">
                    {item.title}
                  </h3>
                  <h1 className="text-5xl text-white font-bold mt-2">
                    {item.subtitle}
                  </h1>
                  <p className="text-white font-semibold mt-4">
                    {item.description}
                  </p>
                  <Link
                    to={"/products"}
                    className="mt-6 inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="lg:w-1/2 w-full h-full flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain h-full w-full max-h-[400px] lg:max-h-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
