<template>
	<div>
		<my-button class="close__button" @click="closeForm">CLOSE</my-button>
	 <form @submit.prevent novalidate>
		 <div class="item__input">
 			<label  for="name">Your name</label>
	  		<input  v-model.trim="state.formReg.name" class="input" type="text" placeholder="Name" id="name">
			<small v-if="v$.formReg.name.$error">{{v$.formReg.name.$errors[0].$message}}</small>
		 </div>
		  <div class="item__input">
				<label for="pass">Your password</label>
	 	   	<input  v-model.trim="state.formReg.pass" class="input" type="password" placeholder="Password" id ='pass'>
			 	<small v-if="v$.formReg.pass.$error">{{v$.formReg.pass.$errors[0].$message}}</small>
		  </div>
		<my-button type ="submit" class="reg__button" @click="ckeckIn">Check in</my-button>
  </form>
	</div>
</template>

<script>
	import useVuelidate from '@vuelidate/core'
	import {required, minLength, alpha} from '@vuelidate/validators'
	import {reactive, computed } from 'vue'
	import MyButton from '@/components/MyButton.vue'
	export default {
		data(){
			return{
				permission: false,
				user:{
					name:'',
					pass:''
				},
				product:"2"
			}
		},
		 components: { MyButton},
		 setup(){
			const state = reactive({
				formReg:{
					name: '',
					pass: '',
				}
			})
			const rules = computed(()=>{
				return{
				   formReg:{
				   name: {required,minLength:minLength(4), alpha},
			 	   pass: {required, minLength:minLength(6)},
				 }
				}
			})
			const v$ = useVuelidate(rules,state)

			return{
				state,
				v$,
			}
		},
		methods:{
			ckeckIn(){
				this.v$.$validate()
				if(!this.v$.$error){
					if(this.state.formReg.name.toLowerCase() == this.$store.state.userInfo.name &&  this.state.formReg.pass.toLowerCase() == this.$store.state.userInfo.pass){
						alert('nice')
						this.permission = true
						this.$store.commit('changePermission', true)
						this.$store.commit('showForm', false)
					}else{
						alert("Пароль або ім'я не правильні ")
					}
				}else{
					alert('try again')
				}
			},
			closeForm(){
				this.$store.commit('showForm', false)
				}
		},
		
	}
</script>

<style  scoped>
	small{
		color: rgb(228, 59, 59);
		font-size: 12px;
		position: absolute;
		bottom: -22px;
		left: 0;
	}
	form div{
		margin-bottom: 25px;
	}
	.item__input{
		position: relative;
	}
	.input{
		border-radius: 4px;
		width: 100%;
		border: 2px solid #2264D1;
		padding: 10px 15px;
	}
	.reg__button {
		margin-top: 15px;
		flex-direction: column;
		display: flex;
		align-items: flex-end;
	}
	.is-invalid{
		border: 5px solid red;
	}
	.close__button{
		margin-bottom: 15px;
		flex-direction: column;
		display: flex;
		align-items: flex-end;
	}
</style>