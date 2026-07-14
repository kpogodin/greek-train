import 'dotenv/config'
import { prisma } from './prisma.js'

// Difficulty is a proxy for "how close does this word look/sound to its
// Russian translation" — many Greek words are international/loan words
// (τηλέφωνο, πρόγραμμα, ταξί) that a Russian speaker can guess almost for
// free, while native Greek vocabulary shares no roots with Russian at all.
// We approximate that by transliterating both sides to a comparable Latin
// skeleton and measuring edit distance, then bucket the whole vocabulary
// into 5 equal-sized groups (quintiles) so each difficulty button has a
// similarly sized pool to draw from.

const GREEK_LEADING_ARTICLES = new Set(['ο', 'η', 'το', 'οι', 'τα', 'του', 'της', 'των'])

const GREEK_MAP: Record<string, string> = {
  α: 'a', β: 'v', γ: 'g', δ: 'd', ε: 'e', ζ: 'z', η: 'i', θ: 'th',
  ι: 'i', κ: 'k', λ: 'l', μ: 'm', ν: 'n', ξ: 'x', ο: 'o', π: 'p',
  ρ: 'r', σ: 's', ς: 's', τ: 't', υ: 'i', φ: 'f', χ: 'h', ψ: 'ps', ω: 'o',
}

const RUSSIAN_MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
  з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
  п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

function transliterate(text: string, map: Record<string, string>) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip Greek tonos / other diacritics
    .split('')
    .map((ch) => map[ch] ?? (/[a-z]/.test(ch) ? ch : ''))
    .join('')
}

function greekSkeleton(form: string) {
  const tokens = form.trim().split(/\s+/)
  const withoutArticle =
    tokens.length > 1 && GREEK_LEADING_ARTICLES.has(tokens[0].toLowerCase())
      ? tokens.slice(1)
      : tokens
  return transliterate(withoutArticle.join(''), GREEK_MAP)
}

function russianSkeleton(translation: string) {
  const firstAlternative = translation.split(/[/;]/)[0]
  const withoutParens = firstAlternative.replace(/\([^)]*\)/g, '')
  return transliterate(withoutParens.replace(/[^а-яё\s]/gi, ''), RUSSIAN_MAP)
}

function levenshtein(a: string, b: string) {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[a.length][b.length]
}

function similarityDistance(greek: string, russian: string) {
  if (!greek || !russian) return 1
  return levenshtein(greek, russian) / Math.max(greek.length, russian.length)
}

async function main() {
  const words = await prisma.word.findMany({ include: { forms: true } })

  const scored = words.map((word) => {
    const greek = greekSkeleton(word.forms[0]?.form ?? '')
    const russian = russianSkeleton(word.translationRu)
    return { id: word.id, distance: similarityDistance(greek, russian) }
  })

  scored.sort((a, b) => a.distance - b.distance)

  const bucketSize = Math.ceil(scored.length / 5)
  const updates = scored.map((entry, index) => ({
    id: entry.id,
    difficulty: Math.min(5, Math.floor(index / bucketSize) + 1),
  }))

  for (const { id, difficulty } of updates) {
    await prisma.word.update({ where: { id }, data: { difficulty } })
  }

  const counts = [1, 2, 3, 4, 5].map(
    (d) => updates.filter((u) => u.difficulty === d).length,
  )
  console.log(`Assigned difficulty to ${updates.length} words:`, counts)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
