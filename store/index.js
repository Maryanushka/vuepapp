import md5 from "md5";
import db from "~/plugins/firestore";

export const state = () => ({
	news: [],
	loading: false,
	category: '',
	country: 'us',
	token: '',
	user: null,
})

export const mutations =  {
	setNews(state, news){
		state.news = news;
	},
	setCategory(state, category) {
		state.category = category;
	},
	setLoading(state, loading) {
		state.loading = loading;
	},
	setUser(state, user) {
		state.user = user;
	},
	setToken(state, token) {
		state.token = token;
	},
	setCountry(state, country) {
		state.country = country;
	},
}
export const actions = {
	async loadNews({ commit }, url) {
		const { articles } = await this.$axios.$get(url);
		commit('setNews', articles);
		
	},
	setCategory({ commit , dispatch }, category){
		commit('setCategory', category);
	},
	setLoading({ commit , dispatch }, loading){
		commit('setLoading', loading);
	},
	setCountry({ commit , dispatch }, country){
		commit('setCountry', country);
	},
	async authenticateUser({ commit }, userAuth){
		try {
			commit("setLoading", true);
			const authUserData = await this.$axios.$post(`/${ userAuth.action }/`, userAuth);
			let user;
			if (userAuth.action === "register") {
				const avatar = `http://gravatar.com/avatar/${ md5(userAuth.email) }?d=identicon`;
				user = { email: userAuth.email, avatar };
				await db
					.collection("users")
					.doc(userAuth.email)
					.set(user);
			} else {
				const loginRef = db.collection("users").doc(userAuth.email);
				const loggedInUser = await loginRef.get();
				user = loggedInUser.data();
			}
			commit("setUser", user);
			commit("setToken", authUserData.idToken);
			commit("setLoading", false);
		} catch (err) {
			console.error(err);
			commit("setLoading", false);
		}
	}
}
export const getters =  {
	news: state => state.news,
	loading: state => state.loading,
	user: state => state.user,
	isAuthenticated: state => !!state.token,
	category: state => state.category,
	country: state => state.country
}