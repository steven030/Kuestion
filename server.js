const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = "." + req.url;

    if (filePath === "./") {
        filePath = "./index.html";
    }

    const ext = path.extname(filePath);

    const mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css"
    };

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("Archivo no encontrado");
            return;
        }

        res.writeHead(200, {
            "Content-Type": mimeTypes[ext] || "text/plain"
        });

        res.end(content);
    });
});

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});