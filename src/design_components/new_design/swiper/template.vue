<template>
  <div style="height:400px">
    <swiper :options="swiperOption">
        <swiper-slide v-for="(firstItem,key) in vdata.imgArr" :key='key'>
            <a :href="firstItem.url" >
                <img :src="firstItem.img"  alt="">
            </a>   
        </swiper-slide>
    </swiper>
  </div>
</template>
<script>
    var default_img = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";
    var img_1="http://zhonghuihaotai.dealreal.com.cn/wxmall/upload/images/20171123/20171123044139591.jpg"
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    components : {},
    data() {
        return {
            swiperOption: {
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
    },
    props: {
        vdata: {
            type: Object,
            default: function() {
                return {
                  imgArr:
                    [
                     {
                       img:default_img,
                       url:'',
                     },{
                       img:default_img,
                       url:'',
                     },{
                       img:default_img,
                       url:'',
                     },{
                       img:default_img,
                       url:'',
                     },{
                       img:default_img,
                       url:'',
                     },{
                       img:default_img,
                       url:'',
                     }
                  ],
                }
            }
        }
    },
    computed: {
        
      },
    methods: {
       
    },
    mounted() {
        console.log(this.vdata)
    },
    // watch:{
    //     vdata: function(v) {

    //     }
    // }
  }
</script>
<style scoped>
    img{width:100%;}
</style>
