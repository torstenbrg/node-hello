const http = require('http');
const fs = require('fs').promises;  // Use the promises version of fs
const path = require('path');
const server = http.createServer(async (req, res) => {
    let fileName = req.url === '/' ? 'index.html' : req.url
    contentType = getContentType(res, fileName);
    let filePath = path.join(__dirname, fileName);
    try {
        await fs.access(filePath);
        res.statusCode = 200;// set headers and send the file content
        res.setHeader('Content-Type', contentType);
        const content = await fs.readFile(filePath);
        res.end(content);
    } catch (err) {
        res.statusCode = 404;// If file doesn't exist, send a 404 response
        res.end('Not Found');
    }
});
function getContentType(res, filePath) {
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.js') {
        contentType = 'application/javascript';
    }
    return contentType;
}
const PORT = 5001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


//ngrok config add-authtoken 2v7Iuh1syQCPbT9PPaulqe1ocvP_3xjEEDKWDUFoVUc1YqQpE
//Authtoken saved to configuration file: C:\Users\torst\AppData\Local/ngrok/ngrok.yml
//https://b99b-78-82-220-36.ngrok-free.app

