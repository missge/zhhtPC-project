<template>
	<div>
	   <el-form :inline="true" :model="formInline" class="demo-form-inline query-form ">
               <el-form-item label="订单号">
                    <el-input v-model="formInline.user" placeholder="订单号"></el-input>
               </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="formInline.user" placeholder="手机号/姓名"></el-input>
               </el-form-item>
                <el-form-item label="商品">
                    <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
               </el-form-item>
                <el-form-item label="支付时间">
		            <el-date-picker  v-model="value7"  type="date" placeholder="选择日期">
    				</el-date-picker>
			     </el-form-item>
			    <el-form-item label="类型">
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
			    <el-table-column prop="date" label="订单号"></el-table-column>
			    <el-table-column  prop="name" label="商品" >  </el-table-column>
			    <el-table-column   prop="num" label="地址">  </el-table-column>
			     <el-table-column prop="good"   label="买家">   </el-table-column>
			     <el-table-column  prop="zmoney" label="总金额"> </el-table-column>
			     <el-table-column  prop="money"  label="商家结算金额">   </el-table-column>
			      <el-table-column prop="time"  label="完成时间">  </el-table-column>
			  </el-table>
			  <el-pagination class="pagination " background layout="prev, pager, next , jumper"  :current-page.sync="currentPage3" :total="1000">
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
		          value: '支付时间',
		          label: '支付时间'
		        }, {
		          value: '下单时间',
		          label: '下单时间'
		        }, {
		          value: '发货时间',
		          label: '发货时间'
		        }],
		        value: '',
		        tableData: [{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        },{
		          date: 'JS17122110052',
		          name: '美的 家用智能热水壶1.7L 白色',
		          address: '上海市普陀区金沙江路 1518 弄',
		          num:'2',
		          good:'周三',
		          zmoney:'100',
		          money:'190',
		          time:'2009-12-2'		       
		        }],
		        currentPage3: 5

			}
		}
	}
</script>
<style>

</style>