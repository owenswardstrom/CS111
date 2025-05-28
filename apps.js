// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Number Multiplier Functions
function displaySelection() {
    const operation = document.getElementById("operation").value;
    const selectionDisplay = document.getElementById("selection-display");
    selectionDisplay.innerHTML = operation;
}

function calculateResult() {
    const inputElement = document.getElementById("inputNumber");
    const inputValue = parseFloat(inputElement.value);
    const operationElement = document.getElementById("operation");
    const operation = operationElement.value;
    const resultElement = document.getElementById("calculation-result");
    
    if (isNaN(inputValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        return;
    }
    
    let result;
    let operationText;
    
    if (operation === "double") {
        result = inputValue * 2;
        operationText = "doubled";
    } else if (operation === "triple") {
        result = inputValue * 3;
        operationText = "tripled";
    }
    
    resultElement.textContent = `${inputValue} ${operationText} = ${result.toFixed(2)}`;
}

function clearResult() {
    document.getElementById("inputNumber").value = "";
    document.getElementById("calculation-result").innerHTML = "";
}

// Magic 8 Ball Functions
const answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

let historyItems = [];

function getRandomAnswer() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    return answers[randomIndex];
}

function shakeBall() {
    const question = document.getElementById('question').value.trim();
    const ball = document.getElementById('ball');
    const answerElement = document.getElementById('answer');
    const questionDisplay = document.getElementById('question-display');
    const questionInput = document.getElementById('question');
    
    if (question === '') {
        alert('Please ask a question first!');
        return;
    }

    answerElement.textContent = '8';
    
    ball.style.transform = 'translateX(-5px)';
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 100);
    setTimeout(() => { ball.style.transform = 'translateX(-5px)'; }, 200);
    setTimeout(() => { ball.style.transform = 'translateX(5px)'; }, 300);
    setTimeout(() => { ball.style.transform = 'translateX(0)'; }, 400);
    
    setTimeout(() => {
        const randomAnswer = getRandomAnswer();
        answerElement.textContent = randomAnswer;
        questionDisplay.textContent = `"${question}"`;
        questionDisplay.style.opacity = 1;
        addToHistory(question);
    }, 500);
    
    questionInput.value = '';
}

function resetBall() {
    document.getElementById('answer').textContent = '8';
    document.getElementById('question-display').textContent = '';
    document.getElementById('question-display').style.opacity = 0;
    document.getElementById('question').value = '';
}

function addToHistory(question) {
    historyItems.unshift(question);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const questionHistory = document.getElementById('question-history');
    questionHistory.innerHTML = '';
    
    historyItems.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        listItem.textContent = question;
        questionHistory.appendChild(listItem);
    });
}

function clearHistory() {
    historyItems = [];
    updateHistoryDisplay();
}

// Task List Functions
let tasks = [];
// New 2D array to store date and time - each item is [dateString, timeString]
let taskDueDates = [];

// Array of random tasks for the random task feature - focused on health and student wellness
const randomTasks = [
  "Take a short walk",
  "Drink a glass of water",
  "Stretch for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Stand up and move around for 5 minutes",
  "Do a quick meditation session",
  "Write in a gratitude journal",
  "Have a healthy snack",
  "Rest your eyes for 2 minutes",
  "Fix your posture",
  "Do a quick workout",
  "Call a friend or family member",
  "Take a short nap",
  "Listen to calming music",
  "Drink a cup of tea",
  "Practice mindfulness for 5 minutes",
  "Step outside for fresh air",
  "Do a quick stretching routine"
];

// Get DOM elements
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const taskList = document.getElementById('task-list');

// Function to validate date in MM/DD format
// TODO
/* 1. Create a function that validates the date string in MM/DD format
   2. Check if the string has exactly one '/' character
   3. Split the string by '/' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if month is between 1-12
   7. Check if day is valid for the given month (use an array for days in each month)
   8. Return true if date is valid, false otherwise
*/
function validateDate(dateStr) {
  if (!dateStr.includes('/')) return false

  const parts = dateStr.split('/')
  if (parts.length !== 2) return false 
  
  const [monthStr, dayStr] = parts
  if (monthStr.length !== 2) return false

  for (let char of monthStr + dayStr) {
    const code = char.charCodeAt(0)
    if (code < 48 || code > 57) return false
  }

  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr,10)
  if (month < 1 || month > 12) return false

  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return day >= 1 && day <= daysInMonth[month - 1]
}

