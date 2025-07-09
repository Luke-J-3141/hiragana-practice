// Word Translation Mode - Japanese words to English translation
class WordTranslationMode {
    constructor(app) {
        this.app = app;
        this.currentWord = '';
        this.currentWordData = null;
        this.currentDifficulty = 'easy';
        
        // Word statistics tracking
        this.wordStats = this.loadWordStats();
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
        this.currentWord = this.selectWeightedWord(words);
        this.currentWordData = wordData[this.currentDifficulty][this.currentWord];
        
        this.updateDisplay();
    }
    
    loadExtremeWord() {
        const words = Object.keys(wordData.extreme);
        this.currentWord = this.selectWeightedWord(words);
        this.currentWordData = wordData.extreme[this.currentWord];
        
        this.updateDisplay();
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
        let meaning = template.meaning;
        
        // Replace placeholders with random words
        const placeholders = sentence.match(/{(\w+)}/g);
        if (placeholders) {
            placeholders.forEach(placeholder => {
                const key = placeholder.replace(/{|}/g, '');
                if (extremeWords[key]) {
                    const word = extremeWords[key][Math.floor(Math.random() * extremeWords[key].length)];
                    sentence = sentence.replace(placeholder, word);
                    romaji = romaji.replace(placeholder, this.getWordRomaji(word));
                    meaning = meaning.replace(placeholder, this.getWordMeaning(word));
                }
            });
        }
        
        this.currentWord = sentence;
        this.currentWordData = { romaji: romaji, meaning: meaning };
        
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
    
    getWordMeaning(word) {
        // Helper function to get meaning for extreme mode word replacement
        // This would need to be implemented based on your word lookup system
        return word; // Placeholder - replace with actual meaning lookup
    }
    
    playSound() {
        // Add console logging
        console.log(`Playing sound for word: ${this.currentWord} : ${this.currentWordData.romaji} which means '${this.currentWordData.meaning}' in Japanese`);
        
        this.app.speak(this.currentWord, 'ja');
    }
    
    handleEnter() {
        this.checkAnswer();
    }
    
    checkAnswer() {
        const input = document.getElementById('translationInput');
        if (!input) return;
        
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = this.currentWordData.meaning.toLowerCase();
        
        const isCorrect = this.checkTranslationMatch(userAnswer, correctAnswer);
        this.app.updateScore(isCorrect);
        
        // Update word statistics
        this.updateWordStats(this.currentWord, isCorrect);
        
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