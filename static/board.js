const socket = io();
// Options
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true});
console.log(username);
if (!username || !room) {
  window.location.replace("/index.html");
}

socket.emit('join', {username, room});