// Function to validate time in 24-hour format (HH:MM)
// TODO
/* 1. Create a function that validates the time string in 24-hour (HH:MM) format
   2. Check if the string has exactly one ':' character
   3. Split the string by ':' and check if we have exactly 2 parts
   4. Check if both parts have exactly 2 digits
   5. Verify that all characters are digits (Hint: use charCodeAt method to check ASCII values)
   6. Convert parts to numbers and check if hours are between 0-23
   7. Check if minutes are between 0-59
   8. Return true if time is valid, false otherwise
*/
function validateTime(timeStr) {
  if (!timeStr.includes(':')) return false

  const parts = timeStr.split(':')
  if (parts.length !== 2) return false

  const [hourStr, minuteStr] = parts
  if (hourStr.length !== 2 || minuteStr.length !== 2) return false

  for (let char of hourStr +minuteStr) {
    const code = char.charCodeAt(0)
    if (code < 48 || code > 57) return false
  }

  const hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59
}

// TODO
/* 1. Create a function that calculates priority based on date and time
   2. Get the current year using new Date().getFullYear()
   3. Parse the date and time from strings to numbers using:
      - Split dateStr by '/' and convert parts to numbers
      - Split timeStr by ':' and convert parts to numbers
   4. Create a new Date object with the provided date and time
      (Hint: new Date(year, month-1, day, hours, minutes))
   5. Return the timestamp (milliseconds since epoch) by using dueDate.getTime()
      (This will be used for sorting tasks by due date/time) 
      (This last return statement is already given to you.)
*/
function calculatePriority(dateStr, timeStr) {
  // Get current date
  // write the code to get the year
  
  // Parse the date and time
  // write the code to parse the date and time
  
  // Create a date object for the due date
  // write the code to create a date object for the due date
  
  // For sorting, we'll use a more precise priority based on exact timestamp
  // Return the timestamp itself for more accurate sorting
  const year = new Date().getFullYear()

  const [monthStr, dayStr] = dateStr.split('/')
  const [hourStr, minuteStr] = timeStr.split(':')

  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)
  const hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)

  const dueDate = new Date(year, month - 1, day, hour, minute)
  return dueDate.getTime();
}



// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  const dateStr = dateInput.value.trim();
  const timeStr = timeInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task first!');
    return;
  }
  
  if (!validateDate(dateStr)) {
    alert('Please enter a valid date in MM/DD format!');
    return;
  }
  
  if (!validateTime(timeStr)) {
    alert('Please enter a valid time in 24-hour format (HH:MM)!');
    return;
  }
  
  // Calculate priority based on date and time
  const priority = calculatePriority(dateStr, timeStr);
  console.log(priority);
  
  // Create task array [taskText, priority]
  const task = [taskText, priority];
  
  // Add to tasks array
  tasks.push(task);
  
  // Add to due dates array
  taskDueDates.push([dateStr, timeStr]);
  
  // Sort tasks by priority
  sortTasksByPriority();
  
  // Update task display
  updateTaskDisplay();
  
  // Clear the input field
  clearInput();
}

// Function to add a random task
function addRandomTask() {
  // Get random task from the array
  const randomIndex = Math.floor(Math.random() * randomTasks.length);
  const randomTask = randomTasks[randomIndex];
  
  // Set the task input value
  taskInput.value = randomTask;
  
  // Focus on the date input
  dateInput.focus();
}

