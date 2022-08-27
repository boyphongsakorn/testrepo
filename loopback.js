const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var fs = require('fs')

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function get_one() {
    //read checkrange file
    let lotto = []
    let checkrange = fs.readFileSync('checkrange', 'utf8')
    checkrange = parseInt(checkrange)
    //for (let i = checkrange; i <= checkrange + 500; i++) {
        //let lotnumber = i.padStart(6, '0')
        let channels
        let allwin = []
        await fetch('https://lotapi.pwisetthon.com/god')
            .then(res => res.json())
            .then((body) => {
                channels = body.splice(408)
                console.log(channels)
            })
        for (const val of channels) {
            console.log(val)
            await fetch('https://lotapi.pwisetthon.com/?date=' + val + '&from')
                .then(res => res.json())
                .then((body) => {
                    lotto.push(body)
                    /*for (let index = 0; index < body.length; index++) {
                        const element = body[index];
                        if (element.includes(padLeadingZeros(i, 6).toString())) {
                            allwin.push(body[0][0])
                            console.log('https://lotapi.pwisetthon.com/?date=' + val + '&from')
                        }
                    }*/

                })
        //}
        //res.send(allwin)
        /*fs.writeFile("tmp/" + padLeadingZeros(i, 6), JSON.stringify(allwin), function (err) {
            if (err) throw err;
            //res.send(yearlist)
        });*/
    }
    //loop lotto
    for (let x = checkrange; x <= (checkrange + 500); x++) {
        allwin = []
        for (let i = 0; i < lotto.length; i++) {
            //console.log(lotto[i])
            for (let j = 0; j < lotto[i].length; j++) {
                //console.log(lotto[i][j])
                //for (let k = 0; k < lotto[i][j].length; k++) {
                    //console.log(lotto[i][j][k])
                    if(lotto[i][j].includes(padLeadingZeros(x, 6).toString())){
                        console.log(lotto[i][j])
                        allwin.push(lotto[i][j][0])
                    }
                //}
            }
        }
        fs.writeFile("tmp/" + padLeadingZeros(x, 6), JSON.stringify(allwin), function (err) {
            if (err) throw err;
            //res.send(yearlist)
        });
    }
    fs.writeFile("checkrange", (checkrange + 500).toString(), function (err) {
        if (err) throw err;
        //res.send(yearlist)
    });
}

get_one()