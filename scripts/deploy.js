const hre = require("hardhat");
var tokens = require("./../data/tokens.json");
const path = require('path');

var fs = require('fs');

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  for (var i in tokens){
    console.log(i);
    const token = await Token.deploy(i,i);
    await token.deployed();
    tokens[i] = token.address;
  }
  const filePath = path.join(__dirname, './../data/tokens.json');
  console.log(tokens);
  const data = await JSON.stringify(tokens)
   fs.writeFile(filePath, data, 'utf8', (err)=> {
    if (err) {
        console.log(err);
    }
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
