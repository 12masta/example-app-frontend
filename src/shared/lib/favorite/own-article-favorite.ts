export function canSubmitArticleFavorite(viewerUsername: string | undefined, authorUsername: string): boolean {
  return viewerUsername !== authorUsername;
}
