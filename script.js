// Japanese Practice App Logic
class JapanesePracticeApp {
    constructor() {
        this.currentMode = 'sound';
        this.currentCharacter = 'あ';
        this.currentWord = '';
        this.currentDifficulty = 'easy';
        this.autoPlay = true;
        this.score = 0;
        this.total = 0;
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.showingHint = false;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.nextCharacter();
        this.updateUI();
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('drawingCanvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            
            // Add drawing event listeners
            this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
            this.canvas.addEventListener('mousemove', (e) => this.draw(e));
            this.canvas.addEventListener('mouseup', () => this.stopDrawing());
            this.canvas.addEventListener('mouseout', () => this.stopDrawing());
            
            // Touch events for mobile
            this.canvas.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startDrawing(e.touches[0]);
            });
            this.canvas.addEventListener('touchmove', (e) => {
                e.preventDefault();
                this.draw(e.touches[0]);
            });
            this.canvas.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.stopDrawing();
            });
        }
    }
    
    setupEventListeners() {
        // Enter key submission
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleEnterKey();
            }
        });
    }
    
    handleEnterKey() {
        switch(this.currentMode) {
            case 'sound':
                this.checkRomaji();
                break;
            case 'wordSound':
                this.checkWordRomaji();
                break;
            case 'wordTranslation':
                this.checkTranslation();
                break;
        }
    }
    
    // Mode switching
    setMode(mode) {
        this.currentMode = mode;
        
        // Update button states
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Hide all mode sections
        document.querySelectorAll('#soundMode, #drawingMode, #wordSoundMode, #wordTranslationMode').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show current mode section
        document.getElementById(mode + 'Mode').classList.remove('hidden');
        
        // Reset and update for new mode
        this.nextCharacter();
        this.clearFeedback();
    }
    
    // Auto-play toggle
    toggleAutoPlay() {
        this.autoPlay = !this.autoPlay;
        const toggle = document.getElementById('autoPlayToggle');
        toggle.classList.toggle('active', this.autoPlay);
    }
    
    // Character/word selection
    nextCharacter() {
        this.clearFeedback();
        
        switch(this.currentMode) {
            case 'sound':
                this.nextHiraganaCharacter();
                break;
            case 'drawing':
                this.nextDrawingCharacter();
                break;
            case 'wordSound':
                this.nextWordSound();
                break;
            case 'wordTranslation':
                this.nextWordTranslation();
                break;
        }
    }
    
    nextHiraganaCharacter() {
        const characters = Object.keys(hiraganaData);
        this.currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        
        document.getElementById('hiraganaChar').textContent = this.currentCharacter;
        document.getElementById('romajiInput').value = '';
        document.getElementById('romajiInput').focus();
        
        if (this.autoPlay) {
            this.playSound();
        }
    }
    
    nextDrawingCharacter() {
        const characters = Object.keys(hiraganaData);
        this.currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        
        document.getElementById('drawRomajiChar').textContent = hiraganaData[this.currentCharacter];
        this.clearCanvas();
        this.hideHint();
    }
    
    nextWordSound() {
        // Check if extreme difficulty exists in wordData
        if (this.currentDifficulty === 'extreme' && !wordData.extreme) {
            // If extreme doesn't exist, use hard difficulty for word sound mode
            const words = Object.keys(wordData.hard);
            this.currentWord = words[Math.floor(Math.random() * words.length)];
            document.getElementById('wordDisplay').textContent = this.currentWord;
        } else {
            const words = Object.keys(wordData[this.currentDifficulty]);
            this.currentWord = words[Math.floor(Math.random() * words.length)];
            document.getElementById('wordDisplay').textContent = this.currentWord;
        }
        
        document.getElementById('wordRomajiInput').value = '';
        document.getElementById('wordRomajiInput').focus();
        
        if (this.autoPlay) {
            this.playWordSound();
        }
    }
    
    nextWordTranslation() {
        if (this.currentDifficulty === 'extreme') {
            // Check if extreme difficulty exists in wordData, if not use sentence generation
            if (wordData.extreme) {
                const words = Object.keys(wordData.extreme);
                this.currentWord = words[Math.floor(Math.random() * words.length)];
                
                document.getElementById('translationWordDisplay').textContent = this.currentWord;
                document.getElementById('wordPronunciation').textContent = wordData.extreme[this.currentWord].romaji;
                document.getElementById('translationInput').value = '';
                document.getElementById('translationInput').focus();
            } else {
                this.generateExtremeSentence();
            }
        } else {
            const words = Object.keys(wordData[this.currentDifficulty]);
            this.currentWord = words[Math.floor(Math.random() * words.length)];
            
            document.getElementById('translationWordDisplay').textContent = this.currentWord;
            document.getElementById('wordPronunciation').textContent = wordData[this.currentDifficulty][this.currentWord].romaji;
            document.getElementById('translationInput').value = '';
            document.getElementById('translationInput').focus();
        }
        
        if (this.autoPlay) {
            this.playTranslationWordSound();
        }
    }
    
    generateExtremeSentence() {
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
        
        document.getElementById('translationWordDisplay').textContent = sentence;
        document.getElementById('wordPronunciation').textContent = romaji;
        document.getElementById('translationInput').value = '';
        document.getElementById('translationInput').focus();
    }
    
    getWordRomaji(word) {
        // Convert hiragana word to romaji
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
        // Simple word to English mapping for extreme mode
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
    
    // Difficulty settings
    setWordDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        this.nextCharacter();
    }
    
    setTranslationDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        this.nextCharacter();
    }
    
    // Audio functions
    playSound() {
        this.speak(this.currentCharacter, 'ja');
    }
    
    playWordSound() {
        this.speak(this.currentWord, 'ja');
    }
    
    playTranslationWordSound() {
        this.speak(this.currentWord, 'ja');
    }
    
    speak(text, language = 'en') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    }
    
    // Answer checking
    checkRomaji() {
        const input = document.getElementById('romajiInput').value.toLowerCase().trim();
        const correct = hiraganaData[this.currentCharacter];
        
        this.total++;
        
        if (input === correct) {
            this.score++;
            this.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.nextCharacter(), 1500);
        } else {
            this.showFeedback(`Incorrect. The answer is "${correct}" ❌`, 'incorrect');
        }
        
        this.updateScore();
    }
    
    checkWordRomaji() {
        const input = document.getElementById('wordRomajiInput').value.toLowerCase().trim();
        let correct;
        
        // Handle extreme difficulty that might not exist in wordData
        if (this.currentDifficulty === 'extreme' && !wordData.extreme) {
            correct = wordData.hard[this.currentWord].romaji;
        } else {
            correct = wordData[this.currentDifficulty][this.currentWord].romaji;
        }
        
        this.total++;
        
        if (input === correct) {
            this.score++;
            this.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.nextCharacter(), 1500);
        } else {
            this.showFeedback(`Incorrect. The answer is "${correct}" ❌`, 'incorrect');
        }
        
        this.updateScore();
    }
    
    checkTranslation() {
        const input = document.getElementById('translationInput').value.toLowerCase().trim();
        let correct;
        
        if (this.currentDifficulty === 'extreme') {
            if (wordData.extreme && wordData.extreme[this.currentWord]) {
                // Use extreme wordData if it exists
                correct = wordData.extreme[this.currentWord].english.toLowerCase();
            } else {
                // Use generated sentence data
                correct = this.currentWordData.english.toLowerCase();
            }
        } else {
            correct = wordData[this.currentDifficulty][this.currentWord].english.toLowerCase();
        }
        
        this.total++;
        
        // Allow for slight variations in translation
        const isCorrect = this.checkTranslationMatch(input, correct);
        
        if (isCorrect) {
            this.score++;
            this.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.nextCharacter(), 1500);
        } else {
            this.showFeedback(`Incorrect. The answer is "${correct}" ❌`, 'incorrect');
        }
        
        this.updateScore();
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
    
    // Drawing functions
    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        this.ctx.stroke();
    }
    
    stopDrawing() {
        this.isDrawing = false;
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hideHint();
    }
    
    toggleHint() {
        const hintDisplay = document.getElementById('hintDisplay');
        
        if (this.showingHint) {
            this.hideHint();
        } else {
            hintDisplay.textContent = this.currentCharacter;
            hintDisplay.classList.remove('hidden');
            this.showingHint = true;
        }
    }
    
    hideHint() {
        const hintDisplay = document.getElementById('hintDisplay');
        hintDisplay.classList.add('hidden');
        this.showingHint = false;
    }
    
    checkDrawing() {
        // Simple drawing check - just verify something was drawn
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const hasDrawing = imageData.data.some((channel, index) => {
            return index % 4 === 3 && channel !== 0; // Check alpha channel
        });
        
        this.total++;
        
        if (hasDrawing) {
            this.score++;
            this.showFeedback('Great drawing! ✅', 'correct');
            setTimeout(() => this.nextCharacter(), 1500);
        } else {
            this.showFeedback('Please draw something first! ❌', 'incorrect');
        }
        
        this.updateScore();
    }
    
    // UI functions
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        feedback.classList.remove('hidden');
    }
    
    clearFeedback() {
        const feedback = document.getElementById('feedback');
        feedback.classList.add('hidden');
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('total').textContent = this.total;
        const percentage = this.total > 0 ? Math.round((this.score / this.total) * 100) : 0;
        document.getElementById('percentage').textContent = percentage;
    }
    
    updateUI() {
        this.updateScore();
    }
}

// Global variables and functions for HTML onclick handlers
let app;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    app = new JapanesePracticeApp();
});

// Global functions for HTML onclick handlers
function setMode(mode) {
    if (app) app.setMode(mode);
}

function toggleAutoPlay() {
    if (app) app.toggleAutoPlay();
}

function nextCharacter() {
    if (app) app.nextCharacter();
}

function playSound() {
    if (app) app.playSound();
}

function playWordSound() {
    if (app) app.playWordSound();
}

function playTranslationWordSound() {
    if (app) app.playTranslationWordSound();
}

function checkRomaji() {
    if (app) app.checkRomaji();
}

function checkWordRomaji() {
    if (app) app.checkWordRomaji();
}

function checkTranslation() {
    if (app) app.checkTranslation();
}

function checkDrawing() {
    if (app) app.checkDrawing();
}

function clearCanvas() {
    if (app) app.clearCanvas();
}

function toggleHint() {
    if (app) app.toggleHint();
}

function setWordDifficulty(difficulty) {
    if (app) app.setWordDifficulty(difficulty);
}

function setTranslationDifficulty(difficulty) {
    if (app) app.setTranslationDifficulty(difficulty);
}