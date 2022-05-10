<template>
	<div class="container">
    <div class="container__flex">
      <my-button class="center" @click="$router.push('/userPage')">GO TO THE SHOP</my-button>
    </div>
		<router-view :product = "product" :rewiew="rewiew"></router-view>
	</div>
</template>

<script>
import MyButton from './components/MyButton.vue';
import axios from 'axios';
	export default {
  components: { MyButton },
		data(){
		  return{
        product: '',
        rewiew: ''
	  	}
  	},
    methods:{
      	async fetchProducts(){
						try{
							const products = await axios.get('http://demo3043048.mockable.io/products');
              const rewiews = await axios.get('http://demo3043048.mockable.io/reviews');
              this.product = products;
              this.rewiew = rewiews.data;
						}catch(e){
							alert(e)
						}
			},
    },
    mounted(){
      this.fetchProducts();
    }
  }
</script>

<style >
	/* Указываем box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
  max-width: 100%;
  display: block;
}

/* Указываем понятную периодичность в потоке данных у article*/
article > * + * {
  margin-top: 1em;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

/* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
	@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600;800&family=Montserrat:wght@100;300;400;600;700&family=Open+Sans&family=Roboto:wght@300;400;500;700&display=swap');
	body{
		font-family: 'Fira Sans';
	}
  hr{
    background: #2264D1;
  }
		.container{
		margin: 0 auto;
		padding: 0 15px;
		max-width: 1440px;
	}
  .center{
    margin-top: 20px;
     display: flex;
     position: absolute;
     right: 45%;
  align-items: center;
  justify-content: center;
 
  }
</style>