// Function to sort tasks by priority and update the taskDueDates array accordingly
function sortTasksByPriority() {
  // Create an array of indices
  let indices = Array.from(Array(tasks.length).keys());
  
  // Sort indices based on due dates and times
  indices.sort(function(a, b) {
    // Get date and time from taskDueDates
    const dateA = taskDueDates[a][0];
    const timeA = taskDueDates[a][1];
    const dateB = taskDueDates[b][0];
    const timeB = taskDueDates[b][1];
    
    // Parse date components
    const [monthA, dayA] = dateA.split('/').map(Number);
    const [monthB, dayB] = dateB.split('/').map(Number);
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB;
    }
    
    // If months are the same, compare days
    if (dayA !== dayB) {
      return dayA - dayB;
    }
    
    // If dates are the same, compare times
    const [hoursA, minutesA] = timeA.split(':').map(Number);
    const [hoursB, minutesB] = timeB.split(':').map(Number);
    
    // Compare hours
    if (hoursA !== hoursB) {
      return hoursA - hoursB;
    }
    
    // Compare minutes
    return minutesA - minutesB;
  });
  
  // Create new arrays based on sorted indices
  const newTasks = [];
  const newTaskDueDates = [];
  
  for (let i = 0; i < indices.length; i++) {
    newTasks.push(tasks[indices[i]]);
    newTaskDueDates.push(taskDueDates[indices[i]]);
  }
  
  // Replace original arrays with sorted arrays
  tasks = newTasks;
  taskDueDates = newTaskDueDates;
}

// Function to handle keypress (for Enter key)
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

// Assign the onkeydown property directly
taskInput.onkeydown = handleKeyPress;

// Function to clear the input fields
function clearInput() {
  taskInput.value = '';
  dateInput.value = '';
  timeInput.value = '';
  taskInput.focus();
}

// Function to update the task display
function updateTaskDisplay() {
  // Clear current task list
  taskList.innerHTML = '';
  
  // Add each task item using for loop as requested
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskText = task[0]; // Task text is at index 0
    const dateStr = taskDueDates[i][0]; // Date string
    const timeStr = taskDueDates[i][1]; // Time string
    
    const listItem = document.createElement('li');
    listItem.className = 'task-item';
    
    // Create task details container
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Parse the date and time
    const [month, day] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    // Create a date object for the due date
    const dueDate = new Date(currentYear, month - 1, day, hours, minutes);
    
    // Calculate time difference in hours
    const diffMs = dueDate - now;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    // Assign visible priority class based on time difference
    let priorityClass = 1; // Default to highest priority (red)
    if (diffHours < 0) {
      priorityClass = 1; // Overdue - highest priority (red)
    } else if (diffHours < 4) {
      priorityClass = 1; // Due within 4 hours - highest priority (red)
    } else if (diffHours < 24) {
      priorityClass = 2; // Due within a day (orange)
    } else if (diffHours < 48) {
      priorityClass = 3; // Due within 2 days (blue)
    } else if (diffHours < 72) {
      priorityClass = 4; // Due within 3 days (green)
    } else {
      priorityClass = 5; // Due later - lowest priority (gray)
    }
    
    // Create task text container
    const taskTextContainer = document.createElement('span');
    taskTextContainer.className = 'task-text';
    
    // Create priority dot element
    const priorityDot = document.createElement('span');
    priorityDot.className = `priority-indicator priority-${priorityClass}`;
    
    // Create the actual task text element
    const taskTextElement = document.createTextNode(taskText);
    
    // Create due date text
    const dueDateText = document.createElement('span');
    dueDateText.className = 'due-date-text';
    dueDateText.textContent = `Due: ${dateStr} at ${timeStr}`;
    
    // Create delete button with onclick attribute
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('onclick', `deleteTask(${i})`);
    
    // Append elements to containers
    taskTextContainer.appendChild(priorityDot);
    taskTextContainer.appendChild(taskTextElement);
    
    taskDetails.appendChild(taskTextContainer);
    taskDetails.appendChild(dueDateText);
    
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    
    // Append list item to task list
    taskList.appendChild(listItem);
  }
}

// Function to delete a specific task
function deleteTask(index) {
  // Remove task from both arrays
  tasks.splice(index, 1);
  taskDueDates.splice(index, 1);
  
  // Update the display
  updateTaskDisplay();
}

// Function to clear all tasks
function clearTasks() {
  // Clear both arrays
  tasks = [];
  taskDueDates = [];
  
  // Update the display
  updateTaskDisplay();
}

// Initial input field setup and display update
window.onload = function() {
  // Initial update of task display
  updateTaskDisplay();
};

