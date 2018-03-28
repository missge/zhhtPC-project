<template>
<div>
  <el-form label-position="left"  ref="simple_picture" :model="simple_picture" label-width="100px"  style="margin:30px;width:80%;min-width:600px;" border>
         <el-form-item label="显示方式">
                <el-radio-group v-model="simple_picture.ui_type" @change=handleChangeDisplay>
                  <el-radio  v-model="simple_picture.ui_type" label="1">单图</el-radio>
                  <el-radio  v-model="simple_picture.ui_type" label="2">图文</el-radio>
                </el-radio-group>
        </el-form-item>
        <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              :action="upload_url"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :data="upload_type"
              :file-list="fileList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <!-- 图片预览弹窗 -->
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>

         <el-form-item label="左右边间距" prop="margin">
            <el-input v-model="simple_picture.margin"></el-input>
        </el-form-item>

        <el-form-item label="链接地址" prop="url">
            <el-input v-model="simple_picture.url"></el-input>
        </el-form-item>

        <el-form-item label="文字" prop="text">
            <el-input v-model="simple_picture.text"></el-input>
        </el-form-item>

        <el-form-item label="字体大小" prop="font_size">
            <el-input-number :min="10" v-model="simple_picture.font_size"></el-input-number>
        </el-form-item>

        <el-form-item label="字体类型" prop="font_type">
            <el-select v-model="simple_picture.font_type" placeholder="请选择">
                <el-option
                  v-for="item in fonts"
                  :label="item.value"
                  :value="item.key"
                  :key="item.key">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="字体颜色" prop="color">
            <sketch-picker :value="simple_picture.font_color" @input="updateValue"></sketch-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('simple_picture')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { Sketch } from 'vue-color'
    import { mapState, mapActions,mapGetters } from 'vuex'
    import GlobalConfig from '../../../GlobalConfig'

    export default {
        components : { 
            'sketch-picker': Sketch,
        },
        data() {
            return {
                colors: {
                    hex:"#000"
                },
                upload_url:GlobalConfig.uploadImageUri,
                dialogImageUrl: '',
                dialogVisible: false,
                submitVisible: false,
                upload_type:{
                    type: GlobalConfig.uploadType,
                    online: true
                },
                fonts: GlobalConfig.fonts,
                simple_picture: {
                    img: "",
                    url: GlobalConfig.mifgUrl,
                    text: "",
                    ui_type: "1",
                    margin: 0,
                    font_type:"",
                    font_size: 10,
                    font_color: "#000"
                },
                ui_type: "1",
                fileList: [],
                // tmp: '<div style="position:relative;margin-bottom: 10px; margin-left: MARGINpx;margin-right: MARGINpx;"><strong style="position:absolute; left:3%; bottom:9%;color:FONTCOLOR;font-family:FONTTYPE; font-size:FONTSIZEpx">TEXT</strong><a href="HREF"><img src="DEMO" style="width:100%;display:block;"></a></div>',

                // tmp1: '<ul style="padding-left: 0px; width: 100%; height: 100%; margin-top: 0px; margin-bottom: 10px; text-align: center;margin-left: MARGINpx;margin-right: MARGINpx;"><li style="position:relative;list-style-type:none;width:100%;background-size: contain;background-repeat: no-repeat;width: 100%;height: 0;padding-top: 100%;text-align:center;"><div style="margin-left:4%;position: absolute;width: 92%;top: 12%;"><span style="color:FONTCOLOR;font-family:FONTTYPE; font-size:FONTSIZEpx">TEXT</span></div><div class="divOne" style="margin-left:4%;position: absolute;width: 92%;top: 31%;"><a href="HREF"><img src="DEMO" width="100%" alt=""/></a></div></li></ul>'
          }
        },
        computed: {
            ...mapState ({

                designCurrentData: state => state.designCurrentData,
                designCurrentType: state => state.designCurrentType
            })
          },
         // 同：computed:mapState({
         //        count:state=>state.count  //理解为传入state对象，修改state.count属性
         // })
        methods: {
            ...mapActions({
                updateMode: 'updateMode',
            }),
            updateValue(value) {
                this.simple_picture.font_color = value.hex;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccess(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.simple_picture.img = response.data.url;
                    this.fileList = [{
                        name:"",
                        url: this.simple_picture.img
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.simple_picture.img = "";
                }
            },
            onSubmit(formname){
                console.log(this.simple_picture.ui_type,"<<<<<D<D<D<<")
                var currentData = this.designCurrentData;
                // if (!currentData.data) {
                //     currentData.html = this.tmp;
                // } else if (this.simple_picture.ui_type == "1") {
                //     currentData.html = this.tmp;
                // } else {
                //     currentData.html = this.tmp1;
                // }

                // currentData.html = currentData.html.replace("DEMO", this.simple_picture.img).replace("HREF", this.simple_picture.url.trim()||"javascript:void(0)").replace("TEXT", this.simple_picture.text||"").replace(/MARGIN/g, this.simple_picture.margin).replace("FONTTYPE", this.simple_picture.font_type).replace("FONTSIZE", this.simple_picture.font_size).replace("FONTCOLOR", this.simple_picture.font_color);;
                currentData.data = this.simple_picture;
                this.updateMode(currentData)
            },
            handleChangeDisplay(value) {
                var currentData = this.designCurrentData;
                
                if (this.simple_picture.img == "") {
                    this.simple_picture.img = GlobalConfig.defaultImg;
                    this.simple_picture.text = "输入文字";
                }

                currentData.data = this.simple_picture;
                currentData.data.ui_type = value;
                this.updateMode(currentData);
            }
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {
                this.simple_picture = this.designCurrentData.data;
                if (!this.simple_picture.font_color) {
                    this.simple_picture.font_color = "#000";
                }
                this.fileList = [{
                    name:"",
                    url: this.simple_picture.img || ""
                }]
            } else {
                this.simple_picture = {
                    img: "",
                    url: GlobalConfig.mifgUrl,
                    ui_type:"1",
                    margin:0,
                    font_size:20.5,
                    font_type:"",
                    font_color: "#000"
                }
                this.fileList = []
            }
        }
    }
</script>
