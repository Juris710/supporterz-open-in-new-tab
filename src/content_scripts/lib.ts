export function replaceTag<K extends keyof HTMLElementTagNameMap>(
  element: HTMLElement,
  tag: K,
) {
  const parent = element.parentElement;
  if (!parent)
    throw new Error('Unexpected error: the element do not have its parent.');

  const newElement = document.createElement(tag);
  newElement.innerHTML = element.innerHTML;
  for (const attribute of element.attributes) {
    newElement.setAttribute(attribute.name, attribute.value);
  }
  newElement.style.cssText = element.style.cssText;
  parent.replaceChild(newElement, element);
  return newElement;
}
