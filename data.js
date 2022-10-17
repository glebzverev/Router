dexscreen = require("dexscreener-api"); 
const path = require("./Coin.json");


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

async function getPair(){
    let token = await path['eth']['USDT'];
    console.log(token);
    let searchResponse = await dexscreen.searchPairsMatchingQuery(token + " 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
    console.log(searchResponse);
}

// data(path);
getPair()