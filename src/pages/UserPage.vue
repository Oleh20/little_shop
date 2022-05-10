<template>
	<div >
		<header>
		  <div class="header__top">
		 	 <a href="" class="header__logo">
				 <img src="../../img/Logo.jpg" alt="">
		    </a>
			<div class="heder__account">
			 	<my-button class="check" @click="showWindow">Check in</my-button>
				<my-button class="log" @click="showWindowLogIn">Log in</my-button>
			</div>
	</div>
		</header>
  <main>
	   <h1 class="title">
		  All products
	   </h1>
		<div class="items__flex">
			<div class="item">
				<div class="item__img">
					<img src="../../img/printer.png" alt="">
				</div>
				<my-button @click="$router.push('/product/1')" class="item__watch">
					Watch
				</my-button>
				
			</div>
			<div class="item ">
				<div class="item__img">
					<img src="../../img/surprize.png" alt="">
				</div>
				<my-button @click="$router.push('/product/2')" class="item__watch">
					Watch
				</my-button>
			</div>
		</div>
  </main>
  
  <my-check-in v-model:show="windowVisible">
  <my-form v-if="formLogIn"></my-form>
  <my-form-log-in v-else></my-form-log-in>
  </my-check-in>
   </div>
</template>

<script>
import MyButton from '@/components/MyButton.vue'
import MyCheckIn from '@/components/MyCheckIn.vue'
import MyForm from '@/components/MyForm.vue'
import MyFormLogIn from '@/components/MyFormLogIn.vue'
export default {
  components: { MyButton, MyCheckIn, MyForm, MyFormLogIn },
	data(){
		return{
			windowVisible: false,
			formLogIn: true
		}
	},
	methods:{
		showWindow(){
				this.$store.commit('showForm', true)
			this.windowVisible = true;
			this.formLogIn = true;
		},
		showWindowLogIn(){
			this.$store.commit('showForm', true)
			this.windowVisible = true;
			this.formLogIn = false;
		}
	}
}
</script>

<style>

	.header__top{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.heder__account{
		display: flex;
	}
	.check{
		margin-right: 20px;
	}
	h1{
		margin: 20px;
		font-size: 30px;
		font-weight: 600;
	}
	.item{
		cursor: pointer;
		transition: all 0.3s ease 0s;
		width: 259px;
		height: 300px;
		border: 2px solid #2264D1;
		border-radius: 10px;
		margin: 20px;
		padding: 10px;
	}
	.item:hover{
		box-shadow: 0px 2px 4px rgba(27, 78, 163, 0.2), 0px 4px 8px rgba(41, 121, 255, 0.2);
	}
	.item__img img{
		width: 235px;
		height: 235px;
		margin: 0;

	}
	.items__flex{
		display: flex;
	}
	.item__watch button{
		transition: all 0.3s ease 0s;
		width: 100%;
	}
	.item__watch button:hover{
		background: #e8efff;
	}
</style>