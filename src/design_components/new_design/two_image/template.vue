<template>
    <div style="display: flex;margin-bottom: 0px">
        <div style="margin-left: 0px;overflow:hidden;width:50%;float:left;display:inline;">
            <a :href="vdata.url1">
                <img style="display:block;height:100%;width:100%" :src="vdata.img1"/>
            </a>
        </div>
        <div style="width:50%;float:right;display:inline;margin-right: 0px;">
            <a :href="vdata.url2">
                <img style="display:block;width:100%;" :src="vdata.img2"/>
            </a>
        </div>
    </div>
</template>

<script>
    var default_img = "http://wallpaper.cdn.pandora.xiaomi.com/thumbnail/webp/w512/MiTv/0bdab55084ff3433126f2aff3e847eda79130a0f9";
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
                        url1: "",
                        url2: "",
                        img1: default_img,
                        img2: default_img,
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