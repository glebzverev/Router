dexscreen = require("dexscreener-api"); 
const path = require("./Coin.json");

var fs = require('fs');


async function getPairs(path){
    const json = require(path);
    coin = []
    for (var i in json){
        for (var j in json[i]){
            if (! (j in coin)){
                coin.push(j)
            }
        }
    }
    return coin;
}

function addData(resp, dict){
    var base = resp['baseToken']['symbol'];
    var quote = resp['quoteToken']['symbol'];
    var dex = resp['dexId'];
    var pair = resp['pairAddress'];
    console.log(base +' ' + quote);
    console.log(resp['dexId']);
    if (!dict.has((base +' ' + quote))){
        dict.set((base +' ' + quote), [(pair + ' ' + dex)]);
    } 
    else {
        console.log('ELSE');
        var arr = dict.get(base +' ' + quote);
        arr = arr.push((pair + ' ' + dex));
        console.log(arr);
        dict.set((base +' ' + quote), arr);
    }
} 

async function data(path){
    var dict = new Map();
    let coin = await getPairs(path);
    for (var i in coin){
        for (var j in coin){
            if (i!=j){
                try{
                    let searchResponse = await dexscreen.searchPairsMatchingQuery(i);
                    for (var k in searchResponse['pairs']){
                        if (searchResponse['pairs'][k]['chainId']=='ethereum') 
                            addData(searchResponse['pairs'][k], dict);
                    }           
                }
                catch{
                    console.log("error");                
                }
            }
        }
    }
    console.log(dict);
}

async function getPair(token1, token2){
    // let token = await path['eth']['USDT'];
    console.log(token1, token2);
    let searchResponse = await dexscreen.searchPairsMatchingQuery(`${token1}  ${token2}`);
    // console.log(searchResponse);
    return searchResponse;
}

// data(path);
async function main () {
    var data = {};
    for ( var i in path ){
        let resp = await getPair(path[i], path[i+1])
    // console.log(resp);
    for (var j in resp['pairs']){
        console.log(resp['pairs'][j])
        data[resp['pairs'][j]['pairAddress']] = resp['pairs'][j];
    }
    }


    var jsonData = JSON.stringify(data);
    fs.writeFile("data.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

main()
