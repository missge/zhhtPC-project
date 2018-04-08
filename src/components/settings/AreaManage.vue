<template>
	<div>
		<div class="AreaFormFile">
			<el-form ref="areaform" :model="areaform" class="demo-ruleForm el-form-item__content">
				<el-form-item label="模板名称:" >
					<el-input v-model="areaform.name" placeholder=""></el-input>
				</el-form-item>

				<div><span>地区选择：</span></div>
				<el-form-item prop="zzs" >
					<div><span>直辖市：</span></div>
					<el-checkbox-group v-model="areaform.zzs">
					   <el-checkbox v-for="(item,index) in zzs" :key="index" :label="item.code">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>

				<el-form-item prop="qts">
					<div><span>省　市：</span></div>
					<div v-for="items in qts">
						<el-checkbox :label="items.code" :indeterminate="items.indeterminate" v-model="items.checkAllState"  @change="handleCheckAllChange(items,'qts',items.checkAllState)">{{items.name}}</el-checkbox>
						<el-checkbox-group v-model="areaform.qts" @change="handleCheckedCitiesChange(items,'qts')">
					   		<el-checkbox v-for="(item,index) in items.citys" :key="index" :label="item.code">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</el-form-item>

				<el-form-item prop="zzq">
					<div><span>自治区：</span></div>
					<div v-for="items in zzq">
						<el-checkbox :label="items.code" :indeterminate="items.indeterminate" v-model="items.checkAllState"  @change="handleCheckAllChange(items,'zzq',items.checkAllState)">{{items.name}}</el-checkbox>
						<el-checkbox-group v-model="areaform.zzq"  @change="handleCheckedCitiesChange(items,'zzq')">
					   		<el-checkbox v-for="(item,index) in items.citys" :key="index" :label="item.code">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</el-form-item>

				<el-form-item>
				    <el-button type="primary" @click="seveFn(areaform)">保存</el-button>
				    <el-button >返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {addAreaTemp,editAreaTemp} from '../../api/api.js';
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	const cityOptions = [
       {
           "id":"1",
           "areaType":"1",
           "code": "11",
           "name": "北京",
			 "IsDirect":"0",
			 "citys":[
			 {
			 	"code":"1101",
				 "id":"13",
				 "name":"北京市",
				 "IsDirect":"0",
				 "provinceCode":"11"	
				}]
		
       },{
           "id": "3",
           "areaType":"2",
           "code": "13",
           "name": "河北省",
			 "IsDirect":"1",
			 "citys":[
				{"code":"1301",
				 "id":"12",
				 "name":"石家庄",
				 "IsDirect":"1",
				 "provinceCode":"13"	
				},
				{"code":"1302",
				 "id":"13",
				 "name":"保定",
				 "IsDirect":"1",
				 "provinceCode":"13"	
					}]
       },{
           "id": "5",
           "areaType":"3",
           "code": "15",
           "name": "内蒙古自治区",
			 "IsDirect":"2",
			 "citys":[
				{"code":"1501",
				 "id":"25",
				 "IsDirect":"2",
				 "name":"呼和浩特",
				 "provinceCode":"15"	
					}]
       },{
           "id":"6",
           "areaType":"1",
           "code": "61",
           "name": "重庆",
			 "IsDirect":"0",
			 "citys":[
			 {
			 	"code":"6101",
				 "id":"13",
				 "name":"重庆市",
				 "IsDirect":"0",
				 "provinceCode":"11"	
				}]
		
       },{
           "id": "7",
           "areaType":"2",
           "code": "73",
           "name": "安徽省",
			 "IsDirect":"1",
			 "citys":[
				{"code":"7301",
				 "id":"12",
				 "name":"合肥",
				 "IsDirect":"1",
				 "provinceCode":"73"	
				},
				{"code":"7302",
				 "id":"13",
				 "name":"芜湖",
				 "IsDirect":"1",
				 "provinceCode":"73"	
					}]
       }

   	];
	export default {
	    data() {
	      return {
	      	AddOrChange:this.$route.query.AddOrChange,
        	zzs:[],
        	qts:[],
        	zzq:[],
        	areaform: {
	          name: '',
	          zzs: [],
	          qts: [],
	          zzq: []
	        }
	      };
	    },
	    methods: {
			getTablelist(){
				//标志是点击添加，还是修改按钮
				if(this.AddOrChange=='change'){
					getChangeList().then((data) => {
						
					}).catch(message => {
						this.$message.error("请求失败，请联系客服，失败码"+message);
						 this.loading=false
					})
				}else{
					
				}
			},
			seveFn(data){
				// UserPostChange(this.ruleForm).then((data)=>{
				// 	console.log(data)
				// })
				console.log(data)
			},
			handleCheckAllChange(pra,pra1,state) {
				let opt = state ? 'addAll' : 'deleteAll';
				let checkedArr = this.getCitydata(pra,this.areaform[pra1],opt);
		        this.areaform[pra1] = checkedArr;
		        pra.indeterminate = false;
		        console.log(this.areaform[pra1]);
		    },
		    handleCheckedCitiesChange(pra,pra1) {
		    	let checkedArr = this.getCitydata(pra,this.areaform[pra1],'add')
		        let checkedCount = checkedArr.length;
		        pra.checkAllState = checkedCount === pra.citys.length;
		        pra.indeterminate = checkedCount > 0 && checkedCount < pra.citys.length;
		        console.log(this.areaform[pra1]);
		    },
		    getCitydata(pra,data,opt){
		    	// 获取数据的值
		    	let tempCitys = pra.citys;
		    	let areaData = data;
		    	let tempArr = [];

				switch(opt){
		    		case 'add':
		    			areaData.map(function(d){
		    				tempCitys.map(function(t){
		    					if(t.code == d){
		    						tempArr.push(d);
		    					}		    				
		    				})
		    			})
		    			break;	
		    		case 'addAll':
						tempCitys.map(function(t){
			    			tempArr.push(t.code);		    				
			    		});

			    		tempArr = [...new Set(areaData.concat(tempArr))];
		    			break;
		    		case 'deleteAll':
		    			tempArr = areaData;
			    		for(let i=0;i<tempCitys.length;i++){
						    for(let j=0;j<tempArr.length;j++){
						        if(tempArr[j]==tempCitys[i].code){
						            tempArr.splice(j,1);
						            j--;
						        }
						    }
						}
		    			break;
		    	}
		    	return tempArr;
			},
		    getDataList(data){
		    	let tempdata = data;
		    	let zzs = [],zzq = [],qts = [];

		    	tempdata.map(function(d){
		    		switch(d.areaType){
		    			case '1':
		    				zzs.push(d);
		    				break;
		    			case '2':
		    				d.checkAllState = false;
		    				d.indeterminate = false;
		    				qts.push(d);
		    				break;
		    			case '3':
		    				zzq.push(d);
		    				break;
		    		}
		    	})

		    	this.zzs = zzs;
		    	this.qts = qts;
		    	this.zzq = zzq;
		    }
	    },
	    mounted(){
	    	//cityOptions从接口中调数据
	    	this.getDataList(cityOptions);
	    }
 	}
</script>
<style>
	.AreaFormFile{
		margin:0 auto;
		background:#fff;
	}	
	.AreaFormFile>.el-form{
		width:80%;
		padding: 24px;
	}
	.AreaFormFile .el-form-item__content{text-align:left;}
	.AreaFormFile .el-form-item {
    	margin-bottom: 0;
	}
</style>