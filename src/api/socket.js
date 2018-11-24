import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 5000);
}

function subscribeToExercise(cb) {
    socket.on('exercise', data => cb(null, data.text, data.step, data.count));
    
}

const io = { subscribeToTimer, subscribeToExercise };
export default io;