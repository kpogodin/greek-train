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

function Numbers() {
  const navigate = useNavigate()

  return (
    <div className="words-page">
      <button type="button" className="back-btn" onClick={() => navigate('/')}>
        ← Меню
      </button>
      <h1 className="rules-heading">Числа</h1>

      <div className="standalone-content words-page-content">
        <p className="rule-note">Счёт от 0 до миллиарда — с пояснениями, как числа складываются друг из друга.</p>

        <h2 className="rule-section-title">0–10</h2>
        <WordList
          words={[
            { gr: 'μηδέν', ru: '0' },
            { gr: 'ένα', ru: '1' },
            { gr: 'δύο', ru: '2' },
            { gr: 'τρία', ru: '3' },
            { gr: 'τέσσερα', ru: '4' },
            { gr: 'πέντε', ru: '5' },
            { gr: 'έξι', ru: '6' },
            { gr: 'επτά', ru: '7' },
            { gr: 'οχτώ', ru: '8' },
            { gr: 'εννιά', ru: '9' },
            { gr: 'δέκα', ru: '10' },
          ]}
        />
        <p className="rule-callout">
          <strong>1, 3, 4</strong> меняются по роду существительного: <strong>ένας/μία/ένα</strong>,{' '}
          <strong>τρεις/τρία</strong>, <strong>τέσσερις/τέσσερα</strong> (ένας άντρας, μία γυναίκα,
          ένα παιδί). Остальные числа не меняются.
        </p>
        <p className="rule-note">
          7, 8, 9 также говорят <strong>εφτά, οχτώ, εννιά</strong> — более разговорный вариант.
        </p>

        <h2 className="rule-section-title">11–19</h2>
        <WordList
          words={[
            { gr: 'έντεκα', ru: '11' },
            { gr: 'δώδεκα', ru: '12' },
            { gr: 'δεκατρία', ru: '13' },
            { gr: 'δεκατέσσερα', ru: '14' },
            { gr: 'δεκαπέντε', ru: '15' },
            { gr: 'δεκαέξι', ru: '16' },
            { gr: 'δεκαεπτά', ru: '17' },
            { gr: 'δεκαοχτώ', ru: '18' },
            { gr: 'δεκαεννιά', ru: '19' },
          ]}
        />
        <p className="rule-callout">
          <strong>11</strong> и <strong>12</strong> — отдельные слова, не «δέκα + один/два». А вот с{' '}
          <strong>13</strong> начинается простая схема: <strong>δέκα</strong> + число (δεκα-τρία,
          δεκα-τέσσερα...).
        </p>

        <h2 className="rule-section-title">20–90</h2>
        <WordList
          words={[
            { gr: 'είκοσι', ru: '20' },
            { gr: 'τριάντα', ru: '30' },
            { gr: 'σαράντα', ru: '40' },
            { gr: 'πενήντα', ru: '50' },
            { gr: 'εξήντα', ru: '60' },
            { gr: 'εβδομήντα', ru: '70' },
            { gr: 'ογδόντα', ru: '80' },
            { gr: 'ενενήντα', ru: '90' },
          ]}
        />
        <p className="rule-note">Как складывается первое число каждого десятка (десяток + 1):</p>
        <WordList
          words={[
            { gr: 'είκοσι ένα', ru: '21' },
            { gr: 'τριάντα ένα', ru: '31' },
            { gr: 'σαράντα ένα', ru: '41' },
            { gr: 'πενήντα ένα', ru: '51' },
            { gr: 'εξήντα ένα', ru: '61' },
            { gr: 'εβδομήντα ένα', ru: '71' },
            { gr: 'ογδόντα ένα', ru: '81' },
            { gr: 'ενενήντα ένα', ru: '91' },
          ]}
        />
        <p className="rule-callout">
          Союз «и» между десятками и единицами не нужен: 21 — это просто{' '}
          <strong>είκοσι ένα</strong>, а не «είκοσι και ένα».
        </p>

        <h2 className="rule-section-title">Сотни и до тысячи</h2>
        <WordList
          words={[
            { gr: 'εκατό', ru: '100' },
            { gr: 'διακόσια', ru: '200' },
            { gr: 'τριακόσια', ru: '300' },
            { gr: 'τετρακόσια', ru: '400' },
            { gr: 'πεντακόσια', ru: '500' },
            { gr: 'εξακόσια', ru: '600' },
            { gr: 'επτακόσια', ru: '700' },
            { gr: 'οχτακόσια', ru: '800' },
            { gr: 'εννιακόσια', ru: '900' },
            { gr: 'χίλια', ru: '1 000' },
          ]}
        />
        <p className="rule-callout">
          <strong>εκατό</strong> (100) не меняется по родам, а вот 200–900 меняются, как
          прилагательные: <strong>διακόσιοι/διακόσιες/διακόσια</strong> (м/ж/ср).
        </p>
        <p className="rule-callout">
          <strong>χίλια</strong> (1000) — тоже отдельное слово. Начиная с 2000 используется
          существительное <strong>χιλιάδες</strong> (тысячи), а число перед ним стоит в женском
          роде: <strong>δύο χιλιάδες</strong> (2000), <strong>τρεις χιλιάδες</strong> (3000),{' '}
          <strong>οκτακόσιες χιλιάδες</strong> (800 000).
        </p>

        <h2 className="rule-section-title">Миллион и миллиард</h2>
        <WordList
          words={[
            { gr: 'ένα εκατομμύριο', ru: '1 000 000' },
            { gr: 'ένα δισεκατομμύριο', ru: '1 000 000 000' },
          ]}
        />

        <h2 className="rule-section-title">Огромный пример</h2>
        <p className="rule-note">3 847 529 — собираем всё вместе:</p>
        <p className="rule-callout">
          <strong>
            τρία εκατομμύρια οκτακόσιες σαράντα επτά χιλιάδες πεντακόσια είκοσι εννιά
          </strong>
          <br />
          τρία εκατομμύρια (3 000 000) + οκτακόσιες σαράντα επτά χιλιάδες (847 000) + πεντακόσια
          είκοσι εννιά (529).
        </p>
      </div>
    </div>
  )
}

export default Numbers
