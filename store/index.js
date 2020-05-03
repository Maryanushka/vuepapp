export const state = () => ({
	news: [],
	// loading: false,
	category: '',
	country: 'us',
	// url: `/api/top-headlines?country=${country}&category=${category}`
})

export const mutations =  {
	setNews(state, news){
		state.news = news;
	},
	setCategory(state, category) {
		state.category = category;
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
	setCountry({ commit , dispatch }, country){
		commit('setCountry', country);
	}
}
export const getters =  {
	news: state => state.news,
	category: state => state.category,
	country: state => state.country
}