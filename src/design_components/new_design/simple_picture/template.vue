<template>
    <div v-if="vdata.ui_type == '1'" style="position:relative;margin-bottom: 0px;" :style="{marginLeft: vdata.margin+'px',marginRight: vdata.margin+'px'}">
        <a :href="vdata.url">
            <img :src="vdata.img" style="width:100%;display:block;">
        </a>
    </div>
    <div v-else-if="vdata.ui_type == '2'">
        <ul style="padding-left: 0px; width: 100%; height: 100%; margin-top: 0px; margin-bottom: 0px; text-align: center;" :style="{marginLeft: vdata.margin+'px',marginRight: vdata.margin+'px'}">
            <li style="position:relative;list-style-type:none;width:100%;background-size: contain;background-repeat: no-repeat;width: 100%;height: 0;padding-top: 100%;text-align:center;">
                <div style="margin-left:4%;position: absolute;width: 92%;top: 12%;">
                    <span :style="{color:vdata.font_color, fontSize:vdata.font_size+'px'}">{{vdata.text}}</span>
                </div>
                <div class="divOne" style="margin-left:4%;position: absolute;width: 92%;top: 31%;">
                    <a :href="vdata.url">
                        <img :src="vdata.img" width="100%" alt=""/>
                    </a>
                </div>
            </li>
        </ul>
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
                        img:default_img,
                        url: "",
                        text: "",
                        ui_type: "1",
                        margin: 0,
                        font_type:"",
                        font_size: 20,
                        font_color: "#000"
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
