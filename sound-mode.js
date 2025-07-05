// Sound Mode - Kanji character to reading conversion with weighted randomization
class SoundMode {
    constructor(app) {
        this.app = app;
        this.currentCharacter = '';
        this.characterWeights = {}; // Track how many times each character has been shown
        this.initializeWeights();
    }
    
    initializeWeights() {
        // Initialize all characters with weight 0 (never shown)
        const characters = Object.keys(characterData);
        characters.forEach(char => {
            this.characterWeights[char] = 0;
        });
        
        // Set initial character if data exists
        if (characters.length > 0) {
            this.currentCharacter = characters[0];
        }
    }
    
    activate() {
        this.next();
    }
    
    next() {
        this.app.clearFeedback();
        this.nextCharacter();
    }
    
    getWeightedRandomCharacter() {
        const characters = Object.keys(characterData);

        // Find the minimum weight (characters shown least)
        const minWeight = Math.min(...Object.values(this.characterWeights));
        
        // Get all characters with the minimum weight (prioritize least shown)
        const leastShownChars = characters.filter(char => 
            this.characterWeights[char] === minWeight
        );
        
        // If we have characters that haven't been shown as much, pick from those
        if (leastShownChars.length > 0) {
            return leastShownChars[Math.floor(Math.random() * leastShownChars.length)];
        }
        
        // Fallback to regular random (shouldn't happen with proper initialization)
        return characters[Math.floor(Math.random() * characters.length)];
    }
    
    nextCharacter() {
        // Don't pick the same character twice in a row if possible
        const characters = Object.keys(characterData);
        let newCharacter;
        
        if (characters.length > 1) {
            do {
                newCharacter = this.getWeightedRandomCharacter();
            } while (newCharacter === this.currentCharacter && characters.length > 1);
        } else {
            newCharacter = this.getWeightedRandomCharacter();
        }
        
        this.currentCharacter = newCharacter;
        
        // Increment the weight for this character
        this.characterWeights[this.currentCharacter]++;
        
        // Update display elements (adjust IDs as needed for your HTML)
        const charDisplay = document.getElementById('kanjiChar') || document.getElementById('hiraganaChar');
        const input = document.getElementById('readingInput') || document.getElementById('romajiInput');
        
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
        // For kanji, speak the romaji reading
        const reading = this.currentCharacter;
        this.app.speak(reading, 'ja'); // Use 'en' for English pronunciation
        console.log(`Playing sound for: ${reading} : ${characterData[this.currentCharacter].romaji} in japanese which means '${characterData[this.currentCharacter].meaning}'`);
    }
    
    handleEnter() {
        this.checkAnswer();
    }
    
    checkAnswer() {
        const input = document.getElementById('readingInput') || document.getElementById('romajiInput');
        if (!input) return;
        
        const userAnswer = input.value.toLowerCase().trim();
        const correctAnswer = characterData[this.currentCharacter].romaji.toLowerCase();
        
        const isCorrect = userAnswer === correctAnswer;
        this.app.updateScore(isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback('Correct! ✅', 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback(`Incorrect. The answer is "${characterData[this.currentCharacter].romaji}" ❌`, 'incorrect');
            // Optional: Reduce weight for incorrect answers to show them more often
            if (this.characterWeights[this.currentCharacter] > 0) {
                this.characterWeights[this.currentCharacter]--;
            }
        }
    }
    
    // Optional: Method to reset weights if you want to start over
    resetWeights() {
        this.initializeWeights();
    }
    
    // Optional: Method to see current weights (for debugging)
    getWeightStats() {
        return { ...this.characterWeights };
    }
}