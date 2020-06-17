// const fs = require('fs');
const axios = require("axios").default;

// function getData() {
//     return new Promise(resolve => {
//         fs.readFile('Invest.json', 'utf8', (err, data) => {
//             if (err) throw err
//             resolve(JSON.parse(data));
//         });
//     });
// }

const getQuotes = (tickerList) => {
  return new Promise((resolve, reject) => {
    let symbols = "";
    for (let i = 0; i < tickerList.length; i++) {
      if (i == 0) {
        symbols += tickerList[i];
      } else {
        symbols += "%2C" + tickerList[i];
      }
    }

    axios({
      method: "GET",
      url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "x-rapidapi-key": "3c3c309a6amshec3bde770cc93ecp10a5cfjsn5068fba5792a",
        useQueryString: true,
      },
      params: {
        region: "US",
        lang: "en",
        symbols: symbols,
      },
    })
      .then((response) => {
        // console.log(response.data.quoteResponse.result);
        resolve(response.data.quoteResponse.result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

function getDataByFunds(data) {
  return new Promise((resolve) => {
    // let data = [{"date":"5/1/2020","ticker":"USD","priceShare":"1","totalPrice":"2000.00 ","totalQuantity":"2000.0000 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/9/2020","ticker":"USO","priceShare":"21.2","totalPrice":"5300.00 ","totalQuantity":"250.0000 ","account":"IB","fund":"Energy","summary":""},{"date":"5/11/2020","ticker":"BTC-USD","priceShare":"8480.49","totalPrice":"50.00 ","totalQuantity":"0.0059 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/11/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/12/2020","ticker":"BTC-USD","priceShare":"8937.2","totalPrice":"50.00 ","totalQuantity":"0.0056 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/12/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/13/2020","ticker":"BTC-USD","priceShare":"9180.31","totalPrice":"50.00 ","totalQuantity":"0.0054 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/13/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/13/2020","ticker":"BTC-USD","priceShare":"9273.39","totalPrice":"-150.00","totalQuantity":"-0.0162","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/13/2020","ticker":"USD","priceShare":"1","totalPrice":"150.00 ","totalQuantity":"150.0000 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/14/2020","ticker":"BTC-USD","priceShare":"9623.33","totalPrice":"200.00 ","totalQuantity":"0.0208 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/14/2020","ticker":"USD","priceShare":"1","totalPrice":"-200.00","totalQuantity":"-200.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/14/2020","ticker":"GDX","priceShare":"35.27","totalPrice":"5290.50 ","totalQuantity":"150.0000 ","account":"IRA-Fidelity","fund":"Gold","summary":""},{"date":"5/15/2020","ticker":"BTC-USD","priceShare":"9546.38","totalPrice":"50.00 ","totalQuantity":"0.0052 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/15/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/16/2020","ticker":"BTC-USD","priceShare":"9444.51","totalPrice":"50.00 ","totalQuantity":"0.0053 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/16/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/17/2020","ticker":"BTC-USD","priceShare":"9797.1","totalPrice":"50.00 ","totalQuantity":"0.0051 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/17/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/18/2020","ticker":"BTC-USD","priceShare":"9764.44","totalPrice":"50.00 ","totalQuantity":"0.0051 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/18/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/19/2020","ticker":"CINF","priceShare":"51.995","totalPrice":"519.95 ","totalQuantity":"10.0000 ","account":"IRA-Fidelity","fund":"Finance","summary":""},{"date":"5/19/2020","ticker":"BRKB","priceShare":"174.11","totalPrice":"696.44 ","totalQuantity":"4.0000 ","account":"IRA-Fidelity","fund":"Finance","summary":""},{"date":"5/21/2020","ticker":"GDX","priceShare":"35.28","totalPrice":"-2469.60","totalQuantity":"-70.0000","account":"IRA-Fidelity","fund":"Gold","summary":""},{"date":"5/21/2020","ticker":"CINF","priceShare":"56.49","totalPrice":"564.90 ","totalQuantity":"10.0000 ","account":"IRA-Fidelity","fund":"Finance","summary":""},{"date":"5/21/2020","ticker":"USO","priceShare":"26.09","totalPrice":"-3913.50","totalQuantity":"-150.0000","account":"IB","fund":"Energy","summary":""},{"date":"5/26/2020","ticker":"BTC-USD","priceShare":"8791.31","totalPrice":"50.00 ","totalQuantity":"0.0057 ","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/26/2020","ticker":"USD","priceShare":"1","totalPrice":"-50.00","totalQuantity":"-50.0000","account":"ETORO","fund":"Bitcoin","summary":""},{"date":"5/27/2020","ticker":"USO","priceShare":"25.035","totalPrice":"-2503.50","totalQuantity":"-100.0000","account":"IB","fund":"Energy","summary":""},{"date":"5/27/2020","ticker":"USD","priceShare":"1","totalPrice":"2503.50 ","totalQuantity":"2503.5000 ","account":"IB","fund":"Finance","summary":""}];
    let funds = [];
    let tickers = [];
    let squarifyObject = [];

    for (let i in data) {
      if (!funds.includes(data[i].fund)) {
        let newFund = {
          name: data[i].fund,
          value: 0,
          children: [
            {
              name: data[i].ticker,
              value: data[i].ticker == "USD" ? Number(data[i].totalPrice) : 0,
              quantity: Number(data[i].totalQuantity),
              purchasePrice: Number(data[i].totalPrice),
              fund: data[i].fund,
            },
          ],
        };
        squarifyObject.push(newFund);
        funds.push(data[i].fund);
      } else {
        let fundIndex = funds.indexOf(data[i].fund);
        let newTicker = true;
        let fundTickers = squarifyObject[fundIndex].children;
        for (let j in fundTickers) {
          if (fundTickers[j].name == data[i].ticker) {
            fundTickers[j].value +=
              data[i].ticker == "USD" ? Number(data[i].totalPrice) : 0;
            fundTickers[j].quantity += Number(data[i].totalQuantity);
            fundTickers[j].purchasePrice += Number(data[i].totalPrice);

            newTicker = false;
          }
        }
        if (newTicker) {
          fundTickers.push({
            name: data[i].ticker,
            value: data[i].ticker == "USD" ? Number(data[i].totalPrice) : 0,
            quantity: Number(data[i].totalQuantity),
            purchasePrice: Number(data[i].totalPrice),
            fund: data[i].fund,
          });
        }
      }
      if (data[i].ticker != "USD" && !tickers.includes(data[i].ticker)) {
        tickers.push(data[i].ticker);
      }
    }

    getQuotes(tickers).then((quotes) => {
      for (let i in squarifyObject) {
        for (let j in squarifyObject[i].children) {
          let currTicker = squarifyObject[i].children[j];
          if (currTicker.name == "USD") {
            squarifyObject[i].value += currTicker.purchasePrice;
            currTicker.percentChange = 0;
          } else {
            let quoteIndex = tickers.indexOf(currTicker.name);
            currTicker.value =
              quotes[quoteIndex].regularMarketPrice * currTicker.quantity;
            currTicker.marketPrice = quotes[quoteIndex].regularMarketPrice;
            squarifyObject[i].value +=
              quotes[quoteIndex].regularMarketPrice * currTicker.quantity;
            currTicker.percentChange =
              quotes[quoteIndex].regularMarketChangePercent;
          }
        }
      }
      resolve(squarifyObject);
    });
  });
}

export default getDataByFunds;
