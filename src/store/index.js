import { createStore } from "vuex"
export default createStore({
	state: {
		userInfo: {
			name: '',
			pass: '',
			email: '',
		},
		permission: false,
		show: true,
	},
	mutations: {
		updateUserInfo(state, payload) {
			state.userInfo = payload
		},
		changePermission(state, payload) {
			state.permission = payload
		},
		showForm(state, payload) {
			state.show = payload
		}
	}
})