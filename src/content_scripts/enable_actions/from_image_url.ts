import { DATASET_ALREADY_ENABLED } from '../constants';
import { replaceTag } from '../lib';

export function enableFromImageUrl(addedHTMLElements: HTMLElement[]) {
  const imageElements = addedHTMLElements
    .map((addedHTMLElement) =>
      Array.from(addedHTMLElement.querySelectorAll('div.img>div')),
    )
    .flat();
  for (const imageElement of imageElements) {
    const clickTargetElement =
      imageElement.closest('button') ??
      imageElement.parentElement?.parentElement;
    if (!clickTargetElement) continue;
    const backgroundImageURL =
      getComputedStyle(imageElement)['backgroundImage'];
    const eventId = backgroundImageURL.replace(
      /^url\("https:\/\/.+\/(.+)"\)$/,
      '$1',
    );
    if (backgroundImageURL === eventId) continue;
    const link = replaceTag(clickTargetElement, 'a');
    link.dataset[DATASET_ALREADY_ENABLED] = 'true';
    link.setAttribute(
      'href',
      `https://talent.supporterz.jp/events/${eventId}/`,
    );
    link.style.textDecoration = 'none';
    link.style.color = 'unset';
  }
}
