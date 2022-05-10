<template>
	<div class=" product">
		<h1 class="product__title">
			{{product.data[0].Title}}
		</h1>
		<hr>
		<div class="product__side">
			<div class="product__left">
			<div class="product__img">
				<img :src="img" alt="">
			</div>
			<h2 class="product__title">
			Опис
			</h2>
			<hr>
			<h3 class="product__descriprion">
				{{product.data[0].Text}}
			</h3>
		</div>
		<div class="product__right">
			<div class="product__comment">
				<form @submit.prevent>
					<div class="input">
						<input v-model.trim="state.userComment.commenting" class="product__input" type="text" placeholder="Write...">
							<small v-if="v$.userComment.commenting.$error">{{v$.userComment.commenting.$errors[0].$message}}</small>
							<div class="product__rating">
								<div class="procuts__mark-items">
									<input class="procuts__mark-item" v-model.trim="rate" type="radio" placeholder="Write..." name="star" id="star1" value="5"><label  class="procuts__mark-label" for="star1"></label>
									<input  class="procuts__mark-item" v-model.trim="rate" type="radio" placeholder="Write..." name="star" id="star2" value="4"><label  class="procuts__mark-label" for="star2"></label>
									<input  class="procuts__mark-item" v-model.trim="rate" type="radio" placeholder="Write..." name="star" id="star3" value="3"><label  class="procuts__mark-label" for="star3"></label>
									<input  class="procuts__mark-item" v-model.trim="rate" type="radio" placeholder="Write..." name="star" id="star4" value="2"><label  class="procuts__mark-label" for="star4"></label>
									<input  class="procuts__mark-item" v-model.trim="rate" type="radio" placeholder="Write..." name="star" id="star5" value="1"><label  class="procuts__mark-label" for="star5"></label>
								</div>
							</div>
					</div>
					<my-button class="button" @click="createReview">Submit Review</my-button>
				</form>
			</div>
			<div class="product__reviews">
					<div class="review"  v-for="data in rewiew" :key="data.Id" tag="p">
						<h4 class="review__username">
						Username: {{data.Created_by.Username}} 
						</h4>
						<p class="review__id">
							<span>ID:</span> {{data.Id}}
						</p>
						<p class="review__text">
							<span>Comment:</span> {{data.Text}}
						</p>
						<p class="review__rate">
							<span>Rate:</span> {{data.Rate}}
						</p>
					</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import {required,minLength} from '@vuelidate/validators'
import {reactive, computed } from 'vue'
import MyButton from '@/components/MyButton.vue'
	export default {
  components: { MyButton },
   setup(){
			const state = reactive({
				userComment:{
					commenting: '',
				}
			})
			const rules = computed(()=>{
				return{
				   userComment:{
				   commenting: {required,minLength:minLength(20)},
				 }
				}
			})
			const v$ = useVuelidate(rules,state)

			return{
				state,
				v$,
			}
		},
		data(){
			return{
				oneComment: true,
				rate: '',
				 img: ''
			}
		},
		props:{
			rewiew:{
				type: Object,
				
			},
			product:{
				type: Object,
				required: true
			},
		},
		mounted(){
			this.img = this.product.data[0].Img
		},
		methods:{
			createReview(){
				if(this.oneComment){
					this.v$.$validate()
					if (!this.v$.$error) {
					if (this.$store.state.permission) {
					const newReview ={
					Created_by:{
						Username:  Date.now()
					},
					Id: Date.now(),
					Text: this.state.userComment.commenting,
					Rate: this.rate,
				}
				this.rewiew.unshift(newReview);
				this.sendData()
				this.state.userComment.commenting = '';
				this.rate = '';
				this.oneComment = false;
				}else{
					alert('Ви не зарегістровані')
				}
				}
				}else{
					alert('Only one comment')
				}
				
			},
			async sendData(){
						try{
							 await axios.post('http://demo8227522.mockable.io',
							 JSON.stringify({
								Rate: this.rate,
								Text:  this.state.userComment.commenting,
							})) .then(function (response) {
  							  console.log(response);
 						 });
						}catch(e){
							alert(e)
						}
			},
		}
		
	}
</script>

<style  scoped>
small{
		color: rgb(228, 59, 59);
		font-size: 14px;
	}
img{
	width: 400px;
	height: 400px;
}
span{
	font-weight: 500;
}
h4{
	color: rgb(36, 49, 163);
	font-size: 18px;
}
p{
	margin-top: 7px;
}

.product__rating{
	position: relative;
	font-size: 40px;
	display: inline-block;
}
.product__rating::before{
	content: "★★★★★";
	display: block;
}
.procuts__mark-items{
	position: absolute;
	width: 33.5%;
	height: 100%;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: row-reverse;
	overflow: hidden;
}
.procuts__mark-item{
	position: absolute;
	width: 0%;
	height: 0%;
	opacity: 0;
	visibility: hidden;
	top: 0;
	left: 0;
}
.procuts__mark-label{
	flex: 0 0 20%;
	height: 100%;
	cursor: pointer;
	color: grey;
	z-index: 2;

}
.procuts__mark-label::before{
	content: "★";
	display: block;
	transition: all 0.3s ease 0s;
}
.procuts__mark-item:checked,
.procuts__mark-item:checked ~ .procuts__mark-label{
	color: #00358b;
}

.procuts__mark-label:hover,
.procuts__mark-label:hover ~ .procuts__mark-label,
.procuts__mark-label:checked ~ .procuts__mark-label:hover{
	color: #00358b;
}
.input{
	display: flex;
	flex-direction: column;
}
.button{
	margin-top: 25px;
} 
.review{
	padding: 10px;
	border-radius: 5px;
	margin-top: 20px;
	border: 2px solid #002b70 ;
	max-width: 500px;
}
hr{
	border: 2px solid #2264D1;
	border-radius: 15px;
}
.product{
	width: 100%;
	max-width: 1440px;
	margin-top: 60px;
	position: absolute;
}
.product__side{
	margin-top: 35px;
	display: flex;
	justify-content: space-between;
}
.product__title{
	text-transform: uppercase;
	color: #08419c;
}
.product__input{
	margin-bottom: 10px;
	width: 500px;
	padding: 10px 15px;
	border: 2px solid #2264D1;
	border-radius: 5px;
}

</style>