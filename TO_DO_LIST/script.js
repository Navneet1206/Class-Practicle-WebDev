function addTask() {
    const taskInput = document.getElementById('new-task');
    const dateInput = document.getElementById('due-date');
    const timeInput = document.getElementById('due-time');
    const taskText = taskInput.value.trim();
    const dueDate = dateInput.value;
    const dueTime = timeInput.value;
    const errorMessage = document.getElementById('error-message');

    if (!taskText) {
        errorMessage.textContent = 'Task cannot be empty.';
        return;
    }

    const today = new Date();
    const selectedDate = new Date(dueDate);

    // Clear the previous error message
    errorMessage.textContent = '';

    if (dueDate && selectedDate < today.setHours(0, 0, 0, 0)) {
        errorMessage.textContent = 'The due date cannot be in the past.';
        return;
    }

    const formattedTime = formatTime(dueTime);

    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const dateTimeSpan = document.createElement('span');
    dateTimeSpan.className = 'date-time';
    dateTimeSpan.textContent = dueDate ? `Due: ${dueDate} ${formattedTime}` : '';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => taskList.removeChild(listItem);

    listItem.appendChild(taskSpan);
    listItem.appendChild(dateTimeSpan);
    listItem.appendChild(deleteButton);

    listItem.onclick = () => listItem.classList.toggle('completed');

    taskList.appendChild(listItem);

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function formatTime(time) {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
}
