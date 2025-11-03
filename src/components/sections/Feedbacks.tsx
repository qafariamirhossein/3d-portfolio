import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { styles } from "../../constants/styles";
import { testimonials } from "../../constants";
import { Header } from "../atoms/Header";
import { TTestimonial } from "../../types";
import { config } from "../../constants/config";

const FeedbackCard: React.FC<{ testimonial: TTestimonial }> = ({
  testimonial,
}) => (
  <div className="bg-black-200 xs:w-[320px] w-full rounded-3xl p-10">
    <p className="text-[48px] font-black text-white">"</p>

    <div className="mt-1">
      <p className="text-[18px] tracking-wider text-white">{testimonial.testimonial}</p>

      <div className="mt-7 flex items-center justify-between gap-1">
        <div className="flex flex-1 flex-col">
          <p className="text-[16px] font-medium text-white">
            <span className="blue-text-gradient">@</span> {testimonial.name}
          </p>
          <p className="text-secondary mt-1 text-[12px]">
            {testimonial.designation} of {testimonial.company}
          </p>
        </div>

        <img
          src={testimonial.image}
          alt={`feedback_by-${testimonial.name}`}
          className="h-10 w-10 rounded-full object-cover"
        />
      </div>
    </div>
  </div>
);

const Feedbacks = () => {
  return (
    <div className="bg-black-100 mt-12 rounded-[20px]">
      <div
        className={`${styles.padding} bg-tertiary min-h-[300px] rounded-2xl`}
      >
        <Header useMotion={true} {...config.sections.feedbacks} />
      </div>
      <div className={`${styles.paddingX} -mt-20 relative`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
            bulletClass: 'swiper-pagination-bullet-custom',
            bulletActiveClass: 'swiper-pagination-bullet-active-custom',
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 28,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <FeedbackCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black-200 p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black-200 p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom flex justify-center gap-2 mt-8"></div>
      </div>
    </div>
  );
};

export default Feedbacks;
