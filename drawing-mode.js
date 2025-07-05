// Drawing Mode - Draw hiragana characters
class DrawingMode {
    constructor(app) {
        this.app = app;
        this.currentCharacter = 'あ';
        this.canvas = null;
        this.ctx = null;
        this.isDrawing = false;
        this.showingHint = false;
        
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.canvas = document.getElementById('drawingCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Mouse events
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
    
    activate() {
        this.next();
    }
    
    next() {
        this.app.clearFeedback();
        this.nextDrawingCharacter();
    }
    
    nextDrawingCharacter() {
        const characters = Object.keys(characterData);
        this.currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        
        const charDisplay = document.getElementById('drawRomajiChar');
        if (charDisplay) {
            charDisplay.textContent = characterData[this.currentCharacter].romaji;
        }
        
        this.clearCanvas();
        this.hideHint();
    }
    
    startDrawing(e) {
        if (!this.canvas) return;
        
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.beginPath();
        this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
    
    draw(e) {
        if (!this.isDrawing || !this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        this.ctx.stroke();
    }
    
    stopDrawing() {
        this.isDrawing = false;
    }
    
    clearCanvas() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hideHint();
    }
    
    toggleHint() {
        const hintDisplay = document.getElementById('hintDisplay');
        if (!hintDisplay) return;
        
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
        if (hintDisplay) {
            hintDisplay.classList.add('hidden');
            this.showingHint = false;
        }
    }
    
    checkDrawing() {
        if (!this.ctx || !this.canvas) return;
        
        // Check if something was drawn
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const hasDrawing = imageData.data.some((channel, index) => {
            return index % 4 === 3 && channel !== 0; // Check alpha channel
        });
        
        // Currently dont have a way to validate the drawing against the character
        const isCorrect = hasDrawing;
        this.app.updateScore(isCorrect);
        
        if (isCorrect) {
            this.app.showFeedback('Great drawing! ✅', 'correct');
            setTimeout(() => this.next(), 1500);
        } else {
            this.app.showFeedback('Please draw something first! ❌', 'incorrect');
        }
    }
}