// Countdown Timer Functions
let timerDisplay;
let motivationDisplay;
let secondsInput;
let startBtn;
let resetBtn;
let statusDisplay;
let countdown;
let timeLeft;
let phraseIndex = 0;

const motivationalPhrases = [
    "Every second counts!",
    "You're making progress!",
    "Keep going, you're doing great!",
    "Stay focused, stay strong!",
    "You've got this!",
    "One step at a time!",
    "Believe in yourself!",
    "Success is just ahead!",
    "Don't give up now!",
    "The best is yet to come!",
    "Each moment brings you closer to your goal!",
    "Small steps lead to big results!",
    "Your determination is inspiring!",
    "Progress happens one second at a time!",
    "Keep that momentum going!"
];

window.addEventListener('load', function() {
    timerDisplay = document.getElementById('timer');
    motivationDisplay = document.getElementById('motivation');
    secondsInput = document.getElementById('seconds');
    startBtn = document.getElementById('startBtn');
    resetBtn = document.getElementById('resetBtn');
    statusDisplay = document.getElementById('status');
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

function startCountdown() {
    const seconds = parseInt(secondsInput.value);

    if (isNaN(seconds) || seconds <= 0) {
        statusDisplay.textContent = "Please enter a valid number of seconds";
        return;
    }
    
    startBtn.disabled = true;
    secondsInput.disabled = true;
    statusDisplay.textContent = "Countdown in progress...";
    
    timeLeft = seconds;
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft % 5 === 0 || timeLeft === seconds - 1) {
            phraseIndex = (phraseIndex + 1) % motivationalPhrases.length;
            motivationDisplay.textContent = motivationalPhrases[phraseIndex];
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerDisplay.textContent = "00:00";
            motivationDisplay.textContent = "🎉 Congratulations! You've completed the countdown!";
            startBtn.disabled = false;
            secondsInput.disabled = false;
            statusDisplay.textContent = "Countdown complete!";
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerDisplay.textContent = "00:00";
    motivationDisplay.textContent = "Enter seconds and start the timer for motivation!";
    startBtn.disabled = false;
    secondsInput.disabled = false;
    statusDisplay.textContent = "";
    secondsInput.value = "30";
}

// NATO Converter Functions
const natoLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const natoWords = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel",
                    "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa",
                    "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray",
                    "Yankee", "Zulu", "One", "Two", "Three", "Four", "Five", "Six", 
                    "Seven", "Eight", "Nine", "Zero"];

function chToNato(ch) {
    const upperCh = ch.toUpperCase();
    const index = natoLetters.indexOf(upperCh);
    if (index !== -1) {
        return natoWords[index];
    }
    return ch;
}

function wordToNato(word) {
    const characters = word.split("");
    const natoCharacters = characters.map(ch => chToNato(ch));
    return natoCharacters.join(" ");
}

function sentenceToNato(sentence) {
    const words = sentence.split(" ");
    const natoWords = words.map(word => wordToNato(word));
    return natoWords.join(" ");
}

function verbalize() {
    const inputString = document.getElementById("inputString").value;
    const natoResult = sentenceToNato(inputString);
    document.getElementById("natoResult").textContent = natoResult;
}

function clearNATOInputs() {
    document.getElementById("inputString").value = "";
    document.getElementById("natoResult").textContent = "";
}

// Calculator Functions
let memory = 0;
let currentInput = "0";
let currentOperator = null;
let leftOperand = null;
let waitingForRightOperand = false;
let lastOperation = "";
let calculationDone = false;

// DOM Elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Initialize display
display.value = "0";

// Functions for calculator operations
function appendToDisplay(value) {
    // If we just completed a calculation and start typing a new number
    if (calculationDone && !isNaN(value)) {
        clearDisplay();
        calculationDone = false;
    } else if (calculationDone) {
        calculationDone = false;
    }
    
    // If waiting for right operand, start a new input
    if (waitingForRightOperand) {
        display.value = value;
        waitingForRightOperand = false;
    } else {
        // Handle leading zero
        if (display.value === "0" && value !== ".") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
    
    currentInput = display.value;
}

function clearDisplay() {
    display.value = "0";
    currentInput = "0";
}

function clearAll() {
    clearDisplay();
    history.textContent = "";
    leftOperand = null;
    currentOperator = null;
    waitingForRightOperand = false;
    lastOperation = "";
}

function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display.value = memory;
    currentInput = display.value;
}

function addToMemory() {
    try {
        // TODO: Replace this with safer code
        memory += parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function subtractFromMemory() {
    try {
        // TODO: Replace this with safer code
        memory -= parseFloat(eval(display.value));
    } catch (e) {
        display.value = "Error";
    }
}

function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = "0";
    }
    currentInput = display.value;
}

/* Implement a function that parses and calculates mathematical expressions
   1. Create a function named evaluateExpression that takes an expression string as input
   2. First, handle simple number case: if the expression is a number, return it as a float
   3. Create an array to store tokens (numbers and operators)
   4. Loop through each character in the expression
   5. If the character is an operator (+, -, *, /), add the current number to tokens and then add the operator
   6. If the character is a digit or decimal point, add it to the current number string
   7. After the loop, add any remaining number to tokens
   8. Process multiplication and division first (following order of operations)
   9. Then process addition and subtraction
   10. Return the final calculated result
*/
function evaluateExpression(expression) {
     // If it's a simple number, return it
    if (!isNaN(parseFloat(expression)) && isFinite(expression)) {
        return parseFloat(expression);
    }
    
    // Create a tokenizer to parse the expression
    const tokens = [];
    let currentNumber = '';
    
    // Tokenize the expression
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            if (currentNumber) {
                tokens.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            tokens.push(char);
        } else if (!isNaN(parseInt(char)) || char === '.') {
            currentNumber += char;
        }
    }
    
    // Push the last number if exists
    if (currentNumber) {
        tokens.push(parseFloat(currentNumber));
    }
    
    // Process multiplication and division first
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '*') {
            tokens[i-1] = tokens[i-1] * tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        } else if (tokens[i] === '/') {
            tokens[i-1] = tokens[i-1] / tokens[i+1];
            tokens.splice(i, 2);
            i -= 2;
        }
    }
    
    // Process addition and subtraction
    let result = tokens[0];
    for (let i = 1; i < tokens.length; i += 2) {
        if (tokens[i] === '+') {
            result += tokens[i+1];
        } else if (tokens[i] === '-') {
            result -= tokens[i+1];
        }
    }
    
    return result;
}

