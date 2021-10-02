const fetch = require('node-fetch');
var fs = require('fs')

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function get_one() {
    for (let snum = process.env.number; snum <= process.env.number; snum++) {

        await fetch('https://lotapi.pwisetthon.com/finddol?search=' + padLeadingZeros(snum, 6),{method: 'GET'})
            .then(res => res.json())
            .then((body) => {
                console.log(padLeadingZeros(snum, 6))
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

/*async function get_one() {
let result = ""
    fetch('http://localhost:' + port + '/?date=' + req.query.by)
        .then(res => res.json())
        .then((body) => {
            body.forEach(function (val, x) {
                val.forEach(function (superval, y) {
                    if (superval == req.query.search || superval == req.query.search.substr(0, 3) || superval == req.query.search.substr(3, 6) || superval == req.query.search.substr(4, 6) && y != 0) {
                        if (x == 0) {
                            result = result + "111111,";
                        }
                        if (x == 1) {
                            result = result + "333000,";
                        }
                        if (x == 2) {
                            result = result + "000333,";
                        }
                        if (x == 3) {
                            result = result + "000022,";
                        }
                        if (x == 4) {
                            result = result + "111112,";
                        }
                        if (x == 5) {
                            result = result + "222222,";
                        }
                        if (x == 6) {
                            result = result + "333333,";
                        }
                        if (x == 7) {
                            result = result + "444444,";
                        }
                        if (x == 8) {
                            result = result + "555555,";
                        }
                    }
                })
            })
            res.send(result.substring(0, result.length - 1))
        })*/
    /*for (let snum = 0; snum < 999999; snum++) {
        let channels
        let allwin = []
        await fetch('https://raw.githubusercontent.com/boyphongsakorn/testrepo/main/god')
            .then(res => res.json())
            .then((body) => {
                channels = body.splice(408)
                //console.log(channels)
            })
        for (const val of channels) {
            //console.log(val)
            await fetch('https://lotapi.pwisetthon.com/?date=' + val + '&from')
                .then(res => res.json())
                .then((body) => {
                    for (let index = 0; index < body.length; index++) {
                        const element = body[index];
                        if (element.includes(snum)) {
                            allwin.push(body[0][0])
                            //console.log('http://localhost:' + port + '/?date=' + val + '&from')
                        }
                    }
                })
        }
        console.log(padLeadingZeros(snum, 6))
        fs.writeFile("tmp/" + padLeadingZeros(snum, 6), JSON.stringify(allwin), function (err) {
            if (err) throw err;
            //res.send(yearlist)
        });
    }
}

get_one()*/
