export const state = () => ({
	news: [],
	loading: false,
	category: '',
	country: 'us',
	token: ''
	// url: `/api/top-headlines?country=${country}&category=${category}`
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
			const authUserData = await this.$axios.$post(
				"/register/",
				userAuth
			);
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
	isAuthenticated: state => !!state.token,
	category: state => state.category,
	country: state => state.country
}