// Word Sound Mode - Japanese words to romaji conversion with weighted selection
class WordSoundMode {
    constructor(app) {
        this.app = app;
        this.currentWord = '';
        this.currentDifficulty = 'easy';
        this.wordStats = this.loadWordStats();
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
        // Use weighted selection instead of random selection
        this.currentWord = this.selectWeightedWord(words);
        
        const wordDisplay = document.getElementById('wordDisplay');
        const english = document.getElementById('wordMeaning');
        const input = document.getElementById('wordRomajiInput');
        
        if (wordDisplay) {
            wordDisplay.textContent = this.currentWord;
        }

        if (english) {
            english.textContent = wordData[this.currentDifficulty][this.currentWord].meaning;
        }

        if (input) {
            input.value = '';
            input.focus();
        }

        console.log(`Playing sound for word: ${this.currentWord} : ${wordData[this.currentDifficulty][this.currentWord].romaji} 
            which means '${wordData[this.currentDifficulty][this.currentWord].meaning}' in Japanese`);
            
        if (this.app.autoPlay) {
            this.playSound();
        }
    }
    
    selectWeightedWord(words) {
        const weights = words.map(word => this.calculateWeight(word));
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        
        // Generate random number between 0 and totalWeight
        let random = Math.random() * totalWeight;
        
        // Find the word corresponding to this random value
        for (let i = 0; i < words.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return words[i];
            }
        }
        
        // Fallback to last word if something goes wrong
        return words[words.length - 1];
    }
    
    calculateWeight(word) {
        const key = `${this.currentDifficulty}_${word}`;
        const stats = this.wordStats[key];
        
        if (!stats) {
            // Never attempted - highest priority
            return 10;
        }
        
        const { correct, incorrect, lastSeen } = stats;
        const total = correct + incorrect;
        
        if (total === 0) {
            // Never attempted - highest priority
            return 10;
        }
        
        const accuracy = correct / total;
        const timeSinceLastSeen = Date.now() - lastSeen;
        const daysSinceLastSeen = timeSinceLastSeen / (1000 * 60 * 60 * 24);
        
        // Base weight calculation
        let weight = 1;
        
        // Lower accuracy = higher weight (more likely to be selected)
        if (accuracy < 0.3) {
            weight *= 8; // Very poor accuracy
        } else if (accuracy < 0.5) {
            weight *= 5; // Poor accuracy
        } else if (accuracy < 0.7) {
            weight *= 3; // Below average accuracy
        } else if (accuracy < 0.9) {
            weight *= 1.5; // Good accuracy but still needs practice
        } else {
            weight *= 0.5; // Excellent accuracy - reduce frequency
        }
        
        // Time factor - words not seen recently get higher weight
        if (daysSinceLastSeen > 7) {
            weight *= 3; // Haven't seen in over a week
        } else if (daysSinceLastSeen > 3) {
            weight *= 2; // Haven't seen in a few days
        } else if (daysSinceLastSeen > 1) {
            weight *= 1.5; // Haven't seen yesterday
        }
        
        // Recent incorrect answers get extra weight
        if (incorrect > 0) {
            const recentIncorrectBonus = Math.min(incorrect * 0.5, 2);
            weight += recentIncorrectBonus;
        }
        
        return Math.max(weight, 0.1); // Ensure minimum weight so words aren't completely excluded
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
        
        // Update word statistics
        this.updateWordStats(this.currentWord, isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback(`Correct! ✅ "${correctAnswer}" is the romaji for "${this.currentWord}"`, 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback(`Incorrect. The answer is "${correctAnswer}" ❌`, 'incorrect');
        }
    }
    
    updateWordStats(word, isCorrect) {
        const key = `${this.currentDifficulty}_${word}`;
        
        if (!this.wordStats[key]) {
            this.wordStats[key] = {
                correct: 0,
                incorrect: 0,
                lastSeen: Date.now(),
                firstSeen: Date.now()
            };
        }
        
        const stats = this.wordStats[key];
        
        if (isCorrect) {
            stats.correct++;
        } else {
            stats.incorrect++;
        }
        
        stats.lastSeen = Date.now();
        
        this.saveWordStats();
    }
    
    loadWordStats() {
        try {
            const saved = localStorage.getItem('wordTranslationStats');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading word stats:', error);
            return {};
        }
    }

    saveWordStats() {
        try {
            localStorage.setItem('wordTranslationStats', JSON.stringify(this.wordStats));
        } catch (error) {
            console.error('Error saving word stats:', error);
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
    
    // Method to reset stats for a specific word or all words
    resetWordStats(word = null) {
        if (word) {
            const key = `${this.currentDifficulty}_${word}`;
            delete this.wordStats[key];
        } else {
            this.wordStats = {};
        }
        this.saveWordStats();
    }
    
    // Method to get stats for debugging or display
    getWordStats(word = null) {
        if (word) {
            const key = `${this.currentDifficulty}_${word}`;
            return this.wordStats[key] || null;
        }
        return this.wordStats;
    }
}