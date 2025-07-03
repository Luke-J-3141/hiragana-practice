// Enhanced katakana data with accented characters
const katakanaData = {
    //  a            i           u            e            o
    'ア': 'a',   'イ': 'i',   'ウ': 'u',   'エ': 'e',   'オ': 'o',
    //  k-series
    'カ': 'ka',  'キ': 'ki',  'ク': 'ku',  'ケ': 'ke',  'コ': 'ko',
    'ガ': 'ga',  'ギ': 'gi',  'グ': 'gu',  'ゲ': 'ge',  'ゴ': 'go',
    //  s-series
    'サ': 'sa',  'シ': 'shi', 'ス': 'su',  'セ': 'se',  'ソ': 'so',
    'ザ': 'za',  'ジ': 'ji',  'ズ': 'zu',  'ゼ': 'ze',  'ゾ': 'zo',
    //  t-series
    'タ': 'ta',  'チ': 'chi', 'ツ': 'tsu', 'テ': 'te',  'ト': 'to',
    'ダ': 'da',  'ヂ': 'ji',  'ヅ': 'zu',  'デ': 'de',  'ド': 'do',
    //  n-series
    'ナ': 'na',  'ニ': 'ni',  'ヌ': 'nu',  'ネ': 'ne',  'ノ': 'no',
    //  h-series
    'ハ': 'ha',  'ヒ': 'hi',  'フ': 'fu',  'ヘ': 'he',  'ホ': 'ho',
    'バ': 'ba',  'ビ': 'bi',  'ブ': 'bu',  'ベ': 'be',  'ボ': 'bo',
    'パ': 'pa',  'ピ': 'pi',  'プ': 'pu',  'ペ': 'pe',  'ポ': 'po',
    //  m-series
    'マ': 'ma',  'ミ': 'mi',  'ム': 'mu',  'メ': 'me',  'モ': 'mo',
    //  y-series
    'ヤ': 'ya',               'ユ': 'yu',               'ヨ': 'yo',
    //  r-series
    'ラ': 'ra',  'リ': 'ri',  'ル': 'ru',  'レ': 're',  'ロ': 'ro',
    'ワ': 'wa',  'ヰ': 'wi',  'ヱ': 'we',  'ヲ': 'wo',
    'ン': 'n',

    // Yoon (contracted sounds)
    'キャ': 'kya',          'キュ': 'kyu',             'キョ': 'kyo',
    'シャ': 'sha',          'シュ': 'shu',             'ショ': 'sho',
    'チャ': 'cha',          'チュ': 'chu',             'チョ': 'cho',
    'ニャ': 'nya',          'ニュ': 'nyu',             'ニョ': 'nyo',
    'ヒャ': 'hya',          'ヒュ': 'hyu',             'ヒョ': 'hyo',
    'ミャ': 'mya',          'ミュ': 'myu',             'ミョ': 'myo',
    'リャ': 'rya',          'リュ': 'ryu',             'リョ': 'ryo',
    'ギャ': 'gya',          'ギュ': 'gyu',             'ギョ': 'gyo',
    'ジャ': 'ja',           'ジュ': 'ju',              'ジョ': 'jo',
    'ビャ': 'bya',          'ビュ': 'byu',             'ビョ': 'byo',
    'ピャ': 'pya',          'ピュ': 'pyu',             'ピョ': 'pyo',
    
    // Extended katakana for foreign words
    'ヴ': 'vu',
    'ティ': 'ti',           'ディ': 'di',              'トゥ': 'tu',
    'ドゥ': 'du',           'ファ': 'fa',              'フィ': 'fi',
    'フェ': 'fe',           'フォ': 'fo',              'ウィ': 'wi',
    'ウェ': 'we',           'ウォ': 'wo',              'ツァ': 'tsa',
    'ツィ': 'tsi',          'ツェ': 'tse',             'ツォ': 'tso',
    'チェ': 'che',          'シェ': 'she',             'ジェ': 'je',
    'イェ': 'ye'
};

