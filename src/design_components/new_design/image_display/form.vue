<template>
<div>
  <el-form label-position="left"  ref="image_display" :model="image_display" label-width="100px"   border>
            <el-form-item label="显示方式">
                <el-radio-group v-model="image_display.ui_type" @change=handleChangeDisplay>
                  <el-radio  v-model="image_display.ui_type" label="1">普通</el-radio>
                  <el-radio  v-model="image_display.ui_type" label="2">两列</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片-1">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessFirst"
                  :data="upload_type"
                  :file-list="fileListFirst"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="链接地址-1" prop="url">
                <el-input v-model="image_display.url1"></el-input>
            </el-form-item>
            <el-form-item label="图片-2">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessSecond"
                  :data="upload_type"
                  :file-list="fileListSecond"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="链接地址-2" prop="url">
                <el-input v-model="image_display.url2"></el-input>
            </el-form-item>
            <el-form-item label="图片-3">
                <el-upload
                  class="upload-demo"
                  :action="upload_url"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccessThird"
                  :data="upload_type"
                  :file-list="fileListThird"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!-- 图片预览弹窗 -->
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="链接地址-3" prop="url">
                <el-input v-model="image_display.url3"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" :disabled="submitVisible" @click="onSubmit('image_display')">确定</el-button>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex'
    export default {
        components : {},
        data() {
            return {
                upload_url:this.global_config.uploadImageUri,
                dialogImageUrl: '',
                dialogVisible: false,
                submitVisible: false,
                upload_type:{
                    type: this.global_config.uploadType,
                    online: true
                },
                image_display: {
                    img: "",
                    ui_type: "1",
                    url1: "",
                    url2: "",
                    url3: "",
                    img1: this.global_config.defaultImg,
                    img2: this.global_config.defaultImg,
                    img3: this.global_config.defaultImg,
                },
                ui_type:"1",
                fileListFirst: [],
                fileListSecond: [],
                fileListThird: [],
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
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSuccessFirst(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img1 = response.data.url;
                    this.fileListFirst = [{
                        name:"",
                        url: this.image_display.img1
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img1 = "";
                }
            },
            handleSuccessSecond(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img2 = response.data.url;
                    this.fileListSecond = [{
                        name:"",
                        url: this.image_display.img2
                    }]

                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img2 = "";
                }
            },
            handleSuccessThird(response, file, fileList) {
                if (response.code == 200 && response.data) {
                    this.image_display.img3 = response.data.url;
                    this.fileListThird = [{
                        name:"",
                        url: this.image_display.img3
                    }]
                } else {
                    this.$notify({
                        title: '失败',
                        message: '图片上传失败',
                        type: 'error'
                    });
                    this.image_display.img3 = "";
                }
            },
            onSubmit(formname){
                var currentData = this.designCurrentData;
                // if (!currentData.data) {
                //     currentData.html = this.tmp;
                // } else if (this.image_display.ui_type == "1") {
                //     currentData.html = this.tmp;
                // } else {
                //     currentData.html = this.tmp1;
                // }
                // currentData.html = currentData.html.replace("HREF1", this.image_display.url1.trim()||"javascript:void(0)").replace("IMG1", this.image_display.img1).replace("HREF2", this.image_display.url2.trim()||"javascript:void(0)").replace("IMG2", this.image_display.img2).replace("HREF3", this.image_display.url3.trim()||"javascript:void(0)").replace("IMG3", this.image_display.img3);
                // console.log(currentData)
                currentData.data = this.image_display;
                this.updateMode(currentData);
            },
            handleChangeDisplay(value) {
                var currentData = this.designCurrentData;
                //TODO 替换参数
                
                // if (value == "1") {
                //     currentData.html = this.tmp;    
                // } else {
                //     currentData.html = this.tmp1;
                // }

                // if (this.image_display.url1) {
                //     currentData.html = currentData.html.replace("HREF1", this.image_display.url1.trim()||"javascript:void(0)").replace("IMG1", this.image_display.img1).replace("HREF2", this.image_display.url2.trim()||"javascript:void(0)").replace("IMG2", this.image_display.img2).replace("HREF3", this.image_display.url3.trim()||"javascript:void(0)").replace("IMG3", this.image_display.img3);
                // }
                this.image_display.ui_type = value
                currentData.data = this.image_display;
                this.updateMode(currentData);
            }
        },
        mounted() {
            if (this.designCurrentData && this.designCurrentData.data) {
                this.image_display = this.designCurrentData.data;
                this.fileListFirst = [{
                    name:"",
                    url: this.image_display.img1
                }];
                this.fileListSecond = [{
                    name:"",
                    url: this.image_display.img2
                }];
                this.fileListThird = [{
                    name:"",
                    url: this.image_display.img3
                }];
            } else {
                this.image_display = {
                    img: "",
                    url: "",
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
    }
</script>
