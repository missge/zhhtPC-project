<template>
	<div>
		<div class="AreaFormFile">
			<div><span>批量导入会员：</span></div>
			<el-form ref="areaform" :model="areaform" class="demo-ruleForm el-form-item__content">
				
				<el-form-item>
				    <el-button type="primary" @click="seveFn(areaform)">确定</el-button>
				    <el-button >取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import Vue from 'vue'
	import router from '@/router'
	import {batchUploadMember} from '../../api/api.js'
	export default{
		data(){
			return{
				
			}
		},
		methods:{	
			
		},
		mounted(){
			this.getTablelist();
		}
	}
</script>