// Katakana word data (mainly foreign loanwords)
const katakanaWordData = {
    easy: {
        'アメ': { romaji: 'ame', english: 'candy' },
        'イス': { romaji: 'isu', english: 'chair' },
        'ウシ': { romaji: 'ushi', english: 'cow' },
        'エビ': { romaji: 'ebi', english: 'shrimp' },
        'オニ': { romaji: 'oni', english: 'demon' },
        'カメ': { romaji: 'kame', english: 'turtle' },
        'キツネ': { romaji: 'kitsune', english: 'fox' },
        'クマ': { romaji: 'kuma', english: 'bear' },
        'ケーキ': { romaji: 'keeki', english: 'cake' },
        'コーヒー': { romaji: 'koohii', english: 'coffee' },
        'サル': { romaji: 'saru', english: 'monkey' },
        'タコ': { romaji: 'tako', english: 'octopus' },
        'ナイフ': { romaji: 'naifu', english: 'knife' },
        'ハム': { romaji: 'hamu', english: 'ham' },
        'マウス': { romaji: 'mausu', english: 'mouse' },
        'ヤギ': { romaji: 'yagi', english: 'goat' },
        'ライオン': { romaji: 'raion', english: 'lion' },
        'ワイン': { romaji: 'wain', english: 'wine' },
        // Common foreign words
        'パン': { romaji: 'pan', english: 'bread' },
        'ペン': { romaji: 'pen', english: 'pen' },
        'ノート': { romaji: 'nooto', english: 'notebook' },
        'テスト': { romaji: 'tesuto', english: 'test' },
        'ドア': { romaji: 'doa', english: 'door' },
        'ベッド': { romaji: 'beddo', english: 'bed' },
        'テーブル': { romaji: 'teeburu', english: 'table' },
        'バス': { romaji: 'basu', english: 'bus' },
        'タクシー': { romaji: 'takushii', english: 'taxi' },
        'ホテル': { romaji: 'hoteru', english: 'hotel' },
        'レストラン': { romaji: 'resutoran', english: 'restaurant' },
        'カフェ': { romaji: 'kafe', english: 'cafe' },
        'スーパー': { romaji: 'suupaa', english: 'supermarket' },
        'デパート': { romaji: 'depaato', english: 'department store' },
        'アイス': { romaji: 'aisu', english: 'ice cream' },
        'ジュース': { romaji: 'juusu', english: 'juice' },
        'ミルク': { romaji: 'miruku', english: 'milk' },
        'バター': { romaji: 'bataa', english: 'butter' },
        'チーズ': { romaji: 'chiizu', english: 'cheese' },
        'サラダ': { romaji: 'sarada', english: 'salad' }
    },
    normal: {
        'アメリカ': { romaji: 'amerika', english: 'America' },
        'イギリス': { romaji: 'igirisu', english: 'England' },
        'ドイツ': { romaji: 'doitsu', english: 'Germany' },
        'フランス': { romaji: 'furansu', english: 'France' },
        'イタリア': { romaji: 'itaria', english: 'Italy' },
        'ロシア': { romaji: 'roshia', english: 'Russia' },
        'カナダ': { romaji: 'kanada', english: 'Canada' },
        'オーストラリア': { romaji: 'oosutoraria', english: 'Australia' },
        'コンピューター': { romaji: 'konpyuutaa', english: 'computer' },
        'インターネット': { romaji: 'intaanetto', english: 'internet' },
        'スマートフォン': { romaji: 'sumaatofon', english: 'smartphone' },
        'テレビ': { romaji: 'terebi', english: 'television' },
        'ラジオ': { romaji: 'rajio', english: 'radio' },
        'カメラ': { romaji: 'kamera', english: 'camera' },
        'エレベーター': { romaji: 'erebeetaa', english: 'elevator' },
        'エスカレーター': { romaji: 'esukareetaa', english: 'escalator' },
        'プレゼント': { romaji: 'purezento', english: 'present' },
        'パーティー': { romaji: 'paatii', english: 'party' },
        'ピクニック': { romaji: 'pikunikku', english: 'picnic' },
        'コンサート': { romaji: 'konsaato', english: 'concert' },
        'スポーツ': { romaji: 'supootsu', english: 'sports' },
        'サッカー': { romaji: 'sakkaa', english: 'soccer' },
        'バスケットボール': { romaji: 'basukettoboru', english: 'basketball' },
        'テニス': { romaji: 'tenisu', english: 'tennis' },
        'ゴルフ': { romaji: 'gorufu', english: 'golf' },
        'スキー': { romaji: 'sukii', english: 'skiing' },
        'ダンス': { romaji: 'dansu', english: 'dance' },
        'ミュージック': { romaji: 'myuujikku', english: 'music' },
        'クラシック': { romaji: 'kurashikku', english: 'classical' },
        'ジャズ': { romaji: 'jazu', english: 'jazz' },
        'ロック': { romaji: 'rokku', english: 'rock' },
        'ポップ': { romaji: 'poppu', english: 'pop' },
        'ファッション': { romaji: 'fasshon', english: 'fashion' },
        'ドレス': { romaji: 'doresu', english: 'dress' },
        'スーツ': { romaji: 'suutsu', english: 'suit' },
        'ジーンズ': { romaji: 'jiinzu', english: 'jeans' },
        'セーター': { romaji: 'seetaa', english: 'sweater' },
        'ジャケット': { romaji: 'jaketto', english: 'jacket' },
        'スニーカー': { romaji: 'suniikaa', english: 'sneakers' },
        'ブーツ': { romaji: 'buutsu', english: 'boots' }
    },
    hard: {
        'アルバイト': { romaji: 'arubaito', english: 'part-time job' },
        'インフルエンザ': { romaji: 'infuruenza', english: 'influenza' },
        'エネルギー': { romaji: 'enerugii', english: 'energy' },
        'オーケストラ': { romaji: 'ookesutora', english: 'orchestra' },
        'カリキュラム': { romaji: 'karikyuramu', english: 'curriculum' },
        'キャンペーン': { romaji: 'kyanpeen', english: 'campaign' },
        'クリスマス': { romaji: 'kurisumasu', english: 'Christmas' },
        'グローバル': { romaji: 'guroobaru', english: 'global' },
        'ケーブル': { romaji: 'keeburu', english: 'cable' },
        'コミュニケーション': { romaji: 'komyunikeeshon', english: 'communication' },
        'サンドイッチ': { romaji: 'sandoitchi', english: 'sandwich' },
        'シミュレーション': { romaji: 'shimyureeshon', english: 'simulation' },
        'スケジュール': { romaji: 'sukejuuru', english: 'schedule' },
        'ストレス': { romaji: 'sutoresu', english: 'stress' },
        'セキュリティ': { romaji: 'sekyuriti', english: 'security' },
        'ソフトウェア': { romaji: 'sofutowea', english: 'software' },
        'ターミナル': { romaji: 'taaminaru', english: 'terminal' },
        'チャレンジ': { romaji: 'charenji', english: 'challenge' },
        'データベース': { romaji: 'deetabeesu', english: 'database' },
        'ナビゲーション': { romaji: 'nabigeshon', english: 'navigation' },
        'ハンバーガー': { romaji: 'hanbaagaa', english: 'hamburger' },
        'ビジネス': { romaji: 'bijinesu', english: 'business' },
        'プロジェクト': { romaji: 'purojekuto', english: 'project' },
        'プログラム': { romaji: 'puroguramu', english: 'program' },
        'ヘリコプター': { romaji: 'herikoputaa', english: 'helicopter' },
        'ボランティア': { romaji: 'borantia', english: 'volunteer' },
        'マネージメント': { romaji: 'manējimento', english: 'management' },
        'ミーティング': { romaji: 'miitingu', english: 'meeting' },
        'メッセージ': { romaji: 'messēji', english: 'message' },
        'モニター': { romaji: 'monitaa', english: 'monitor' },
        'ユーザー': { romaji: 'yuuzaa', english: 'user' },
        'ラウンジ': { romaji: 'raunji', english: 'lounge' },
        'リサーチ': { romaji: 'risaachi', english: 'research' },
        'ルーティン': { romaji: 'ruutin', english: 'routine' },
        'レストラン': { romaji: 'resutoran', english: 'restaurant' },
        'ロビー': { romaji: 'robii', english: 'lobby' },
        'ワークショップ': { romaji: 'waakushoppu', english: 'workshop' }
    }
};

