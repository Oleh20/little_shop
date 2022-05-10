<template>
	<div>
		<button>
			<slot></slot>
		</button>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style  scoped>
	button{
		transition: all 0.3s ease 0s;
		cursor: pointer;
		color: #2264D1;
		font-style: bold;
		font-size: 20px;
		line-height: 30px;
		align-items: center;
		letter-spacing: 0.75%;
		background: #FFFFFF;
		border-color: #2264D1;
		border-radius: 4px;
	}
	button:hover{
		box-shadow: 0px 2px 4px rgba(27, 78, 163, 0.2), 0px 4px 8px rgba(41, 121, 255, 0.2);
	}
</style>