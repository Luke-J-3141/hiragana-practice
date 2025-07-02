// Base Japanese Practice App
class JapanesePracticeApp {
    constructor() {
        this.currentMode = 'sound';
        this.score = 0;
        this.total = 0;
        this.autoPlay = true;
        
        // Mode instances
        this.soundMode = null;
        this.drawingMode = null;
        this.wordSoundMode = null;
        this.wordTranslationMode = null;
        
        this.init();
    }
    
    init() {
        this.initializeModes();
        this.setupEventListeners();
        this.setMode('sound');
        this.updateUI();
    }
    
    initializeModes() {
        // Only initialize modes if their classes exist
        if (typeof SoundMode !== 'undefined') {
            this.soundMode = new SoundMode(this);
        }
        if (typeof DrawingMode !== 'undefined') {
            this.drawingMode = new DrawingMode(this);
        }
        if (typeof WordSoundMode !== 'undefined') {
            this.wordSoundMode = new WordSoundMode(this);
        }
        if (typeof WordTranslationMode !== 'undefined') {
            this.wordTranslationMode = new WordTranslationMode(this);
        }
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleEnterKey();
            }
        });
    }
    
    handleEnterKey() {
        const currentModeInstance = this.getCurrentModeInstance();
        if (currentModeInstance && currentModeInstance.handleEnter) {
            currentModeInstance.handleEnter();
        }
    }
    
    getCurrentModeInstance() {
        switch(this.currentMode) {
            case 'sound': return this.soundMode;
            case 'drawing': return this.drawingMode;
            case 'wordSound': return this.wordSoundMode;
            case 'wordTranslation': return this.wordTranslationMode;
            default: return null;
        }
    }
    
    setMode(mode, targetButton = null) {
        this.currentMode = mode;
        
        // Update button states - fixed the event.target issue
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        
        // If called from HTML onclick, find the button by mode
        if (!targetButton) {
            const modeButtonMap = {
                'sound': '🔊 Hiragana Sound',
                'drawing': '✏️ Hiragana Drawing',
                'wordSound': '🗣️ Word Pronunciation',
                'wordTranslation': '🔤 Word Translation'
            };
            
            targetButton = Array.from(document.querySelectorAll('.mode-btn')).find(btn => 
                btn.textContent.trim() === modeButtonMap[mode]
            );
        }
        
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        // Hide all mode sections
        document.querySelectorAll('#soundMode, #drawingMode, #wordSoundMode, #wordTranslationMode').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show current mode section
        const modeElement = document.getElementById(mode + 'Mode');
        if (modeElement) {
            modeElement.classList.remove('hidden');
        }
        
        // Initialize the mode
        const currentModeInstance = this.getCurrentModeInstance();
        if (currentModeInstance && currentModeInstance.activate) {
            currentModeInstance.activate();
        }
        
        this.clearFeedback();
    }
    
    toggleAutoPlay() {
        this.autoPlay = !this.autoPlay;
        const toggle = document.getElementById('autoPlayToggle');
        if (toggle) {
            toggle.classList.toggle('active', this.autoPlay);
        }
    }
    
    nextCharacter() {
        const currentModeInstance = this.getCurrentModeInstance();
        if (currentModeInstance && currentModeInstance.next) {
            currentModeInstance.next();
        }
    }
    
    // Audio functions
    speak(text, language = 'ja') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language;
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    }
    
    // Scoring functions
    updateScore(isCorrect) {
        this.total++;
        if (isCorrect) {
            this.score++;
        }
        this.updateScoreDisplay();
    }
    
    updateScoreDisplay() {
        const scoreEl = document.getElementById('score');
        const totalEl = document.getElementById('total');
        const percentageEl = document.getElementById('percentage');
        
        if (scoreEl) scoreEl.textContent = this.score;
        if (totalEl) totalEl.textContent = this.total;
        if (percentageEl) {
            const percentage = this.total > 0 ? Math.round((this.score / this.total) * 100) : 0;
            percentageEl.textContent = percentage;
        }
    }
    
    // UI functions
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.className = `feedback ${type}`;
            feedback.classList.remove('hidden');
        }
    }
    
    clearFeedback() {
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.classList.add('hidden');
        }
    }
    
    updateUI() {
        this.updateScoreDisplay();
    }
}

// Global app instance
let app;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    app = new JapanesePracticeApp();
    
    // Make sure global functions are available
    window.app = app;
});

// Global functions for HTML onclick handlers - Fixed to ensure they exist
window.setMode = function(mode) {
    if (window.app) {
        window.app.setMode(mode);
    }
};

window.toggleAutoPlay = function() {
    if (window.app) {
        window.app.toggleAutoPlay();
    }
};

window.nextCharacter = function() {
    if (window.app) {
        window.app.nextCharacter();
    }
};

window.playSound = function() {
    if (window.app && window.app.soundMode) {
        window.app.soundMode.playSound();
    }
};

window.playWordSound = function() {
    if (window.app && window.app.wordSoundMode) {
        window.app.wordSoundMode.playSound();
    }
};

window.playTranslationWordSound = function() {
    if (window.app && window.app.wordTranslationMode) {
        window.app.wordTranslationMode.playSound();
    }
};

window.checkRomaji = function() {
    if (window.app && window.app.soundMode) {
        window.app.soundMode.checkAnswer();
    }
};

window.checkWordRomaji = function() {
    if (window.app && window.app.wordSoundMode) {
        window.app.wordSoundMode.checkAnswer();
    }
};

window.checkTranslation = function() {
    if (window.app && window.app.wordTranslationMode) {
        window.app.wordTranslationMode.checkAnswer();
    }
};

window.checkDrawing = function() {
    if (window.app && window.app.drawingMode) {
        window.app.drawingMode.checkDrawing();
    }
};

window.clearCanvas = function() {
    if (window.app && window.app.drawingMode) {
        window.app.drawingMode.clearCanvas();
    }
};

window.toggleHint = function() {
    if (window.app && window.app.drawingMode) {
        window.app.drawingMode.toggleHint();
    }
};

window.setWordDifficulty = function(difficulty) {
    if (window.app && window.app.wordSoundMode) {
        window.app.wordSoundMode.setDifficulty(difficulty);
    }
};

window.setTranslationDifficulty = function(difficulty) {
    if (window.app && window.app.wordTranslationMode) {
        window.app.wordTranslationMode.setDifficulty(difficulty);
    }
};