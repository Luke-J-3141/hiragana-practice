// Multiple Choice Practice Mode for Japanese Learning App

// Variables for multiple choice mode
let currentMultipleChoiceAnswer = '';
let multipleChoiceOptions = [];
let multipleChoiceScore = 0;
let multipleChoiceTotalQuestions = 0;

// Add this function to your existing script.js or create a new file
function initializeMultipleChoiceMode() {
    // Add the multiple choice mode HTML structure
    const practiceArea = document.querySelector('.practice-area');
    
    // Create the multiple choice mode HTML
    const multipleChoiceModeHTML = `
        <div id="multipleChoiceMode" class="hidden">
            <div class="romaji-display" id="multipleChoiceRomaji">ka</div>
            <p>Select the correct hiragana character:</p>
            <div class="multiple-choice-grid" id="multipleChoiceGrid">
                <!-- Options will be populated by JavaScript -->
            </div>
            <div class="multiple-choice-feedback" id="multipleChoiceFeedback"></div>
            <button class="control-btn" onclick="nextMultipleChoiceQuestion()" id="nextMultipleChoiceBtn" style="margin-top: 1rem; display: none;">Next Question →</button>
        </div>
    `;
    
    // Insert the HTML before the feedback div
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.insertAdjacentHTML('beforebegin', multipleChoiceModeHTML);
    
    // Add the mode button
    const modeSelector = document.querySelector('.mode-selector');
    const multipleChoiceBtn = document.createElement('button');
    multipleChoiceBtn.className = 'mode-btn';
    multipleChoiceBtn.onclick = () => setMode('multipleChoice');
    multipleChoiceBtn.innerHTML = '🎯 Multiple Choice';
    modeSelector.appendChild(multipleChoiceBtn);
    
    // Add CSS styles
    addMultipleChoiceStyles();
    
    // Generate first question
    generateMultipleChoiceQuestion();
}

function addMultipleChoiceStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .multiple-choice-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 20px 0;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .choice-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .choice-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .choice-btn.correct {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            animation: correctPulse 0.6s ease;
        }
        
        .choice-btn.incorrect {
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
            animation: incorrectShake 0.6s ease;
        }
        
        .choice-btn.disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
        
        .multiple-choice-feedback {
            margin: 20px 0;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
            text-align: center;
            min-height: 20px;
        }
        
        .multiple-choice-feedback.correct {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .multiple-choice-feedback.incorrect {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        @keyframes correctPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes incorrectShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .romaji-display {
            font-size: 3rem;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    `;
    document.head.appendChild(style);
}

function generateMultipleChoiceQuestion() {
    // Get all hiragana characters
    const allCharacters = Object.keys(hiraganaData);
    
    // Select a random correct answer
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    currentMultipleChoiceAnswer = allCharacters[randomIndex];
    
    // Display the romaji
    document.getElementById('multipleChoiceRomaji').textContent = hiraganaData[currentMultipleChoiceAnswer];
    
    // Generate 9 incorrect options
    const incorrectOptions = [];
    while (incorrectOptions.length < 9) {
        const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        if (randomChar !== currentMultipleChoiceAnswer && !incorrectOptions.includes(randomChar)) {
            incorrectOptions.push(randomChar);
        }
    }
    
    // Combine correct answer with incorrect options and shuffle
    multipleChoiceOptions = [currentMultipleChoiceAnswer, ...incorrectOptions];
    shuffleArray(multipleChoiceOptions);
    
    // Display options
    displayMultipleChoiceOptions();
    
    // Clear feedback and hide next button
    const feedbackDiv = document.getElementById('multipleChoiceFeedback');
    feedbackDiv.textContent = '';
    feedbackDiv.className = 'multiple-choice-feedback';
    document.getElementById('nextMultipleChoiceBtn').style.display = 'none';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayMultipleChoiceOptions() {
    const grid = document.getElementById('multipleChoiceGrid');
    grid.innerHTML = '';
    
    multipleChoiceOptions.forEach((char, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = char;
        button.onclick = () => selectMultipleChoiceAnswer(char, button);
        grid.appendChild(button);
    });
}

function selectMultipleChoiceAnswer(selectedChar, buttonElement) {
    const isCorrect = selectedChar === currentMultipleChoiceAnswer;
    const feedbackDiv = document.getElementById('multipleChoiceFeedback');
    const allButtons = document.querySelectorAll('.choice-btn');
    
    // Disable all buttons
    allButtons.forEach(btn => {
        btn.classList.add('disabled');
        btn.onclick = null;
    });
    
    // Update score
    multipleChoiceTotalQuestions++;
    if (isCorrect) {
        multipleChoiceScore++;
        buttonElement.classList.add('correct');
        feedbackDiv.textContent = `Correct! ${selectedChar} is pronounced "${hiraganaData[selectedChar]}"`;
        feedbackDiv.className = 'multiple-choice-feedback correct';
    } else {
        buttonElement.classList.add('incorrect');
        // Highlight the correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === currentMultipleChoiceAnswer) {
                btn.classList.add('correct');
            }
        });
        feedbackDiv.textContent = `Incorrect. The correct answer is ${currentMultipleChoiceAnswer} (${hiraganaData[currentMultipleChoiceAnswer]}). You selected ${selectedChar} (${hiraganaData[selectedChar]}).`;
        feedbackDiv.className = 'multiple-choice-feedback incorrect';
    }
    
    // Update score display
    updateScoreDisplay();
    
    // Show next question button
    document.getElementById('nextMultipleChoiceBtn').style.display = 'inline-block';
}

function nextMultipleChoiceQuestion() {
    generateMultipleChoiceQuestion();
}

function updateScoreDisplay() {
    const percentage = multipleChoiceTotalQuestions > 0 ? Math.round((multipleChoiceScore / multipleChoiceTotalQuestions) * 100) : 0;
    document.getElementById('score').textContent = multipleChoiceScore;
    document.getElementById('total').textContent = multipleChoiceTotalQuestions;
    document.getElementById('percentage').textContent = percentage;
}

// Modify the existing setMode function to include multiple choice mode
function setModeWithMultipleChoice(mode) {
    // Hide all modes
    const modes = ['soundMode', 'drawingMode', 'wordSoundMode', 'wordTranslationMode', 'multipleChoiceMode'];
    modes.forEach(modeId => {
        const element = document.getElementById(modeId);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Remove active class from all mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected mode and activate button
    const selectedMode = document.getElementById(mode + 'Mode');
    if (selectedMode) {
        selectedMode.classList.remove('hidden');
    }
    
    // Find and activate the correct button
    const buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(btn => {
        if ((mode === 'sound' && btn.textContent.includes('Sound')) ||
            (mode === 'drawing' && btn.textContent.includes('Drawing')) ||
            (mode === 'wordSound' && btn.textContent.includes('Word Pronunciation')) ||
            (mode === 'wordTranslation' && btn.textContent.includes('Word Translation')) ||
            (mode === 'multipleChoice' && btn.textContent.includes('Multiple Choice'))) {
            btn.classList.add('active');
        }
    });
    
    // Initialize the mode if it's multiple choice
    if (mode === 'multipleChoice') {
        generateMultipleChoiceQuestion();
    }
}

// Initialize the multiple choice mode when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure other scripts have loaded
    setTimeout(initializeMultipleChoiceMode, 100);
    
    // Override the existing setMode function if it exists
    if (typeof setMode !== 'undefined') {
        window.originalSetMode = setMode;
    }
    window.setMode = setModeWithMultipleChoice;
});