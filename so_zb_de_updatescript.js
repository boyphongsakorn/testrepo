const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

(async () => {
    const api = await fetch('https://api.github.com/repos/Koenkk/Z-Stack-firmware/git/trees/master?recursive=1')
    const json = await api.json()
    const tree = json.tree
    //find path coordinator/Z-Stack_3.x.0/bin in the tree
    const path = tree.find(({path}) => path === 'coordinator/Z-Stack_3.x.0/bin')
    //get url of the blob
    const url = path.url
    console.log(url)
    const blob = await fetch(url)
    const ajson = await blob.json()
    const atree = ajson.tree
    //find word launchpad_coordinator in paths of the tree
    const path2 = atree.find(({path}) => path.includes('launchpad_coordinator'))
    //get path of the blob
    const url2 = path2.path
    const downloadilnk = 'https://raw.githubusercontent.com/Koenkk/Z-Stack-firmware/master/'+path.path+'/'+url2
    console.log(downloadilnk)
    //read sonoff_zb_dongle_ex.sh file
    const sonoff_zb_dongle_ex = fs.readFileSync('sonoff_zb_dongle_ex.sh', 'utf8')
    //replace {{sonoff_zb_dongle_url}} with download link in sonoff_zb_dongle_ex.sh
    const sonoff_zb_dongle_ex_new = sonoff_zb_dongle_ex.replace('{{sonoff_zb_dongle_url}}', downloadilnk)
    //replace all {{donglezipfile}} with url2 in sonoff_zb_dongle_ex.sh
    const sonoff_zb_dongle_ex_new2 = sonoff_zb_dongle_ex_new.replace('{{donglezipfile}}', url2)
    //const sonoff_zb_dongle_ex_new3 = sonoff_zb_dongle_ex_new2.replace('{{donglezipfile}}', url2)
    //remove .zip from url2
    const url2withoutzip = url2.replace('.zip', '')
    const sonoff_zb_dongle_ex_new4 = sonoff_zb_dongle_ex_new2.replace('{{donglezipfile}}', url2withoutzip)
    //write sonoff_zb_dongle_ex.sh file
    fs.writeFileSync('sonoff_zb_dongle.sh', sonoff_zb_dongle_ex_new4)
})()