// TODO: Write the body of this function
/* This function should handle various mathematical operations like sqrt, power, etc.
   1. Handle the 'Math.sqrt' function:
      a. Update history.textContent to show the operation
      b. Calculate the square root of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   2. Handle the 'Math.pow' function:
      a. Store the current display value as leftOperand
      b. Update history.textContent to show the base
      c. Set currentOperator to "pow"
      d. Set waitingForRightOperand to true to wait for the exponent
   
   3. Handle 'Math.abs' function:
      a. Update history.textContent to show the operation
      b. Calculate the absolute value of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   4. Handle trigonometric functions (Math.sin, Math.cos, Math.tan):
      a. Extract the function name (sin, cos, tan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   5. Handle inverse trigonometric functions (Math.asin, Math.acos, Math.atan)
      a. Extract the function name (asin, acos, atan)
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
   
   6. Handle 'Math.log' function (base 10 logarithm):
      a. Update history.textContent to show the operation
      b. Calculate the logarithm of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   7. Handle 'Math.exp' function (e^x):
      a. Update history.textContent to show the operation
      b. Calculate e raised to the power of the current display value
      c. Update display.value with the result
      d. Set calculationDone to true
   
   8. Handle rounding functions (Math.round, Math.ceil, Math.floor):
      a. Extract the function name
      b. Update history.textContent to show the operation
      c. Calculate the result using the appropriate Math function
      d. Update display.value with the result
      e. Set calculationDone to true
*/
function insertMathFunction(func) {
    try {
        const value = parseFloat(display.value)
        let result

        switch (func) {
            case 'sqrt':
                history.textContent = `√(${value})`
                result = Math.sqrt(value)
                break
            case 'pow':
                leftOperand = value
                history.textContent = `${value}^`
                currentOperator = "pow"
                waitingForRightOperand = true
                return
            case 'abs':
                history.textContent = `|${value}|`
                result = Math.abs(value)
                break
            case 'sin':
                history.textContent = `sin(${value})`
                result = Math.sin(value)
                break
            case 'cos':
                history.textContent = `cos(${value})`
                result = Math.cos(value)
                break
            case 'tan':
                history.textContent = `tan(${value})`
                result = Math.tan(value)
                break
            case 'asin':
                history.textContent = `asin(${value})`
                result = Math.asin(value)
                break
            case 'acos':
                history.textContent = `acos(${value})`
                result = Math.acos(value)
                break
            case 'atan':
                history.textContent = `atan(${value})`
                result = Math.atan(value)
                break
            case 'log':
                history.textContent = `log(${value})`
                if (value <= 0) throw new Error("Log undefined")
                result = Math.log10(value)
                break
            case 'exp':
                history.textContent = `exp(${value})`
                result = Math.exp(value)
                break
            case 'round':
                history.textContent = `round(${value})`
                result = Math.round(value)
                break
            case 'ceil':
                history.textContent = `ceil(${value})`
                result = Math.ceil(value)
                break
            case 'floor':
                history.textContent = `floor(${value})`
                result = Math.floor(value)
                break
            default:
                throw new Error("Unknown function")
        }

        display.value = result
        currentInput = result
        calculationDone = true
    } catch (e) {
        display.value = "Error"
    }
}



