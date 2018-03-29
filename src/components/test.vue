<template>
 <div>
    <swiper :options="swiperOption">
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
  </swiper>
 </div>
</template>

<script>
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
 //  	components: {
	//     swiper,
	//     swiperSlide
	// },
    data() {
      return {
        swiperOption: {
   //         loop: true,
          autoplay: {
			delay: 2500,
			disableOnInteraction: false
          },
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-inner {
    width: 100%;
    height: 400px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }
  img{width:300px; height:300px;}
</style>