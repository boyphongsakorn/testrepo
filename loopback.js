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
    /*let checkrange = fs.readFileSync('checkrange', 'utf8')
    checkrange = parseInt(checkrange)*/
    //for (let i = checkrange; i <= checkrange + 500; i++) {
    //let lotnumber = i.padStart(6, '0')
    let channels
    let allwin = []
    await fetch('https://lotapi.pwisetthon.com/god')
        .then(res => res.json())
        .then((body) => {
            channels = body.splice(408)
            //console.log(channels)
        })
    for (const val of channels) {
        console.log(val)
        try {
            // await fetch('https://lotapi.pwisetthon.com/?date=' + val + '&from=true')
            //     .then(res => res.json())
            //     .then((body) => {
            //         lotto.push(body)
            //         /*for (let index = 0; index < body.length; index++) {
            //             const element = body[index];
            //             if (element.includes(padLeadingZeros(i, 6).toString())) {
            //                 allwin.push(body[0][0])
            //                 console.log('https://lotapi.pwisetthon.com/?date=' + val + '&from')
            //             }
            //         }*/
            //     })
            const api1 = await fetch('https://lotapi.pwisetthon.com/?date=' + val + '&from=true')
            const body1 = await api1.json()
            lotto.push(body1)
        } catch (error) {
            // await fetch('https://lottsanook-cfworker.boy1556.workers.dev/?date=' + val + '&from=true')
            //     .then(res => res.json())
            //     .then((body) => {
            //         lotto.push(body)
            //         /*for (let index = 0; index < body.length; index++) {
            //             const element = body[index];
            //             if (element.includes(padLeadingZeros(i, 6).toString())) {
            //                 allwin.push(body[0][0])
            //                 console.log('https://lotapi.pwisetthon.com/?date=' + val + '&from')
            //             }
            //         }*/
            //     })
            const api2 = await fetch('https://lottsanook-cfworker.boy1556.workers.dev/?date=' + val + '&from=true')
            const body2 = await api2.json()
            lotto.push(body2)
        }
        //}
        //res.send(allwin)
        /*fs.writeFile("tmp/" + padLeadingZeros(i, 6), JSON.stringify(allwin), function (err) {
            if (err) throw err;
            //res.send(yearlist)
        });*/
    }
    //loop lotto
    for (let x = 0; x <= 999999; x++) {
        allwin = []
        for (let i = 0; i < lotto.length; i++) {
            //console.log(lotto[i])
            for (let j = 0; j < lotto[i].length; j++) {
                //console.log(lotto[i][j])
                for (let k = 0; k < lotto[i][j].length; k++) {
                    // console.log(lotto[i][j][k])
                // if (lotto[i][j].includes(padLeadingZeros(x, 6))) {
                // if (padLeadingZeros(lotto[i][j], 6).toString().includes(padLeadingZeros(x, 6).toString())) {
                // if (lotto[i][j] == padLeadingZeros(x, 6)) {
                //     //console.log(lotto[i][j])
                //     allwin.push(lotto[i][0][0])
                //     // console.log(x)
                //     // console.log(lotto[i][0][0])
                // }
                    if (lotto[i][j][k] == padLeadingZeros(x, 6) && lotto[i][j][k].length == 6) {
                        //console.log(lotto[i][j])
                        allwin.push(lotto[i][0][0])
                        // console.log(x)
                        // console.log(lotto[i][0][0])
                    }
                }
            }
        }
        if (allwin.length > 0) {
            //check if file exist
            const exit = await fs.existsSync("tmp/" + padLeadingZeros(x, 6))
            if(exit){
                //read file
                const thisfile = await fs.readFileSync("tmp/" + padLeadingZeros(x, 6), 'utf8')
                //get array
                const thisarray = JSON.parse(thisfile)
                //add new array
                allwin = allwin.concat(thisarray)
                //remove duplicate
                allwin = [...new Set(allwin)]
                //remove word รางวัลที่1
                allwin = allwin.filter(function (el) {
                    return el != "รางวัลที่1";
                })
            }
            //write file
            // fs.writeFile("tmp/" + padLeadingZeros(x, 6), JSON.stringify(allwin), function (err) {
            //     if (err) throw err;
            //     //res.send(yearlist)
            // });
            await fs.writeFileSync("tmp/" + padLeadingZeros(x, 6), JSON.stringify(allwin))
        }
    }
    for (let x = 0; x <= 999; x++) {
        allwin = []
        for (let i = 0; i < lotto.length; i++) {
            //console.log(lotto[i])
            for (let j = 0; j < lotto[i].length; j++) {
                //console.log(lotto[i][j])
                for (let k = 0; k < lotto[i][j].length; k++) {
                    // console.log(lotto[i][j][k])
                // if (lotto[i][j].includes(padLeadingZeros(x, 6))) {
                // if (padLeadingZeros(lotto[i][j], 6).toString().includes(padLeadingZeros(x, 6).toString())) {
                // if (lotto[i][j] == padLeadingZeros(x, 6)) {
                //     //console.log(lotto[i][j])
                //     allwin.push(lotto[i][0][0])
                //     // console.log(x)
                //     // console.log(lotto[i][0][0])
                // }
                    if (lotto[i][j][k] == padLeadingZeros(x, 3) && lotto[i][j][k].length == 3) {
                        //console.log(lotto[i][j])
                        allwin.push(lotto[i][0][0])
                        // console.log(x)
                        // console.log(lotto[i][0][0])
                    }
                }
            }
        }
        if (allwin.length > 0) {
            //check if file exist
            const exit = await fs.existsSync("tmp/" + padLeadingZeros(x, 3))
            if(exit){
                //read file
                const thisfile = await fs.readFileSync("tmp/" + padLeadingZeros(x, 3), 'utf8')
                //get array
                const thisarray = JSON.parse(thisfile)
                //add new array
                allwin = allwin.concat(thisarray)
                //remove duplicate
                allwin = [...new Set(allwin)]
                //remove word รางวัลที่1
                allwin = allwin.filter(function (el) {
                    return el != "รางวัลที่1";
                })
            }
            //write file
            // fs.writeFile("tmp/" + padLeadingZeros(x, 6), JSON.stringify(allwin), function (err) {
            //     if (err) throw err;
            //     //res.send(yearlist)
            // });
            await fs.writeFileSync("tmp/" + padLeadingZeros(x, 3), JSON.stringify(allwin))
        }
    }
    for (let x = 0; x <= 99; x++) {
        allwin = []
        for (let i = 0; i < lotto.length; i++) {
            //console.log(lotto[i])
            for (let j = 0; j < lotto[i].length; j++) {
                //console.log(lotto[i][j])
                for (let k = 0; k < lotto[i][j].length; k++) {
                    // console.log(lotto[i][j][k])
                // if (lotto[i][j].includes(padLeadingZeros(x, 6))) {
                // if (padLeadingZeros(lotto[i][j], 6).toString().includes(padLeadingZeros(x, 6).toString())) {
                // if (lotto[i][j] == padLeadingZeros(x, 6)) {
                //     //console.log(lotto[i][j])
                //     allwin.push(lotto[i][0][0])
                //     // console.log(x)
                //     // console.log(lotto[i][0][0])
                // }
                    if (lotto[i][j][k] == padLeadingZeros(x, 2) && lotto[i][j][k].length == 2) {
                        //console.log(lotto[i][j])
                        allwin.push(lotto[i][0][0])
                        // console.log(x)
                        // console.log(lotto[i][0][0])
                    }
                }
            }
        }
        if (allwin.length > 0) {
            //check if file exist
            const exit = await fs.existsSync("tmp/" + padLeadingZeros(x, 2))
            if(exit){
                //read file
                const thisfile = await fs.readFileSync("tmp/" + padLeadingZeros(x, 2), 'utf8')
                //get array
                const thisarray = JSON.parse(thisfile)
                //add new array
                allwin = allwin.concat(thisarray)
                //remove duplicate
                allwin = [...new Set(allwin)]
                //remove word รางวัลที่1
                allwin = allwin.filter(function (el) {
                    return el != "รางวัลที่1";
                })
            }
            //write file
            // fs.writeFile("tmp/" + padLeadingZeros(x, 6), JSON.stringify(allwin), function (err) {
            //     if (err) throw err;
            //     //res.send(yearlist)
            // });
            await fs.writeFileSync("tmp/" + padLeadingZeros(x, 2), JSON.stringify(allwin))
        }
    }
    /*fs.writeFile("checkrange", (checkrange + 500).toString(), function (err) {
        if (err) throw err;
        //res.send(yearlist)
    });*/
}

get_one()
