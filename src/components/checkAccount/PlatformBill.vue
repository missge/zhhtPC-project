<template>
	<div>
	   <el-form :inline="true" :model="formInline" class="demo-form-inline query-form ">
               <el-form-item label="流水号">
                    <el-input v-model="formInline.user" placeholder="订单号"></el-input>
               </el-form-item>
             
                <el-form-item label="申请时间">
		            <el-date-picker  v-model="value7"  type="date" placeholder="选择日期">
    				</el-date-picker>
			     </el-form-item>
			    <el-form-item label="状态">
				     <el-select v-model="value" placeholder="请选择" >
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value" >
					    </el-option>
					</el-select>
			    </el-form-item>
			   
              	<div class="query_button">
              		<el-form-item>
	                    <el-button type="primary" >查询</el-button>
	                    <el-button  >重置</el-button>
	               </el-form-item>
              	</div>
        </el-form>
        <div class="table"> 
            <el-table
			    :data="tableData"  border style="width: 100%">
			    <el-table-column prop="date" label="流水号"></el-table-column>
			    <el-table-column  prop="name" label="结算总额" >  </el-table-column>
			    <el-table-column   prop="num" label="订单数">  </el-table-column>
			     <el-table-column prop="good"   label="发票编号">   </el-table-column>
			     <el-table-column  prop="zmoney" label="状态"> </el-table-column>
			      <el-table-column prop="time"  label="结算时间">  </el-table-column>
			  </el-table>
			
			  <el-pagination class="pagination " background layout="prev, pager, next , jumper"  :current-page.sync="currentPage3" :total="1000" style="float:right;">
			  </el-pagination>
        </div>
	</div>
</template>
<script >
import Vue from 'vue'
	export default{
		name: 'HelloWorld',
		data () {
			return {
				formInline: {
					user: '',
					region: '',
					name:''
				},
				value7: '',
				test:1,
				 options: [{
		          value: '全部',
		          label: '全部'
		        }, {
		          value: '发票待确认',
		          label: '发票待确认'
		        }, {
		          value: '代付款',
		          label: '代付款'
		        }, {
		          value: '已审核',
		          label: '已审核'
		        }],
		        value: '',
		        tableData: [{
		          date: 'JS17122110052',
		          name: '19880.85',
		          num:'990383973',
		          good:'2017-09-26 15:17:24',
		          zmoney:'完成',
		          time:'2017-09-26 15:17:24'

		        },{
		          date: 'JS17122110052',
		          name: '19880.85',
		          num:'990383973',
		          good:'2017-09-26 15:17:24',
		          zmoney:'完成',
		          time:'2017-09-26 15:17:24'

		        },{
		          date: 'JS17122110052',
		          name: '19880.85',
		          num:'990383973',
		          good:'2017-09-26 15:17:24',
		          zmoney:'完成',
		          time:'2017-09-26 15:17:24'

		        },{
		          date: 'JS17122110052',
		          name: '19880.85',
		          num:'990383973',
		          good:'2017-09-26 15:17:24',
		          zmoney:'完成',
		          time:'2017-09-26 15:17:24'

		        }],
		        currentPage3: 5

			}
		}
	}
</script>
