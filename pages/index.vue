<template>
    <div class="md-layout md-alignment-center">
			    <!-- Top Navigation -->
					<md-toolbar class="fixed-toolbar" elevation="1">
						<md-button class="md-icon-button md-accent" @click="showRightSidepanel = true">
							<md-icon>menu</md-icon>
						</md-button>
						<nuxt-link class="md-primary md-title" to="/">
							NuxtNews
						</nuxt-link>

						<div class="md-toolbar-section-end">
							<md-button class="md-accent" to="/login">Login</md-button>
							<md-button class="md-accent" to="/register">Register</md-button>
							<md-button class="md-accent" @click="showLeftSidepanel = true">Categories</md-button>
						</div>
					</md-toolbar>

					<!-- News Categories (Left Drawer) -->
					<md-drawer class="md-right" md-fixed :md-active.sync="showLeftSidepanel">
						<md-toolbar :md-elevation="1">
							<span class="md-title">News Categories</span>
						</md-toolbar>
						<md-subheader class="md-primary">Categories</md-subheader>
						<md-list>
							<md-list-item v-for="(newsCategory, i) in newsCategories" :key="i" @click="loadCategory(newsCategory.path)">
								<md-icon :class="newsCategory.path === category ? 'md-primary' : ''">{{newsCategory.icon}}</md-icon>
								<span class="md-list-item-text">{{newsCategory.name}}</span>
							</md-list-item>
						</md-list>
					</md-drawer>

					<!-- Country filter (Right Drawer) -->
					<md-drawer class="md-left" md-fixed :md-active.sync="showRightSidepanel">
						<md-toolbar :md-elevation="1">
							<span class="md-title">Country</span>
						</md-toolbar>
						<md-subheader class="md-primary">Country</md-subheader>

						 <md-field>
							<label for="country">Country</label>
							<md-select name="country" id="movie" @input="changeCountry">
								<md-option v-for="(c, i ) in countries" :key="i" :value="c.value">{{ c.name }}</md-option>
							</md-select>
						</md-field>
					</md-drawer>

        <!-- App Content -->
        <div class="md-layout-item md-size-95">
            <md-content class="md-layout md-gutter" style="padding: 1em;">
                <ul v-for="h in news" :key="h.id" class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-card style="margin-top: 1em;" md-with-hover>
                        <md-ripple>
                            <md-card-media md-ratio="16:9">
                                <img v-if="h.urlToImage !== null" :src="h.urlToImage" :alt="h.title" />
                                <img v-else src="https://cdn.vox-cdn.com/thumbor/1kKyzwmocR6pu9ijSIl_l1XP0PY=/0x0:1280x720/1200x675/filters:focal(470x259:674x463)/cdn.vox-cdn.com/uploads/chorus_image/image/58089103/r_m_sauce.0.jpg" :alt="h.title" />
                            </md-card-media>
 
                            <md-card-header>
                                <div class="md-title">
                                    <a :href="h.url" target="_blank">{{ h.title }}</a>
                                </div>
                                <div>
                                    {{ h.source.name }}
                                    <md-icon class="small-icon">
                                        book
                                    </md-icon>
                                </div>
                                <div v-if="h.author" class="md-subhead author">
                                    {{ h.author }}
                                    <md-icon class="small-icon">
                                        face
                                    </md-icon>
                                </div>
                                <div v-else class="md-subhead author">
                                   No author
                                    <md-icon class="small-icon">
                                        face
                                    </md-icon>
                                </div>
                                <div class="md-subhead">
                                    {{ h.publishedAt }}
                                    <md-icon class="small-icon">
                                        alarm
                                    </md-icon>
                                </div>
                            </md-card-header>
														 <md-card-expand>
																<md-card-actions md-alignment="space-between">
																	<div>
																	  <md-button class="md-icon-button md-primary">
                                    <md-icon>bookmark</md-icon>
																	</md-button>
																	<md-button class="md-icon-button md-primary">
																			<md-icon>message</md-icon>
																	</md-button>
																	</div>

																	<md-card-expand-trigger>
																		<md-button class="md-icon-button md-primary">
																			<md-icon>keyboard_arrow_down</md-icon>
																		</md-button>
																	</md-card-expand-trigger>
																</md-card-actions>

																<md-card-expand-content>
																	<md-card-content>
																		{{ h.description }}
																	</md-card-content>
																</md-card-expand-content>
															</md-card-expand>

                        </md-ripple>
                    </md-card>
                </ul>
            </md-content>
        </div>
    </div>
</template>
 
<script>
export default {
	data: () => ({
    showLeftSidepanel: false,
    showRightSidepanel: false,
    newsCategories: [
      { name: 'Top Headlines', path: '', icon: 'today' },
      { name: 'Technology', path: 'technology', icon: 'keyboard' },
      { name: 'Business', path: 'business', icon: 'business_center' },
      { name: 'Entertainment', path: 'entertainment', icon: 'weekend' },
      { name: 'Health', path: 'health', icon: 'fastfood' },
      { name: 'Science', path: 'science', icon: 'fingerprint' },
      { name: 'Sports', path: 'sports', icon: 'golf_course' }
		],
		countries: [
			{name: 'Unated States', value: 'us'},
			{name: 'Canada', value: 'ca'},
			{name: 'Russia', value: 'ru'},
		]
  }),
  async fetch({ store }) {
      await store.dispatch("loadNews", `/api/top-headlines?country=${store.state.country}&category=${store.state.category}`);
	},
	computed: {
		news(){
			return this.$store.getters.news;
		},
		category() {
      return this.$store.getters.category;
    },
		country() {
      return this.$store.getters.country;
    },
	},
	methods: {
    async loadCategory(category) {
			this.$store.dispatch('setCategory', category);
			await this.$store.dispatch("loadNews", `/api/top-headlines?country=${this.country}&category=${this.category}`);
    },
    async changeCountry(country) {
			this.$store.dispatch('setCountry', country);
			await this.$store.dispatch("loadNews", `/api/top-headlines?country=${this.country}&category=${this.category}`);
    }
  }
}
</script>
 
<style scoped>
.small-icon {
    font-size: 18px !important;
}
.fixed-toolbar {
  position: fixed;
  top: 0;
  z-index: 5;
}
.md-layout{
	margin: 2rem 0;
}
.md-card .md-title a{
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>