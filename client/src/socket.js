import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://192.168.1.133:3000';

export const socket = io(URL);