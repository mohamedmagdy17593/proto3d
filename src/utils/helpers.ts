export function isCmdOrCtrlPressed(e: KeyboardEvent) {
  return isMac() ? e.metaKey : e.ctrlKey;
}

export function isMac() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export const commandKeyText = isMac() ? 'Cmd' : 'Ctrl';

export const SCROLL_BAR_WIDTH = getScrollbarWidth();

export function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  // @ts-expect-error
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

export function isScrollable(element: Element) {
  return (
    element.scrollWidth > element.clientWidth ||
    element.scrollHeight > element.clientHeight
  );
}

export function wait(timeout: number) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
