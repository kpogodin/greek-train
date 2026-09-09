import verbToBe from './verbToBe'
import gender from './gender'
import type { RuleSection } from '../types'

// Add new rule sections here — each one gets its own file in this folder.
export const ruleSections: RuleSection[] = [verbToBe, gender]

export type { RuleSection }
