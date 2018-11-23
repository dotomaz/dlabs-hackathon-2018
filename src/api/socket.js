import openSocket from 'socket.io-client';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}
const io = { subscribeToTimer };
export default io;