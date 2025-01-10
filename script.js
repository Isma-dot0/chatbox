const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => taskList.removeChild(li);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    taskInput.value = '';
}

function clearAllTasks() {
    taskList.innerHTML = '';
}

// Voice Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        if (transcript.toLowerCase().startsWith('add ')) {
            const task = transcript.substring(4).trim();
            if (task) {
                taskInput.value = task;
                addTask();
            }
        } else if (transcript.toLowerCase() === 'clear all') {
            clearAllTasks();
        }
    };

    recognition.start();
} else {
    alert('Voice recognition not supported in this browser.');
}
