const net = require('net');

// Server
const clients = [];
const registeredClients = ["alan", "pedro", "jose"];

const server = net.createServer((client) => {

    
    let username;
    client.write('Enter your username: ');

    client.on('data', (data) => {
        data = data.toString().trim();
        let flag = false;

        registeredClients.forEach(client => {
            if(client === data){
                flag = true
            }
        })
        if (!username) {

            //clients.map

            if (!flag) {
                console.log(`User ${data} is not registered`);
                client.end();
                return;
            }
            console.log(`Client ${data} connected`);
            messages(`${data}` + " has joined the chat", client);
            username = data;
            clients.push(client);
            return;
        }
    
        console.log(`Received message: ${data}`);
        messages(data, client, username);
    });

    /*clients.push(client);

    client.once('data', (data) => {
        if (registeredClients.includes(data.toString().trim())) {
            console.log(data + " connect");
            clients.push({ name: clientName, client });
            clients.push(client);
            client.write("Welcome: "+data);
            messages(data + " has joined the chat", client);
        } else {
            client.write('Unauthorized access, connection closed');
            client.end()
        }
    });*/

    /*client.on('data', (data) => {
        console.log(`Received message: ${data}`);
        messages(data, client);
    });*/

    client.on('end', () => {
        //let disconnectedClient = clients.find(c => c.client === client);
        console.log('Connection failed');
        //clients.splice(clients.indexOf(client), 1);
    });

    client.on('error', (error) => {
        //let disconnectedClient = clients.find(c => c.client === client);
        //let data = 'Client disconnected';
        console.log(`Client disconnected`);
        clients.splice(clients.indexOf(client), 1);
        messages("has left the chat", client);
        
    });

});

function messages(message, sender, username) {
    clients.forEach((client) => {
        if (client === sender) {
            return;
        }else{
            if(username == undefined){
                username = "Chat"
                client.write(`${username}: ${message}`);
            }else{
                client.write(`${username}: ${message}`);
            }
            //client.write(`${username}: ${message}`);
        }
    });
}

/*function messages(message, sender) {
    clients.forEach((client) => {
        if (client === sender) {
            return;
        }else{
            client.write(message);
        }
    });

}*/
server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});