const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var fs = require('fs')

async function get_one() {
    await fetch('https://lotapi.pwisetthon.com/lotnews?count=40')
        .then(res => res.json())
        .then((body) => {
            //res.send(allwin)
            if (body.status != 500 || body.statusCode != 500) {
                fs.writeFile("latestnews.json", JSON.stringify(body), function (err) {
                    if (err) throw err;
                    //res.send(yearlist)
                });
            }
        })
}

get_one()
