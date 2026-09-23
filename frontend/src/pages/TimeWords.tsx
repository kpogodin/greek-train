import { useNavigate } from 'react-router-dom'

interface WordEntry {
  gr: string
  ru: string
}

function WordList({ words }: { words: WordEntry[] }) {
  return (
    <ul className="words-list">
      {words.map((word) => (
        <li key={word.gr}>
          <span className="word-greek">{word.gr}</span>
          <span className="word-ru">{word.ru}</span>
        </li>
      ))}
    </ul>
  )
}

function TimeWords() {
  const navigate = useNavigate()

  return (
    <div className="words-page">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <h1 className="rules-heading">Время</h1>

      <div className="standalone-content words-page-content">
        <p className="rule-note">Единицы времени, части суток, дни недели и месяцы.</p>

        <h2 className="rule-section-title">Единицы времени</h2>
        <WordList
          words={[
            { gr: 'το μικροδευτερόλεπτο', ru: 'микросекунда' },
            { gr: 'το δευτερόλεπτο', ru: 'секунда' },
            { gr: 'το λεπτό', ru: 'минута' },
            { gr: 'μισή ώρα', ru: 'полчаса' },
            { gr: 'η ώρα', ru: 'час' },
            { gr: 'η ημέρα', ru: 'день' },
            { gr: 'η εβδομάδα', ru: 'неделя' },
            { gr: 'ο μήνας', ru: 'месяц' },
            { gr: 'ο χρόνος / το έτος', ru: 'год' },
            { gr: 'η δεκαετία', ru: 'десятилетие' },
            { gr: 'ο αιώνας', ru: 'век' },
          ]}
        />
        <p className="rule-note">
          <strong>μικροδευτερόλεπτο</strong> — технический термин, в обычной речи почти не
          используется.
        </p>

        <h2 className="rule-section-title">Части суток</h2>
        <WordList
          words={[
            { gr: 'το πρωί', ru: 'утро' },
            { gr: 'π.μ.', ru: 'до полудня (сокращение)' },
            { gr: 'το μεσημέρι', ru: 'полдень' },
            { gr: 'το απόγευμα', ru: 'после полудня, день' },
            { gr: 'μ.μ.', ru: 'после полудня (сокращение)' },
            { gr: 'το βράδυ', ru: 'вечер' },
            { gr: 'η νύχτα', ru: 'ночь' },
          ]}
        />

        <h2 className="rule-section-title">Дни недели</h2>
        <WordList
          words={[
            { gr: 'η Δευτέρα', ru: 'понедельник' },
            { gr: 'η Τρίτη', ru: 'вторник' },
            { gr: 'η Τετάρτη', ru: 'среда' },
            { gr: 'η Πέμπτη', ru: 'четверг' },
            { gr: 'η Παρασκευή', ru: 'пятница' },
            { gr: 'το Σάββατο', ru: 'суббота' },
            { gr: 'η Κυριακή', ru: 'воскресенье' },
          ]}
        />

        <h2 className="rule-section-title">Месяцы</h2>
        <WordList
          words={[
            { gr: 'ο Ιανουάριος', ru: 'январь' },
            { gr: 'ο Φεβρουάριος', ru: 'февраль' },
            { gr: 'ο Μάρτιος', ru: 'март' },
            { gr: 'ο Απρίλιος', ru: 'апрель' },
            { gr: 'ο Μάιος', ru: 'май' },
            { gr: 'ο Ιούνιος', ru: 'июнь' },
            { gr: 'ο Ιούλιος', ru: 'июль' },
            { gr: 'ο Αύγουστος', ru: 'август' },
            { gr: 'ο Σεπτέμβριος', ru: 'сентябрь' },
            { gr: 'ο Οκτώβριος', ru: 'октябрь' },
            { gr: 'ο Νοέμβριος', ru: 'ноябрь' },
            { gr: 'ο Δεκέμβριος', ru: 'декабрь' },
          ]}
        />
      </div>
    </div>
  )
}

export default TimeWords
