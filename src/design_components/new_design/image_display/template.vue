<template>
    <div v-if="vdata.ui_type == '1'" style="margin-left: 00px;margin-right: 0px;display:iflex;margin-bottom: 0px;">
        <ul style="padding-left: 0px; width: 100%; height: 100%; list-style: none;margin-top: 0px;">
            <li style="width:33.3%;float:left;margin-left:0px">
                <a :href="vdata.url1" style="">
                    <img style="width:100%;" :src="vdata.img1"/>
                </a>
            </li>
            <li style="width:33.3%;float:left;margin-left:0px">
                <a :href="vdata.url2" style="">
                    <img style="width:100%;" :src="vdata.img2"/>
                </a>
            </li>
            <li style="width:33.3%;float:left;margin-left:0px">
                <a :href="vdata.url3" style="">
                    <img style="width:100%;" :src="vdata.img3"/>
                </a>
            </li>
        </ul>
    </div>

    <div v-else-if="vdata.ui_type == '2'" style="display:iflex;margin-bottom: 0px">
        <div style="margin-left: 0px;overflow:hidden; height:300px;width:50%;float:left;display:inline;">
            <a :href="vdata.url1">
                <img style="display:block;height:100%;width:100%" :src="vdata.img1" />
            </a>
        </div>
        <div style="height:300px;width:50%;float:right;display:inline;margin-right: 0px;">
            <div style="height:50%">
                <a :href="vdata.url2">
                    <img style="display:block;width:100%;height:150px" :src="vdata.img2" />
                </a>
            </div>
            <div style="height:50%;margin-top: 0px;">
                <a :href="vdata.url3">
                    <img style="display:block;width:100%;height:150px" :src="vdata.img3"/>
                </a>
            </div>
        </div>
    </div>

</template>

<script>
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
                        ui_type: "1",
                        url1: "",
                        url2: "",
                        url3: "",
                        img1: this.global_config.defaultImg,
                        img2: this.global_config.defaultImg,
                        img3: this.global_config.defaultImg,
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
