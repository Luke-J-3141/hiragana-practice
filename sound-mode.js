// Sound Mode - Hiragana character to romaji conversion
class SoundMode {
    constructor(app) {
        this.app = app;
        this.currentCharacter = 'あ';
    }
    
    activate() {
        this.next();
    }
    
    next() {
        this.app.clearFeedback();
        this.nextHiraganaCharacter();
    }
    
    nextHiraganaCharacter() {
        const characters = Object.keys(hiraganaData);
        this.currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        
        const charDisplay = document.getElementById('hiraganaChar');
        const input = document.getElementById('romajiInput');
        
        if (charDisplay) {
            charDisplay.textContent = this.currentCharacter;
        }
        
        if (input) {
            input.value = '';
            input.focus();
        }
        
        if (this.app.autoPlay) {
            this.playSound();
        }
    }
    
    playSound() {
        this.app.speak(this.currentCharacter, 'ja');
    }
    
    handleEnter() {
        this.checkAnswer();
    }
    
    checkAnswer() {
        const input = document.getElementById('romajiInput');
        if (!input) return;
        
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = hiraganaData[this.currentCharacter];
        
        const isCorrect = userAnswer === correctAnswer;
        this.app.updateScore(isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback(`Incorrect. The answer is "${correctAnswer}" ❌`, 'incorrect');
        }
    }
}