// Katakana sentence templates
const katakanaTemplates = [
    {
        template: 'わたしは{country}から来ました。',
        romaji: 'watashi wa {country} kara kimashita.',
        english: 'I came from {country}.'
    },
    {
        template: '{food}を食べるのが好きです。',
        romaji: '{food} wo taberu no ga suki desu.',
        english: 'I like eating {food}.'
    },
    {
        template: '{sport}をするのが得意です。',
        romaji: '{sport} wo suru no ga tokui desu.',
        english: 'I\'m good at {sport}.'
    },
    {
        template: '{place}で{activity}をしました。',
        romaji: '{place} de {activity} wo shimashita.',
        english: 'I did {activity} at {place}.'
    },
    {
        template: '{item}を買いに{place}に行きます。',
        romaji: '{item} wo kai ni {place} ni ikimasu.',
        english: 'I go to {place} to buy {item}.'
    }
];

// Word categories for katakana sentences
const katakanaWords = {
    country: ['アメリカ', 'イギリス', 'フランス', 'ドイツ', 'カナダ'],
    food: ['ハンバーガー', 'ピザ', 'パスタ', 'ケーキ', 'アイス'],
    sport: ['サッカー', 'テニス', 'バスケットボール', 'ゴルフ', 'スキー'],
    place: ['ホテル', 'レストラン', 'スーパー', 'デパート', 'カフェ'],
    activity: ['ショッピング', 'ダンス', 'カラオケ', 'ゲーム', 'ドライブ'],
    item: ['コンピューター', 'カメラ', 'スマートフォン', 'プレゼント', 'チケット']
};