// TODO: Write the body of this function
/* This function should insert mathematical constants into the calculator display
   1. Check if constant is 'Math.PI' and if so, set display.value to Math.PI
   2. Check if constant is 'Math.E' and if so, set display.value to Math.E
   3. Check if constant is 'Math.LN2' and if so, set display.value to Math.LN2
   4. Check if constant is 'Math.LN10' and if so, set display.value to Math.LN10
   5. Update currentInput to match the display value
   6. Set calculationDone to true
*/
function insertMathConstant(constant) {
    let value;

    switch (constant) {
        case 'Math.PI':
            value = Math.PI
            break
        case 'Math.E':
            value = Math.E
            break
        case 'Math.LN2':
            value = Math.LN2
            break
        case 'Math.LN10':
            value = Math.LN10
            break
        default:
            value = 0
    }

    display.value = value
    currentInput = value
    calculationDone = true
}

/* This function should calculate the result of the current expression
   1. Check if we're in the middle of a power operation:
      a. If currentOperator is "pow" and leftOperand is not null:
         i. Calculate base^exponent using Math.pow
         ii. Update history.textContent to show the full operation
         iii. Update display.value with the result
         iv. Reset leftOperand and currentOperator
   2. Otherwise:
      a. Update history.textContent with the current expression
      b. Calculate the result using evaluateExpression
      c. Update display.value with the result
   3. Set calculationDone to true
*/
function calculate() {
   try {
        if (currentOperator === "pow" && leftOperand !== null) {
            // Handle power operation
            const rightOperand = parseFloat(display.value);
            history.textContent = `${leftOperand}^${rightOperand}`;
            display.value = Math.pow(leftOperand, rightOperand);
            leftOperand = null;
            currentOperator = null;
        } else {
            // Handle normal operations
            history.textContent = display.value;
            display.value = evaluateExpression(display.value);
        }
        calculationDone = true;
    } catch (e) {
        display.value = "Error";
    }
}


