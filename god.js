const fetch = require('node-fetch');
const cheerio = require('cheerio')
var fs = require('fs')

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

async function get_request() {
    let year = 2533;
    let preyearlist = [];
    let preyearsuperlist = [];
    let yearlist = [];
    let nextyear = new Date().getFullYear() + 543;
    let channel = [];
    //let jdata
    let countloveme = 0
    var fileContents = null;
    try {
        //fileContents = fs.readFileSync('tmp/cache.txt');
        fileContents = fs.readFileSync('god');
    } catch (err) {
    }
    if (fileContents) {
        yearlist = JSON.parse(fileContents);
        if (
            yearlist[yearlist.length - 1].substring(4, 8) ==
            new Date().getFullYear() + 543
        ) {
            year = new Date().getFullYear() + 543;
        } else {
            year = yearlist[yearlist.length - 1].substring(4, 8)
        }
        yearlist.forEach(function (value, i) {
            if (
                value.substring(4, 8) ==
                year
            ) {
                countloveme--;
            }
        });
        yearlist.splice(countloveme);
    }
    let day
    while (year <= nextyear) {
        channel = []
        for (let i = 0; i < 10; i++) {
            preyearsuperlist = [];
            preyearlist = [];
            let peryear = [];
            let ayear = year + i
            if (ayear > nextyear) {
                break
            }
            await fetch('https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%9B%E0%B8%B5-' + ayear + '.aspx')
                .then(res => res.text())
                .then((body) => {
                    /*const url = 'https://www.myhora.com/%E0%B8%AB%E0%B8%A7%E0%B8%A2/%E0%B8%9B%E0%B8%B5-' + ayear + '.aspx';
                    const res = await fetch(url);
                    const body = await res.text();*/
                    var $ = cheerio.load(body);
                    for (const val of $('font').toArray()) {
                        if (val.firstChild.data.indexOf('ตรวจสลากกินแบ่งรัฐบาล') > -1) {
                            day = val.firstChild.data.split(" ").splice(2)
                            let monthnum
                            switch (day[2]) {
                                case 'มกราคม': monthnum = "01"; break;
                                case 'กุมภาพันธ์': monthnum = "02"; break;
                                case 'มีนาคม': monthnum = "03"; break;
                                case 'เมษายน': monthnum = "04"; break;
                                case 'พฤษภาคม': monthnum = "05"; break;
                                case 'มิถุนายน': monthnum = "06"; break;
                                case 'กรกฎาคม': monthnum = "07"; break;
                                case 'สิงหาคม': monthnum = "08"; break;
                                case 'กันยายน': monthnum = "09"; break;
                                case 'ตุลาคม': monthnum = "10"; break;
                                case 'พฤศจิกายน': monthnum = "11"; break;
                                case 'ธันวาคม': monthnum = "12"; break;
                            }
                            peryear.unshift(padLeadingZeros(day[0], 2) + monthnum + day[3])
                            preyearsuperlist.unshift(padLeadingZeros(day[0], 2) + monthnum + day[3])
                        }
                    }
                    for (const val of peryear) {
                        yearlist.push(val)
                    }
                    for (const val of preyearsuperlist) {
                        preyearlist.push(val)
                        /*try {
                            if (day[3] == new Date().getFullYear() + 543) {
                                fs.unlinkSync('tmp/' + req.query.date + '.txt');
                                console.log('yes this year')
                            }
                        } catch (err) {
         
                        }
                        fs.writeFile('tmp/' + day[3] + '.txt', JSON.stringify(preyearlist), function (err) {
                            if (err) throw err;
                        });*/
                    }
                })
        }
        year += 10
    }
    /*fs.writeFile('tmp/cache.txt', JSON.stringify(yearlist), function (err) {
        if (err) throw err;
        res.send(yearlist)
    });*/
    fs.writeFile('god', JSON.stringify(yearlist), function (err) {
        if (err) throw err;
        //res.send(yearlist)
    });
}

get_request()

async function get_zero() {
    let channels
    let allwin = []
    var fileContents = null;
    try {
        //fileContents = fs.readFileSync('tmp/cache.txt');
        fileContents = fs.readFileSync('god');
    } catch (err) {
    }
    if (fileContents) {
        yearlist = JSON.parse(fileContents);
        channels = yearlist.splice(408);
    }
    /*await fetch('http://localhost:' + port + '/god')
        .then(res => res.json())
        .then((body) => {
            channels = body.splice(408)
        })*/
    for (const val of channels) {
        //console.log(val)
        await fetch('https://lotapi3.pwisetthon.com/api/?date=' + val + '&from=true')
        .then(res => res.json())
        .then((body) => {
            for (let index = 0; index < body.length; index++) {
                const element = body[index];
                if (element.indexOf("21") >= 0) {
                    allwin.push(body[0][0])
                }
            }
        });
    }
    fs.writeFile('21', JSON.stringify(allwin), function (err) {
        if (err) throw err;
        //res.send(yearlist)
    });
}

get_zero()