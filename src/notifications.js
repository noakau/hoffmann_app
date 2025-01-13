const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('Connected to WebSocket server');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    const notification = JSON.parse(event.data);
    console.log('Notification received:', notification);
    handleNotification(notification);  // Your function to handle UI updates
});

// Handle errors
socket.addEventListener('error', function (error) {
    console.error('WebSocket error:', error);
});

// Handle connection close
socket.addEventListener('close', function () {
    console.log('WebSocket connection closed');
});

function handleNotification(notification) {
    if (notification.type === 'task_added') {
        alert('New task added: ' + notification.task[0].title);
    } else if (notification.type === 'task_updated') {
        alert('Task updated: ' + notification.task[0].title);
    } else if (notification.type === 'task_deleted') {
        alert('Task deleted with ID: ' + notification.taskId);
    }
}
