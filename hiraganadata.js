// Enhanced hiragana data with accented characters
const hiraganaData = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
};

// Difficulty-based word data
const wordData = {
    easy: {
        'あめ': { romaji: 'ame', english: 'rain' },
        'いぬ': { romaji: 'inu', english: 'dog' },
        'うみ': { romaji: 'umi', english: 'sea' },
        'えき': { romaji: 'eki', english: 'station' },
        'おちゃ': { romaji: 'ocha', english: 'tea' },
        'かお': { romaji: 'kao', english: 'face' },
        'き': { romaji: 'ki', english: 'tree' },
        'くち': { romaji: 'kuchi', english: 'mouth' },
        'け': { romaji: 'ke', english: 'hair' },
        'こえ': { romaji: 'koe', english: 'voice' },
        'さかな': { romaji: 'sakana', english: 'fish' },
        'そら': { romaji: 'sora', english: 'sky' },
        'て': { romaji: 'te', english: 'hand' },
        'なまえ': { romaji: 'namae', english: 'name' },
        'ほん': { romaji: 'hon', english: 'book' },
        'みず': { romaji: 'mizu', english: 'water' },
        'やま': { romaji: 'yama', english: 'mountain' },
        'よる': { romaji: 'yoru', english: 'night' },
        'わたし': { romaji: 'watashi', english: 'I' },
        'ひ': { romaji: 'hi', english: 'fire' }
    },
    normal: {
        'こんにちは': { romaji: 'konnichiwa', english: 'hello' },
        'ありがとう': { romaji: 'arigatou', english: 'thank you' },
        'おはよう': { romaji: 'ohayou', english: 'good morning' },
        'さようなら': { romaji: 'sayounara', english: 'goodbye' },
        'すみません': { romaji: 'sumimasen', english: 'excuse me' },
        'がっこう': { romaji: 'gakkou', english: 'school' },
        'しごと': { romaji: 'shigoto', english: 'work' },
        'でんわ': { romaji: 'denwa', english: 'telephone' },
        'くるま': { romaji: 'kuruma', english: 'car' },
        'たべもの': { romaji: 'tabemono', english: 'food' },
        'ともだち': { romaji: 'tomodachi', english: 'friend' },
        'かぞく': { romaji: 'kazoku', english: 'family' },
        'びょういん': { romaji: 'byouin', english: 'hospital' },
        'ぎんこう': { romaji: 'ginkou', english: 'bank' },
        'でんしゃ': { romaji: 'densha', english: 'train' },
        'ひこうき': { romaji: 'hikouki', english: 'airplane' },
        'しんぶん': { romaji: 'shinbun', english: 'newspaper' },
        'てがみ': { romaji: 'tegami', english: 'letter' },
        'じかん': { romaji: 'jikan', english: 'time' },
        'ばんごはん': { romaji: 'bangohan', english: 'dinner' }
    },
    hard: {
        'はじめまして': { romaji: 'hajimemashite', english: 'nice to meet you' },
        'いただきます': { romaji: 'itadakimasu', english: 'before eating' },
        'ごちそうさま': { romaji: 'gochisousama', english: 'after eating' },
        'おつかれさま': { romaji: 'otsukaresama', english: 'good work' },
        'しつれいします': { romaji: 'shitsurei shimasu', english: 'excuse me' },
        'だいがく': { romaji: 'daigaku', english: 'university' },
        'としょかん': { romaji: 'toshokan', english: 'library' },
        'びじゅつかん': { romaji: 'bijutsukan', english: 'art museum' },
        'きょうしつ': { romaji: 'kyoushitsu', english: 'classroom' },
        'せんせい': { romaji: 'sensei', english: 'teacher' },
        'がくせい': { romaji: 'gakusei', english: 'student' },
        'しゅくだい': { romaji: 'shukudai', english: 'homework' },
        'しけん': { romaji: 'shiken', english: 'exam' },
        'けんきゅう': { romaji: 'kenkyuu', english: 'research' },
        'かいぎ': { romaji: 'kaigi', english: 'meeting' },
        'やくそく': { romaji: 'yakusoku', english: 'promise' },
        'しんぱい': { romaji: 'shinpai', english: 'worry' },
        'あんぜん': { romaji: 'anzen', english: 'safety' },
        'けいけん': { romaji: 'keiken', english: 'experience' },
        'もんだい': { romaji: 'mondai', english: 'problem' }
    }
};

// Extreme difficulty - sentence templates
const extremeTemplates = [
    { template: 'わたしは{noun}が{adjective}です', romaji: 'watashi wa {noun} ga {adjective} desu', english: 'I am {adjective} {noun}' },
    { template: 'きょうは{weather}です', romaji: 'kyou wa {weather} desu', english: 'today is {weather}' },
    { template: '{person}は{place}に{verb}ます', romaji: '{person} wa {place} ni {verb} masu', english: '{person} {verb} to {place}' },
    { template: 'わたしは{time}に{activity}をします', romaji: 'watashi wa {time} ni {activity} wo shimasu', english: 'I do {activity} at {time}' },
    { template: '{noun}は{color}です', romaji: '{noun} wa {color} desu', english: '{noun} is {color}' }
];

const extremeWords = {
    noun: ['ねこ', 'いぬ', 'ほん', 'くるま', 'がっこう'],
    adjective: ['すき', 'きれい', 'おおきい', 'ちいさい', 'あたらしい'],
    weather: ['あめ', 'ゆき', 'はれ', 'くもり', 'かぜ'],
    person: ['ともだち', 'せんせい', 'かぞく', 'がくせい', 'ひと'],
    place: ['がっこう', 'いえ', 'えき', 'びょういん', 'みせ'],
    verb: ['いき', 'き', 'かえり', 'はしり', 'あるき'],
    time: ['あさ', 'ひる', 'よる', 'はちじ', 'くじ'],
    activity: ['べんきょう', 'しごと', 'りょうり', 'そうじ', 'うんどう'],
    color: ['あか', 'あお', 'きいろ', 'みどり', 'しろ']
};