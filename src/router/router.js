
import UserPage from "@/pages/UserPage"
import Product1 from "@/pages/Product1"
import Product2 from "@/pages/Product2"
import { createRouter, createWebHistory } from "vue-router"
const routes = [
	{
		path: '/userPage',
		component: UserPage
	}, {
		path: '/product/1',
		component: Product1
	}, {
		path: '/product/2',
		component: Product2
	}
]
const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL)
})
export default router;