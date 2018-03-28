<template>
  <div style="height:400px">
    <mt-swipe :auto="4000">
      <mt-swipe-item  v-for="(firstItem,key) in vdata.imgArr" :key='key'>
        <a :href="firstItem.url"><img :src="firstItem.img"  alt=""></a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
    var default_img = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    components : {},
    data() {
        return {
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
