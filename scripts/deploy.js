let deployer
let SMD, LAND, MARKET

async function init(){
    [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const smd = await ethers.getContractFactory("SquareMarketDollar");
    SMD = await smd.deploy(BigInt(10000 * 10 ** 18));

    const land = await ethers.getContractFactory("Land");
    LAND = await land.deploy(10);

    const market = await ethers.getContractFactory("SquareMarket");
    MARKET = await market.deploy(SMD.address, LAND.address);
    
    console.log("smd contractt      :", SMD.address)
    console.log("land contractt     :", LAND.address)
    console.log("market contract    :", MARKET.address)
}

async function getOwner(){
    let abi = [
        'function ownerOf(uint256 _x, uint256 _y) view'
    ]    
    const provider = new ethers.providers.InfuraProvider(
        'goerli',
        'INFURA_KEY'
    )
    let address = '0x5119F323E282828422E0f3a89F6DD5f2d5d1BFBd'
    let contract = new ethers.Contract(address, abi, provider);

    console.log(await contract.ownerOf(0,0))
}
init()
//getOwner()
  
// smd contractt      : 0xF549Baf1b46f5514EDC2Fe96C685f6B9eD968Bb9
// land contractt     : 0xD8dfb2814E9c7335600Dd724fdd9948C0883D111
// market contract    : 0x3660461673c31c1Ad5F67E757C600b1517AcB58f
