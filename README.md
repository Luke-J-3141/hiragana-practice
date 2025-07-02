# Japanese Practice App - Modular Structure

This refactored version separates the original monolithic JavaScript file into modular components for better maintainability and organization.

## File Structure

The app is now split into 6 separate files:

### 1. `app.js` - Main Application Class
- Contains the base `JapanesePracticeApp` class
- Manages mode switching and global state
- Handles scoring and UI updates
- Initializes all mode instances
- Contains global functions for HTML onclick handlers

### 2. `sound-mode.js` - Sound Mode
- Handles hiragana character to romaji conversion
- Manages character display and audio playback
- Validates user input for romaji answers

### 3. `drawing-mode.js` - Drawing Mode
- Manages the drawing canvas and user interactions
- Handles mouse and touch events for drawing
- Provides hint functionality
- Validates drawing completion

### 4. `word-sound-mode.js` - Word Sound Mode
- Handles Japanese word to romaji conversion
- Manages difficulty levels (easy, medium, hard, extreme)
- Validates romaji input for words

### 5. `word-translation-mode.js` - Word Translation Mode
- Handles Japanese word to English translation
- Supports all difficulty levels including extreme sentence generation
- Flexible translation matching with common variations
- Generates complex sentences for extreme difficulty

### 6. `data.js` - Data File
- Contains all hiragana character mappings
- Word data organized by difficulty levels
- Template data for extreme sentence generation
- Word categories for dynamic sentence creation

## HTML Integration

Include all files in your HTML in this order:

```html
<!-- Data must be loaded first -->
<script src="data.js"></script>

<!-- Mode classes -->
<script src="sound-mode.js"></script>
<script src="drawing-mode.js"></script>
<script src="word-sound-mode.js"></script>
<script src="word-translation-mode.js"></script>

<!-- Main app class last -->
<script src="app.js"></script>
```

## Key Improvements

### 1. **Separation of Concerns**
- Each mode is now its own class with specific responsibilities
- Data is separated from logic
- UI management is centralized in the main app

### 2. **Better Error Handling**
- Each mode checks for DOM element existence
- Graceful fallbacks for missing data
- Safe event handler registration

### 3. **Consistent Interface**
- All mode classes implement the same methods: `activate()`, `next()`, `handleEnter()`
- Uniform way to interact with different modes
- Predictable behavior across all tabs

### 4. **Enhanced Maintainability**
- Easy to modify individual modes without affecting others
- Clear data structure separation
- Modular testing capabilities

### 5. **Extensibility**
- Easy to add new modes by following the same pattern
- Simple to extend data structures
- Clear API for mode interaction

## Required HTML Structure

Your HTML should contain these elements for the app to work properly:

### Mode Buttons
```html
<button class="mode-btn" onclick="setMode('sound')">Sound Mode</button>
<button class="mode-btn" onclick="setMode('drawing')">Drawing Mode</button>
<button class="mode-btn" onclick="setMode('wordSound')">Word Sound Mode</button>
<button class="mode-btn" onclick="setMode('wordTranslation')">Word Translation Mode</button>
```

### Mode Sections
```html
<div id="soundMode" class="mode-section">
  <div id="hiraganaChar"></div>
  <input type="text" id="romajiInput" placeholder="Enter romaji">
  <button onclick="checkRomaji()">Check</button>
</div>

<div id="drawingMode" class="mode-section hidden">
  <div id="drawRomajiChar"></div>
  <canvas id="drawingCanvas" width="300" height="300"></canvas>
  <div id="hintDisplay" class="hidden"></div>
  <button onclick="toggleHint()">Show Hint</button>
  <button onclick="clearCanvas()">Clear</button>
  <button onclick="checkDrawing()">Check</button>
</div>

<div id="wordSoundMode" class="mode-section hidden">
  <div id="wordDisplay"></div>
  <input type="text" id="wordRomajiInput" placeholder="Enter romaji">
  <button onclick="checkWordRomaji()">Check</button>
</div>

<div id="wordTranslationMode" class="mode-section hidden">
  <div id="translationWordDisplay"></div>
  <div id="wordPronunciation"></div>
  <input type="text" id="translationInput" placeholder="Enter English translation">
  <button onclick="checkTranslation()">Check</button>
</div>
```

### Score Display
```html
<div class="score-display">
  Score: <span id="score">0</span>/<span id="total">0</span> 
  (<span id="percentage">0</span>%)
</div>
```

### Feedback
```html
<div id="feedback" class="feedback hidden"></div>
```

## Customization

### Adding New Modes
1. Create a new mode class following the pattern in existing modes
2. Implement required methods: `activate()`, `next()`, `handleEnter()`
3. Add the mode to the main app's `initializeModes()` method
4. Add corresponding HTML elements and global functions

### Extending Data
- Add new characters to `hiraganaData` in `data.js`
- Add new words to `wordData` with appropriate difficulty levels
- Create new sentence templates in `extremeTemplates`
- Add word categories to `extremeWords` for sentence generation

### Styling
Add CSS classes for:
- `.mode-section` - Mode container styling
- `.hidden` - Hide inactive modes
- `.feedback.correct` - Success message styling
- `.feedback.incorrect` - Error message styling
- `.active` - Active button/toggle styling

This modular structure makes the Japanese Practice App much more maintainable and extensible while preserving all original functionality.