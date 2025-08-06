// Calculator JavaScript functionality
let currentExpression = '0';
let currentResult = '0';
let history = [];

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    loadHistory();
});

// Add character to expression
function addToExpression(char) {
    if (currentExpression === '0' && char !== '.') {
        currentExpression = char;
    } else {
        // Handle special cases
        if (char === '√') {
            currentExpression = '√(' + currentExpression + ')';
        } else if (char === '^') {
            currentExpression += '^';
        } else {
            currentExpression += char;
        }
    }
    updateDisplay();
}

// Clear all
function clearAll() {
    currentExpression = '0';
    currentResult = '0';
    updateDisplay();
}

// Clear entry
function clearEntry() {
    if (currentExpression.length > 1) {
        currentExpression = currentExpression.slice(0, -1);
    } else {
        currentExpression = '0';
    }
    updateDisplay();
}

// Calculate result
async function calculate() {
    if (currentExpression === '0') return;

    try {
        // Parse the expression to extract numbers and operation
        const parsed = parseExpression(currentExpression);
        
        if (!parsed) {
            showError('Invalid expression');
            return;
        }

        const response = await fetch('/Home/Calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FirstNumber: parsed.firstNumber,
                SecondNumber: parsed.secondNumber,
                Operation: parsed.operation
            })
        });

        const data = await response.json();
        
        if (data.success) {
            currentResult = data.result;
            addToHistory(currentExpression, currentResult);
            currentExpression = currentResult;
            updateDisplay();
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError('Calculation error');
        console.error('Error:', error);
    }
}

// Parse expression to extract numbers and operation
function parseExpression(expression) {
    // Handle square root
    if (expression.startsWith('√(') && expression.endsWith(')')) {
        const number = expression.slice(2, -1);
        return {
            firstNumber: number,
            secondNumber: '0',
            operation: '√'
        };
    }

    // Handle power operation
    if (expression.includes('^')) {
        const parts = expression.split('^');
        if (parts.length === 2) {
            return {
                firstNumber: parts[0],
                secondNumber: parts[1],
                operation: '^'
            };
        }
    }

    // Handle basic operations
    const operations = ['+', '-', '*', '/'];
    for (let op of operations) {
        if (expression.includes(op)) {
            const parts = expression.split(op);
            if (parts.length === 2) {
                return {
                    firstNumber: parts[0],
                    secondNumber: parts[1],
                    operation: op
                };
            }
        }
    }

    return null;
}

// Update display
function updateDisplay() {
    document.getElementById('expression').textContent = currentExpression;
    document.getElementById('result').textContent = currentResult;
}

// Show error message
function showError(message) {
    currentResult = 'Error';
    updateDisplay();
    
    // Show toast notification
    showToast(message, 'error');
    
    // Reset after 2 seconds
    setTimeout(() => {
        currentResult = '0';
        updateDisplay();
    }, 2000);
}

// Add to history
function addToHistory(expression, result) {
    const historyItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    };
    
    history.unshift(historyItem);
    
    // Keep only last 10 items
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    saveHistory();
    updateHistoryDisplay();
}

// Save history to localStorage
function saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

// Load history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('calculatorHistory');
    if (saved) {
        history = JSON.parse(saved);
        updateHistoryDisplay();
    }
}

// Update history display
function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';
    
    history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <small class="text-muted">${item.timestamp}</small>
                    <div class="fw-bold">${item.expression}</div>
                </div>
                <div class="text-success fw-bold">${item.result}</div>
            </div>
        `;
        
        // Add click to reuse
        historyItem.addEventListener('click', () => {
            currentExpression = item.result;
            currentResult = '0';
            updateDisplay();
        });
        
        historyContainer.appendChild(historyItem);
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'success'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add to page
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    toastContainer.appendChild(toast);
    
    // Show toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remove after hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal
    if (/[0-9.]/.test(key)) {
        addToExpression(key);
    }
    // Operations
    else if (['+', '-', '*', '/'].includes(key)) {
        addToExpression(key);
    }
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        clearEntry();
    }
    // Escape
    else if (key === 'Escape') {
        clearAll();
    }
    
    // Prevent default for calculator keys
    if (['+', '-', '*', '/', 'Enter', '=', 'Backspace', 'Escape'].includes(key)) {
        event.preventDefault();
    }
});

// Add visual feedback for button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-calculator')) {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = event.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        event.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 