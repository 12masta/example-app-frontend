import { describe, expect, it } from '@jest/globals';
import { canSubmitArticleFavorite } from './own-article-favorite';

describe('canSubmitArticleFavorite', () => {
  it('does not submit when the viewer is the article author', () => {
    expect(canSubmitArticleFavorite('jane', 'jane')).toBe(false);
  });

  it('submits when the viewer is a different user', () => {
    expect(canSubmitArticleFavorite('jane', 'alex')).toBe(true);
  });

  it('submits when there is no signed-in viewer', () => {
    expect(canSubmitArticleFavorite(undefined, 'jane')).toBe(true);
  });
});
