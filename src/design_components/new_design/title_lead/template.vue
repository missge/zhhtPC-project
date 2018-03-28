<template>
    <div style="display:inline-block;position:relative;margin-left:10px; text-align:left" :style="{marginBottom:vdata.bottom + 'px',marginTop:vdata.top + 'px'}">
        <strong v-if="vdata.strong == true" :style="{color:vdata.font_color, fontSize: vdata.font_size + 'px'}" >{{vdata.text}}</strong>
        <span v-else-if="vdata.strong == false" :style="{color:vdata.font_color, fontSize: vdata.font_size + 'px'}">{{vdata.text}}</span>
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
                        strong: false,
                        text: "输入文字",
                        font_size: 30,
                        top:0,
                        bottom: 0,
                        font_type:"",
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
            console.log(">>>SS>S>S>",this.vdata)
        },
        // watch:{
        //     vdata: function(v) {

        //     }
        // }
    }
</script>