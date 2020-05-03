export const state = () => ({
	news: [],
	// loading: false,
	category: ''
})

export const mutations =  {
	setNews(state, news){
		state.news = news;
	},
	// setLoading(state, loading) {
	// 	state.loading = loading;
	// },
	setCategory(state, category) {
		state.category = category;
	},
}
export const actions = {
	async loadNews({ commit }, url) {
		// commit('setLoading', true);
		const { articles } = await this.$axios.$get(url);
		// commit('setLoading', false);
		commit('setNews', articles);
	},
}
export const getters =  {
	news: state => state.news,
	// loading: state => state.loading,
	category: state => state.category
}