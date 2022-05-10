<template>
	<div class="check__in" v-if="show && this.$store.state.show" @click="hideWindow">
		<div @click.stop class="check__in-content">
		
			<slot ></slot>
		</div>
	</div>
</template>

<script>
import MyButton from './MyButton.vue';
	export default {
  components: { MyButton },
		name: 'my-checkIn',
		props:{
			show:{
				type: Boolean,
				default: false
			}
		},
		methods:{
			hideWindow(){
				this.$emit('update:show', false)
			}
			
		}
	}
</script>

<style  scoped>
.check__in{
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.65);
}
.check__in-content{
	margin: auto;
	background: white;
	border-radius: 12px;
	min-height: 50px;
	width: 600px;
	padding: 20px;
}
</style>