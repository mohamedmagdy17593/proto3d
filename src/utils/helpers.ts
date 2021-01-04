export function isCmdOrCtrlPressed(e: KeyboardEvent) {
  return isMac() ? e.metaKey : e.ctrlKey;
}

export function isMac() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

export const commandKeyText = isMac() ? 'Cmd' : 'Ctrl';
