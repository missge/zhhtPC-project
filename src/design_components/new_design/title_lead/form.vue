<template>
<div>
  <el-form label-position="left"  ref="title_lead" :model="title_lead" label-width="100px"  style="margin:30px;width:80%;min-width:600px;" border>
    
        <el-form-item label="文字" prop="text">
            <el-input type="textarea" v-model="title_lead.text"></el-input>
        </el-form-item>
        <el-form-item label="字体类型" prop="font_type">
            <el-select v-model="title_lead.font_type" placeholder="请选择">
                <el-option
                  v-for="item in fonts"
                  :label="item.value"
                  :value="item.key"
                  :key="item.key">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="字体大小" prop="font_size">
            <el-input-number :min="10" v-model="title_lead.font_size"></el-input-number>
        </el-form-item>

        <el-form-item label="字体加粗">
            <el-switch on-text="" off-text="" v-model="title_lead.strong"></el-switch>
        </el-form-item>
      
        <el-form-item label="上边距" prop="top">
            <el-input-number v-model="title_lead.top" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="下边距" prop="bottom">
           <el-input-number v-model="title_lead.bottom" :min="0"></el-input-number>
        </el-form-item>
         <el-form-item label="字体颜色" prop="font_color">
            <sketch-picker :value="title_lead.font_color" @input="updateValue"></sketch-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('title_lead')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { Sketch } from 'vue-color'
    import { mapState, mapActions,mapGetters } from 'vuex'
    export default {
        components : {
            'sketch-picker': Sketch,
        },
        data() {
            return {
                submitVisible: false,
                title_lead: {
                    strong: false,
                    text: "输入文字",
                    font_size: 30,
                    top:0,
                    bottom: 0,
                    font_type:"",
                    font_color: "#000"
                },
                fonts: this.global_config.fonts,
          }
        },
        computed: {
            ...mapState ({
                designCurrentData: state => state.designCurrentData,
                designCurrentType: state => state.designCurrentType
            })
          },
        methods: {
            ...mapActions({
                updateMode: 'updateMode',
            }),
            updateValue(value) {
                this.title_lead.font_color = value.hex;
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                // currentData.html = this.tmp;
                // currentData.html = currentData.html.replace("FONTSIZE", this.title_lead.font_size).replace("TEXT", this.title_lead.text.replace(/\n/g, '<br>')||"").replace("FONTSIZE", this.title_lead.font_size).replace("TOP", this.title_lead.top).replace("BOTTOM", this.title_lead.bottom).replace("FONTTYPE", this.title_lead.font_type).replace("FONTCOLOR", this.title_lead.font_color);
                // if (this.title_lead.strong == false) {
                //     currentData.html = currentData.html.replace(/strong/g, "span")
                // }
                currentData.data = this.title_lead;
                this.updateMode(currentData)
            },
          
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data){
                this.title_lead = this.designCurrentData.data;
                console.log(this.title_lead)
                if (!this.title_lead.font_type) {
                    this.title_lead.font_type = "";   
                }
                if (!this.title_lead.font_color) {
                    this.title_lead.font_color = "#000";   
                }
               
            } else {
                this.title_lead = {
                    text: "输入文字",
                    font_size: 30,
                    strong: false,
                    top:0,
                    bottom: 0,
                    font_type: "",
                    font_color: "#000"
                }
               
            }
        }
    }
</script>
