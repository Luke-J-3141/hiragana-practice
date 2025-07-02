// Word Translation Mode - Japanese words to English translation
class WordTranslationMode {
    constructor(app) {
        this.app = app;
        this.currentWord = '';
        this.currentWordData = null;
        this.currentDifficulty = 'easy';
    }
    
    activate() {
        this.next();
    }
    
    next() {
        this.app.clearFeedback();
        this.nextWordTranslation();
    }
    
    nextWordTranslation() {
        if (this.currentDifficulty === 'extreme') {
            if (wordData.extreme) {
                this.loadExtremeWord();
            } else {
                this.generateExtremeSentence();
            }
        } else {
            this.loadRegularWord();
        }
        
        if (this.app.autoPlay) {
            this.playSound();
        }
    }
    
    loadRegularWord() {
        const words = Object.keys(wordData[this.currentDifficulty]);
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.currentWordData = wordData[this.currentDifficulty][this.currentWord];
        
        this.updateDisplay();
    }
    
    loadExtremeWord() {
        const words = Object.keys(wordData.extreme);
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        this.currentWordData = wordData.extreme[this.currentWord];
        
        this.updateDisplay();
    }
    
    generateExtremeSentence() {
        if (!extremeTemplates || !extremeWords) {
            // Fallback to hard difficulty if extreme data not available
            this.currentDifficulty = 'hard';
            this.loadRegularWord();
            return;
        }
        
        const template = extremeTemplates[Math.floor(Math.random() * extremeTemplates.length)];
        let sentence = template.template;
        let romaji = template.romaji;
        let english = template.english;
        
        // Replace placeholders with random words
        const placeholders = sentence.match(/{(\w+)}/g);
        if (placeholders) {
            placeholders.forEach(placeholder => {
                const key = placeholder.replace(/{|}/g, '');
                if (extremeWords[key]) {
                    const word = extremeWords[key][Math.floor(Math.random() * extremeWords[key].length)];
                    sentence = sentence.replace(placeholder, word);
                    romaji = romaji.replace(placeholder, this.getWordRomaji(word));
                    english = english.replace(placeholder, this.getWordEnglish(word));
                }
            });
        }
        
        this.currentWord = sentence;
        this.currentWordData = { romaji: romaji, english: english };
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const wordDisplay = document.getElementById('translationWordDisplay');
        const pronunciation = document.getElementById('wordPronunciation');
        const input = document.getElementById('translationInput');
        
        if (wordDisplay) {
            wordDisplay.textContent = this.currentWord;
        }
        
        if (pronunciation) {
            pronunciation.textContent = this.currentWordData.romaji;
        }
        
        if (input) {
            input.value = '';
            input.focus();
        }
    }
    
    getWordRomaji(word) {
        let romaji = '';
        let i = 0;
        while (i < word.length) {
            let found = false;
            // Check for 2-character combinations first
            if (i < word.length - 1) {
                const twoChar = word.substr(i, 2);
                if (hiraganaData[twoChar]) {
                    romaji += hiraganaData[twoChar];
                    i += 2;
                    found = true;
                }
            }
            // Then check single characters
            if (!found) {
                const oneChar = word.charAt(i);
                if (hiraganaData[oneChar]) {
                    romaji += hiraganaData[oneChar];
                }
                i++;
            }
        }
        return romaji;
    }
    
    getWordEnglish(word) {
        const wordMap = {
            'ねこ': 'cat', 'いぬ': 'dog', 'ほん': 'book', 'くるま': 'car', 'がっこう': 'school',
            'すき': 'like', 'きれい': 'pretty', 'おおきい': 'big', 'ちいさい': 'small', 'あたらしい': 'new',
            'あめ': 'rain', 'ゆき': 'snow', 'はれ': 'sunny', 'くもり': 'cloudy', 'かぜ': 'wind',
            'ともだち': 'friend', 'せんせい': 'teacher', 'かぞく': 'family', 'がくせい': 'student', 'ひと': 'person',
            'いえ': 'house', 'えき': 'station', 'びょういん': 'hospital', 'みせ': 'store',
            'いき': 'go', 'き': 'come', 'かえり': 'return', 'はしり': 'run', 'あるき': 'walk',
            'あさ': 'morning', 'ひる': 'noon', 'よる': 'night', 'はちじ': '8 o\'clock', 'くじ': '9 o\'clock',
            'べんきょう': 'study', 'しごと': 'work', 'りょうり': 'cooking', 'そうじ': 'cleaning', 'うんどう': 'exercise',
            'あか': 'red', 'あお': 'blue', 'きいろ': 'yellow', 'みどり': 'green', 'しろ': 'white'
        };
        return wordMap[word] || word;
    }
    
    playSound() {
        this.app.speak(this.currentWord, 'ja');
    }
    
    handleEnter() {
        this.checkAnswer();
    }
    
    checkAnswer() {
        const input = document.getElementById('translationInput');
        if (!input) return;
        
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = this.currentWordData.english.toLowerCase();
        
        const isCorrect = this.checkTranslationMatch(userAnswer, correctAnswer);
        this.app.updateScore(isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback(`Incorrect. The answer is "${correctAnswer}" ❌`, 'incorrect');
        }
    }
    
    checkTranslationMatch(input, correct) {
        // Exact match
        if (input === correct) return true;
        
        // Check if input contains the correct answer or vice versa
        if (input.includes(correct) || correct.includes(input)) return true;
        
        // Check for common variations
        const variations = {
            'i': ['me', 'myself'],
            'hello': ['hi', 'greetings'],
            'thank you': ['thanks'],
            'good morning': ['morning'],
            'goodbye': ['bye', 'farewell'],
            'excuse me': ['sorry', 'pardon']
        };
        
        for (const [key, values] of Object.entries(variations)) {
            if (correct.includes(key) && values.some(v => input.includes(v))) {
                return true;
            }
        }
        
        return false;
    }
    
    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        this.next();
    }
}