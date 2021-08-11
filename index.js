const http = require('http');
const url = require('url');
const fs = require('fs');


http.createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    const nombre = params.archivo;
    const contenido = params.contenido;
    const date = new Date();
    let day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    const fecha_actual = day + '/' + month + '/' + year;
    const contenido_final = fecha_actual + '\n' + contenido
    const pathFile = `./db/${nombre}.txt`
    if (req.url.includes('/crear')) {
        try {

            fs.writeFileSync(pathFile, contenido_final);
            res.write('Archivo creado con exito')
            res.end();
        } catch (e) {
            res.write(e)
        }
    }
    if (req.url.includes('/leer')) {
        fs.readFile(pathFile, (err, data) => {

            res.write(data)
            res.end()
        })
    }
    if (req.url.includes('/renombrar')) {
        fs.rename('Gastos.txt', pathFile, (err, data) => {
            res.write(`Archivo Gastos.txt renombrado por ${pathFile}`)
            res.end()
        })
    }
    if (req.url.includes('/eliminar')) {
        fs.unlink(pathFile, (err, data) => {
            res.write(`Archivo ${pathFile} eliminado con éxito`)
            res.end()
        })
    }

}).listen(8080, () => {
    console.log('Server is running on port 8080...');
});