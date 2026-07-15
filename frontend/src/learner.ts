const STORAGE_KEY = 'greek-train-learner'

export function getLearnerName(): string | null {
  return localStorage.getItem(STORAGE_KEY)
}

export function setLearnerName(name: string) {
  const trimmed = name.trim()
  if (trimmed) {
    localStorage.setItem(STORAGE_KEY, trimmed)
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}
