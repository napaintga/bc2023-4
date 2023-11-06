const http = require('http');
const xml = require('fast-xml-parser');
const fs = require('fs');

const port = 8000;

function parsexml() {
    const xmlData = fs.readFileSync('data.xml', 'utf-8');
    const parser = new xml.XMLParser();
    const jsonObj = parser.parse(xmlData);

    if (jsonObj.auctions && jsonObj.auctions.auction) {
        const auctions = jsonObj.auctions.auction;

        const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>\n<data>${auctions
            .map((auction) => {
                return `\n<auction>\n<code>${auction.StockCode}</code>\n<currency>${auction.ValCode}</currency>\n<attraction>${auction.Attraction}</attraction>\n</auction>`;
            })
            .join('\n')}\n</data>`;

        fs.writeFileSync('data4.xml', xmlStr, 'utf-8');
        console.log('Modified');
    } else {
        console.log('Invalid XML');
    }
}

http.createServer(function (req, res) {
    parsexml();
    console.log('Server is working');
    const xmlData = fs.readFileSync('data4.xml', 'utf-8');
    res.setHeader('Content-Type', 'application/xml');
    res.end(xmlData);

}).listen(port);
