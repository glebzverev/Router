const axios = require("axios");
const subgraph = require("./subgraph.json");
const API_KEY = "66b80d3d689772ba05ed3461d4d6cb30";
const endpoint = "https://gateway.thegraph.com/api/";

function concatURI(id){
  console.log(id);  
  return `${endpoint}${API_KEY}/subgraphs/id/${id}`
}

function gmmmQuery(amount){
  return `{
    pools(first: ${amount}) {
      name
      swapAddress
      coinCount
      coins(first:10){
        token {
          id
          name
        }
        balance
      }
      adminFee
      fee
    }
  }`
};

function ammQuery(amount){
    return `{
        pairs(first: ${amount}) {
          id
          token0{
            id
            name
          }    
          reserve0
          token0Price
          volumeToken0
          token1{
            id
            name
          }
          reserve1
          token1Price
          volumeToken1
        }
      }`;
  }

for (var i in subgraph['AMM']){
    try{
        axios.post(concatURI(subgraph['AMM'][i]), {query: ammQuery(10)})
            .then((result)=> {
                console.log(result.data.data);
            })
    } catch(error){
        console.log(error);
    }
};

for (var j in subgraph['GMMM']){
  try{
      axios.post(concatURI(subgraph['GMMM'][j]), {query: gmmmQuery(10)})
          .then((result)=> {
              console.log(result.data.data);
          })
  } catch(error){
      console.log(error);
  }
} 