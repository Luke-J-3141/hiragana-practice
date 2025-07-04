// Enhanced hiragana data with accented characters
const hiraganaData = {
    //  a            i           u            e            o
    'あ': 'a',   'い': 'i',   'う': 'u',   'え': 'e',   'お': 'o',
    //  k-series
    'か': 'ka',  'き': 'ki',  'く': 'ku',  'け': 'ke',  'こ': 'ko',
    'が': 'ga',  'ぎ': 'gi',  'ぐ': 'gu',  'げ': 'ge',  'ご': 'go',
    //  s-series
    'さ': 'sa',  'し': 'shi', 'す': 'su',  'せ': 'se',  'そ': 'so',
    'ざ': 'za',  'じ': 'ji',  'ず': 'zu',  'ぜ': 'ze',  'ぞ': 'zo',
    //  t-series
    'た': 'ta',  'ち': 'chi', 'つ': 'tsu', 'て': 'te',  'と': 'to',
    'だ': 'da',  'ぢ': 'ji',  'づ': 'zu',  'で': 'de',  'ど': 'do',
    //  n-series
    'な': 'na',  'に': 'ni',  'ぬ': 'nu',  'ね': 'ne',  'の': 'no',
    //  h-series
    'は': 'ha',  'ひ': 'hi',  'ふ': 'fu',  'へ': 'he',  'ほ': 'ho',
    'ば': 'ba',  'び': 'bi',  'ぶ': 'bu',  'べ': 'be',  'ぼ': 'bo',
    'ぱ': 'pa',  'ぴ': 'pi',  'ぷ': 'pu',  'ぺ': 'pe',  'ぽ': 'po',
    //  m-series
    'ま': 'ma',  'み': 'mi',  'む': 'mu',  'め': 'me',  'も': 'mo',
    //  y-series
    'や': 'ya',               'ゆ': 'yu',               'よ': 'yo',
    //  r-series
    'ら': 'ra',  'り': 'ri',  'る': 'ru',  'れ': 're',  'ろ': 'ro',
    'わ': 'wa',                            'を': 'wo',
    'ん': 'n',

    // Yoon (contracted sounds)
    'きゃ': 'kya',          'きゅ': 'kyu',             'きょ': 'kyo',
    'しゃ': 'sha',          'しゅ': 'shu',             'しょ': 'sho',
    'ちゃ': 'cha',          'ちゅ': 'chu',             'ちょ': 'cho',
    'にゃ': 'nya',          'にゅ': 'nyu',             'にょ': 'nyo',
    'ひゃ': 'hya',          'ひゅ': 'hyu',             'ひょ': 'hyo',
    'みゃ': 'mya',          'みゅ': 'myu',             'みょ': 'myo',
    'りゃ': 'rya',          'りゅ': 'ryu',             'りょ': 'ryo',
    'ぎゃ': 'gya',          'ぎゅ': 'gyu',             'ぎょ': 'gyo',
    'じゃ': 'ja',           'じゅ': 'ju',              'じょ': 'jo',
    'びゃ': 'bya',          'びゅ': 'byu',             'びょ': 'byo',
    'ぴゃ': 'pya',          'ぴゅ': 'pyu',             'ぴょ': 'pyo'
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
        'ひ': { romaji: 'hi', english: 'fire' },
        // New easy words
        'ねこ': { romaji: 'neko', english: 'cat' },
        'あさ': { romaji: 'asa', english: 'morning' },
        'ひる': { romaji: 'hiru', english: 'noon' },
        'つき': { romaji: 'tsuki', english: 'moon' },
        'はな': { romaji: 'hana', english: 'flower' },
        'め': { romaji: 'me', english: 'eye' },
        'みみ': { romaji: 'mimi', english: 'ear' },
        'あし': { romaji: 'ashi', english: 'foot/leg' },
        'いえ': { romaji: 'ie', english: 'house' },
        'とり': { romaji: 'tori', english: 'bird' },
        'かぜ': { romaji: 'kaze', english: 'wind' },
        'ゆき': { romaji: 'yuki', english: 'snow' },
        'はる': { romaji: 'haru', english: 'spring' },
        'なつ': { romaji: 'natsu', english: 'summer' },
        'あき': { romaji: 'aki', english: 'autumn' },
        'ふゆ': { romaji: 'fuyu', english: 'winter' },
        'くも': { romaji: 'kumo', english: 'cloud' },
        'いし': { romaji: 'ishi', english: 'stone' },
        'かわ': { romaji: 'kawa', english: 'river' },
        'はし': { romaji: 'hashi', english: 'bridge' },
        'みち': { romaji: 'michi', english: 'road' },
        'まち': { romaji: 'machi', english: 'town' },
        'ドア': { romaji: 'doa', english: 'door' },
        'まど': { romaji: 'mado', english: 'window' },
        'つくえ': { romaji: 'tsukue', english: 'desk' },
        'いす': { romaji: 'isu', english: 'chair' },
        'かみ': { romaji: 'kami', english: 'paper' },
        'ペン': { romaji: 'pen', english: 'pen' },
        'はこ': { romaji: 'hako', english: 'box' },
        'かばん': { romaji: 'kaban', english: 'bag' }
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
        'ばんごはん': { romaji: 'bangohan', english: 'dinner' },
        // New normal words
        'あさごはん': { romaji: 'asagohan', english: 'breakfast' },
        'ひるごはん': { romaji: 'hirugohan', english: 'lunch' },
        'りょうり': { romaji: 'ryouri', english: 'cooking' },
        'みせ': { romaji: 'mise', english: 'shop' },
        'おかね': { romaji: 'okane', english: 'money' },
        'しゅみ': { romaji: 'shumi', english: 'hobby' },
        'すぽーつ': { romaji: 'supootsu', english: 'sports' },
        'おんがく': { romaji: 'ongaku', english: 'music' },
        'えいが': { romaji: 'eiga', english: 'movie' },
        'てれび': { romaji: 'terebi', english: 'television' },
        'でんき': { romaji: 'denki', english: 'electricity' },
        'せんたく': { romaji: 'sentaku', english: 'laundry' },
        'そうじ': { romaji: 'souji', english: 'cleaning' },
        'かいもの': { romaji: 'kaimono', english: 'shopping' },
        'りょこう': { romaji: 'ryokou', english: 'travel' },
        'やすみ': { romaji: 'yasumi', english: 'rest/holiday' },
        'しゅっしん': { romaji: 'shusshin', english: 'hometown' },
        'くに': { romaji: 'kuni', english: 'country' },
        'げんき': { romaji: 'genki', english: 'healthy/energetic' },
        'びょうき': { romaji: 'byouki', english: 'illness' },
        'くすり': { romaji: 'kusuri', english: 'medicine' },
        'いしゃ': { romaji: 'isha', english: 'doctor' },
        'きんようび': { romaji: 'kinyoubi', english: 'Friday' },
        'どようび': { romaji: 'doyoubi', english: 'Saturday' },
        'にちようび': { romaji: 'nichiyoubi', english: 'Sunday' },
        'せんしゅう': { romaji: 'senshuu', english: 'last week' },
        'らいしゅう': { romaji: 'raishuu', english: 'next week' },
        'きょう': { romaji: 'kyou', english: 'today' },
        'きのう': { romaji: 'kinou', english: 'yesterday' },
        'あした': { romaji: 'ashita', english: 'tomorrow' },
        'てんき': { romaji: 'tenki', english: 'weather' },
        'あつい': { romaji: 'atsui', english: 'hot' },
        'さむい': { romaji: 'samui', english: 'cold' },
        'あたたかい': { romaji: 'atatakai', english: 'warm' },
        'すずしい': { romaji: 'suzushii', english: 'cool' },
        'おもしろい': { romaji: 'omoshiroi', english: 'interesting' },
        'たのしい': { romaji: 'tanoshii', english: 'fun' },
        'むずかしい': { romaji: 'muzukashii', english: 'difficult' },
        'やさしい': { romaji: 'yasashii', english: 'easy/kind' },
        'あたらしい': { romaji: 'atarashii', english: 'new' },
        'ふるい': { romaji: 'furui', english: 'old' }
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

// Example extreme templates for sentence generation
const extremeTemplates = [
    {
        template: 'わたしは{place}で{activity}をします。',
        romaji: 'watashi wa {place} de {activity} wo shimasu.',
        english: 'I {activity} at {place}.'
    },
    {
        template: '{time}に{food}を食べます。',
        romaji: '{time} ni {food} wo tabemasu.',
        english: 'I eat {food} at {time}.'
    },
    {
        template: '{weather}の日は{activity}をしません。',
        romaji: '{weather} no hi wa {activity} wo shimasen.',
        english: 'I don\'t {activity} on {weather} days.'
    },
    {
        template: '{person}と{place}に行きます。',
        romaji: '{person} to {place} ni ikimasu.',
        english: 'I go to {place} with {person}.'
    }
];

// Word categories for extreme sentence generation
const extremeWords = {
    place: ['がっこう', 'いえ', 'みせ', 'こうえん', 'えき'],
    activity: ['べんきょう', 'うんどう', 'りょうり', 'そうじ', 'しごと'],
    food: ['ごはん', 'パン', 'みず', 'おちゃ', 'くだもの'],
    time: ['あさ', 'ひる', 'よる', 'はちじ', 'くじ'],
    weather: ['あめ', 'ゆき', 'はれ', 'くもり', 'かぜ'],
    person: ['ともだち', 'せんせい', 'かぞく', 'がくせい', 'ひと']
};