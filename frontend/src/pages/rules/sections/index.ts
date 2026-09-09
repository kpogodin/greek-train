import verbToBe from './verbToBe'
import gender from './gender'
import plural from './plural'
import accusativeSingular from './accusativeSingular'
import accusativePlural from './accusativePlural'
import verbsA from './verbsA'
import type { RuleSection } from '../types'

// Add new rule sections here — each one gets its own file in this folder.
export const ruleSections: RuleSection[] = [
  verbToBe,
  gender,
  plural,
  accusativeSingular,
  accusativePlural,
  verbsA,
]

export type { RuleSection }
