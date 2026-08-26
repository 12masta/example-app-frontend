export const homePaths = {
  favoriteToggle: 'articles/:slug/favorite-toggle',
  followToggle: 'articles/:slug/follow-toggle',
  getFavoriteTogglePath: (slug: string) => `/articles/${slug}/favorite-toggle`,
  getFollowTogglePath: (slug: string) => `/articles/${slug}/follow-toggle`,
};
