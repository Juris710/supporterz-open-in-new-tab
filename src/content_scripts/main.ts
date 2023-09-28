import { DATASET_ALREADY_ENABLED } from './constants';
import { enableActions } from './enable_actions';

const observer = new MutationObserver((mutations) => {
  const addedHTMLElements = mutations
    .map(({ addedNodes }) => Array.from(addedNodes))
    .flat()
    .filter(
      (addedNode): addedNode is HTMLElement => addedNode instanceof HTMLElement,
    )
    .filter(
      (addedHTMLElement) =>
        addedHTMLElement.dataset[DATASET_ALREADY_ENABLED] === undefined,
    );
  for (const action of enableActions) {
    action(addedHTMLElements);
  }
});

function main() {
  observer.observe(document.body, {
    attributes: false,
    subtree: true,
    childList: true,
  });
}

main();
