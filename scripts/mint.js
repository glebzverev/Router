var tokens = require("./../data/tokens.json");
const TokenAbi = require('./../artifacts/contracts/Token.sol/Token.json').abi; 

async function main() {
const amount = ethers.utils.parseEther("1");
  for (var i in tokens){
    console.log(tokens[i]);
    const token = await ethers.getContractAt(TokenAbi, tokens[i]);
    let owner = await token.owner();
    try{
        let response = await token.mint(owner, amount);
        console.log(response);
    } catch (err){
        console.log("ERROR: ", err);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
