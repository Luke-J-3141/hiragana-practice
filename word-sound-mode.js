
// Word Sound Mode - Japanese words to romaji conversion
class WordSoundMode {
    constructor(app) {
        this.app = app;
        this.currentWord = '';
        this.currentDifficulty = 'easy';
    }
    
    activate() {
        this.next();
    }
    
    next() {
        this.app.clearFeedback();
        this.nextWordSound();
    }
    
    nextWordSound() {
        // Handle extreme difficulty fallback
        let difficulty = this.currentDifficulty;
        if (difficulty === 'extreme' && !wordData.extreme) {
            difficulty = 'hard';
        }
        
        const words = Object.keys(wordData[difficulty]);
        this.currentWord = words[Math.floor(Math.random() * words.length)];
        
        const wordDisplay = document.getElementById('wordDisplay');
        const input = document.getElementById('wordRomajiInput');
        
        if (wordDisplay) {
            wordDisplay.textContent = this.currentWord;
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
        this.app.speak(this.currentWord, 'ja');
    }
    
    handleEnter() {
        this.checkAnswer();
    }
    
    checkAnswer() {
        const input = document.getElementById('wordRomajiInput');
        if (!input) return;
        
        const userAnswer = input.value.toLowerCase().trim();
        
        // Handle extreme difficulty fallback
        let difficulty = this.currentDifficulty;
        if (difficulty === 'extreme' && !wordData.extreme) {
            difficulty = 'hard';
        }
        
        const correctAnswer = wordData[difficulty][this.currentWord].romaji;
        
        const isCorrect = userAnswer === correctAnswer;
        this.app.updateScore(isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback(`Incorrect. The answer is "${correctAnswer}" ❌`, 'incorrect');
        }
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