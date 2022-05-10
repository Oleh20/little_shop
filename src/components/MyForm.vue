<template>
	<div>
	<my-button class="close__button" @click="closeForm">CLOSE</my-button>
	 <form @submit.prevent novalidate>
		 <div class="item__input">
 			<label  for="name">Your name</label>
	  		<input v-model.trim="state.formReg.name" class="input" type="text" placeholder="Name" id="name">
			<small v-if="v$.formReg.name.$error">{{v$.formReg.name.$errors[0].$message}}</small>
		 </div>
		  <div class="item__input">
				<label for="pass">Your password</label>
	 	   	<input  v-model.trim="state.formReg.pass" class="input" type="password" placeholder="Password" id ='pass'>
			 	<small v-if="v$.formReg.pass.$error">{{v$.formReg.pass.$errors[0].$message}}</small>
		  </div>
			<div class="item__input">
				<label for="confPass">Confirm password</label>
	 	  		<input  v-model.trim="state.formReg.confPass" class="input" type="password" placeholder="Password" id ='confPass'>
				<small v-if="v$.formReg.confPass.$error">{{v$.formReg.confPass.$errors[0].$message}}</small>
			</div>
			<div class="item__input">
				<label for="email">Your email</label>
	  	   	<input  v-model.trim="state.formReg.email" class="input" type="email" placeholder="Email" id ='email'>
			  	<small v-if="v$.formReg.email.$error">{{v$.formReg.email.$errors[0].$message}}</small>
			</div>
		<my-button type ="submit" class="reg__button" @click="ckeckIn">Check in</my-button>
  </form>
	</div>
</template>

<script>
	import useVuelidate from '@vuelidate/core'
	import {email, required, minLength, sameAs, alpha} from '@vuelidate/validators'
	import { reactive, computed } from 'vue'
	import MyButton from '@/components/MyButton.vue'
	import axios from 'axios';
	export default {
		data(){
		return{
			show: false,
			product:"",
			userInfo:{
				name:'',
				pass:'',
				email:'',
			}
		}
	},
		 components: { MyButton},
		 setup(){
			const state = reactive({
				formReg:{
					name: '',
					pass: '',
					confPass:'',
					email:'',
				}
			})
			const rules = computed(()=>{
				return{
				   formReg:{
				   name: {required,minLength:minLength(4), alpha},
			 	   pass: {required, minLength:minLength(6)},
					confPass: {required, sameAs: sameAs(state.formReg.pass)},
			 	   email: {required, email},
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
					alert('Nice')
					this.sendData().then(
						this.userInfo.name = this.state.formReg.name.toLowerCase(),
						this.userInfo.pass = this.state.formReg.confPass,
						this.userInfo.email = this.state.formReg.email.toLowerCase(),
						this.$store.commit('updateUserInfo', this.userInfo),
						this.$store.commit('showForm', false)
					)

				}
			},
			async sendData(){
						try{
							 await axios.post('http://demo3043048.mockable.io/register',
							 JSON.stringify({
								username: this.state.formReg.name,
								password:  this.state.formReg.confPass,
								email:  this.state.formReg.email
							})) .then(function (response) {
  							  
 						 });
						}catch(e){
							alert(e)
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
		margin-bottom: 15px ;
		flex-direction: column;
		display: flex;
		align-items: flex-end;
	}
</style>