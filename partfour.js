const fetch = require('node-fetch');
const cheerio = require('cheerio')
var fs = require('fs')

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function get_one() {
    for (let snum = 7500; snum < 10000; snum++) {

        await fetch('https://lotapi.pwisetthon.com/finddol?search=' + padLeadingZeros(snum, 6), { "method": "GET" })
            .then(res => res.json())
            .then((body) => {
                if (body.length != 0) {
                    fs.writeFile("tmp/" + padLeadingZeros(snum, 6), JSON.stringify(body), function (err) {
                        if (err) throw err;
                        //res.send(yearlist)
                    });
                }
            });
    }
}

get_one()
