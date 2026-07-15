const STORAGE_KEY = 'greek-train-hide-hints'

export function getHideHints(): boolean {
  return localStorage.getItem(STORAGE_KEY) === '1'
}

export function setHideHints(value: boolean) {
  localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
}
