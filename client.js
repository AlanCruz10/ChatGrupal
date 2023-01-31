
const net = require('net');
const client = new net.Socket();
/*const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout});*/

  client.connect(8000, '127.0.0.1', () => {
    
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log(`${data}`);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (error) => {
  console.log(`Server closed: ${error.message}`);
});

/*process.stdin.once('data', (data) => {
  client.write(data.toString().trim());
});*/

process.stdin.on('data', (data) => {
    client.write(data.toString().trim());
});


/*client.connect(8000, '127.0.0.1', () => {
    console.log('Connected to server');
});

client.on('data', (data) => {
    console.log(`Received message: ${data}`);
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (error) => {
  console.log(`Connection closed: ${error.message}`);
});

process.stdin.on('data', (data) => {
    client.write(data.toString().trim());
});*/
