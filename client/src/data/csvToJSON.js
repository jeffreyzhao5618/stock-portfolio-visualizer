const fs = require('fs');

let dataArr = [];

fs.readFile('Invest.csv', 'utf8', (err, data) => {
    if (err) throw err;
    
    dataArr= data.split("\r\n");
    fs.writeFile('Invest.json', JSON.stringify(getProcessedArr()), (err) => {if (err) throw err});
});



function getProcessedArr() {
    let processedData = [];
    let keyList = dataArr[0].split(',');
    for(let i = 1; i < dataArr.length; i++){
        let newEntry = {};
        let newEntryVals = dataArr[i].split(',');
        for(let i = 0; i<keyList.length; i++) {
            newEntry[keyList[i]] = newEntryVals[i];
        }
        processedData.push(newEntry);
    }
    return processedData;
}