// Function to assess temperature and provide text and color indicators
function assessTemperature(temp, scale) {
    const tempElement = document.getElementById("temp-assessment");
    let assessment = "";
    let color = "";
    
    // Temperature thresholds differ based on scale
    if (scale === "celsius") {
        if (temp <= 0) {
            assessment = "Very Cold";
            color = "#3498db"; // Blue
        } else if (temp < 10) {
            assessment = "Cold";
            color = "#7fb3d5"; // Light blue
        } else if (temp < 20) {
            assessment = "Cool";
            color = "#a9cce3"; // Very light blue
        } else if (temp < 30) {
            assessment = "Moderate";
            color = "#2ecc71"; // Green
        } else if (temp < 40) {
            assessment = "Warm";
            color = "#f39c12"; // Orange
        } else {
            assessment = "Hot";
            color = "#e74c3c"; // Red
        }

    //TODO
    /* Steps to complete the Fahrenheit assessment:
       1. Use an else statement to handle the Fahrenheit scale
       2. Set up conditional statements for temperature ranges in Fahrenheit
       3. For each range, specify the appropriate assessment text and color
       4. Use the same color scheme as the Celsius part but with Fahrenheit thresholds
       5. Very Cold: <= 32°F (Blue)
       6. Cold: 32-49°F (Light blue)
       7. Cool: 50-67°F (Very light blue)
       8. Moderate: 68-85°F (Green)
       9. Warm: 86-103°F (Orange)
       10. Hot: >= 104°F (Red)
    */
    } else { 
        if (temp <= 32){
            assessment = "Very Cold"
            color = "#3498db"
        } else if (temp < 50) {
            assessment = "Cold"
            color = "#7fb3d5"
        } else if (temp <68) {
            assessment = "Cool"
            color = "#a9cce3"
        } else if (temp < 86) {
            assessment = "Moderate"
            color = "#2ecc71"
        } else if (temp < 104) {
            assessment = "Warm"
            color = "#f39c12"
        } else {
            assessment = "Hot"
            color = "#e74c3c"
        }
    }

    // Update the assessment display with text and color
    tempElement.textContent = `Temperature Assessment: ${assessment}`;
    tempElement.style.color = color;
    tempElement.style.fontWeight = "bold";
}

// Function to perform temperature conversion based on selection
function convertTemperature() {
    const temperatureInput = document.getElementById("temperature")
    const temperatureValue = parseFloat(temperatureInput.value)
    // Get the input temperature value
    // TODO: write the code to get the input temperature
    /* Steps to get the input temperature:
       1. Get the element with id "temperature"
       2. Get the value entered by the user
       3. Convert the value to a floating-point number using parseFloat()
    */
    // please write the code to get the input temperature as specified above
    
    // Get the conversion type
    const conversionType = document.getElementById("conversion-type").value;
    
    // Get the result element
    const resultElement = document.getElementById("conversion-result");
    
    // Validate that the input is a number
    if (isNaN(temperatureValue)) {
        resultElement.textContent = "Invalid input. Please enter a number.";
        document.getElementById("temp-assessment").textContent = "";
        return;
    }

    if (conversionType === "ftoc") {
      let result = (temperatureValue - 32) * 5 / 9
      resultElement.textContent = `Result: ${result.toFixed(2)} °C`
      assessTemperature(result, "celsius")
    } else {
      let result = (temperatureValue * 9 / 5) + 32
      resultElement.textContent = `Result: ${result.toFixed(2)} °F`
      assessTemperature(result, "fahrenheit")
    }
  }
    
    // Perform the conversion based on the selected type
    // TODO: write the code to do the conversion
    /* Steps to perform the conversion:
       1. Create a variable to store the result
       2. Check if the conversion type is "ftoc" (Fahrenheit to Celsius)
       3. If it is "ftoc", apply the formula: C = (F - 32) * 5/9
       4. Display the result formatted with the appropriate units
       5. Call assessTemperature with the result and "celsius" scale
       6. If it's not "ftoc", it must be "ctof" (Celsius to Fahrenheit)
       7. Apply the formula: F = (C * 9/5) + 32
       8. Display the result formatted with the appropriate units
       9. Call assessTemperature with the result and "fahrenheit" scale
       10. Use toFixed(2) to round the result to 2 decimal places
    */
    // please write the code to calculate the result as specified above


// Function to clear the converter
// TODO: write the body of this clearConverter() function
/* Steps to complete clearConverter():
   1. Set the value of the input element with id "temperature" to an empty string
   2. Set the textContent of the element with id "conversion-result" to an empty string
   3. Set the textContent of the element with id "temp-assessment" to an empty string
*/
function clearConverter() {
    document.getElementById("temperature").value = ""
    document.getElementById("conversion-result").textContent = ""
    document.getElementById("temp-assessment").textContent = ""
}