const {expect} = require('chai');

describe('RubyPool', ()=>{
    let SMD, smd, deployer, alice, bob;
    //let LAND, land;
    let MARKET, market;

    beforeEach(async ()=>{

        [deployer, alice, bob] = await ethers.getSigners();
        
        //initialize ERC20 token contract
        SMD = await ethers.getContractFactory("SquareMarketDollar");
        smd = await SMD.deploy(10000);
        
        //initialize Land contract
        LAND = await ethers.getContractFactory("Land");
        land = await LAND.deploy(10);
      
        //initialize Market contract
        MARKET = await ethers.getContractFactory("SquareMarket");
        market = await MARKET.deploy(smd.address, land.address);
        
        //give initial balances
        smd.transfer(alice.address, 300)
        smd.transfer(bob.address, 500)

    })
    
    
    describe('Initialization correctness', ()=>{

        it('Should set initial owner of lands to deployer address: ', async ()=>{
            let rows = await land.rows();
            let columns = await land.columns();

            for(let i = 0; i < rows; i++){
                for(let j = 0; j < columns; j++){
                    expect(await land.ownerOf(i,j)).to.equal(deployer.address)
                }
            }
        })

        it('Should not allow to acces non-existing lands: ', async ()=>{
            await expect(land.ownerOf(1,100)).to.be.revertedWith("SquareLand: This land does not exists")
        })

        
    })


    describe('Purchase process correctness: correcctness', ()=>{

        it('should correctly approve market to sell Land:', async ()=>{
            await land._approve(market.address, 1, 1);
            expect(await(land.approved(1,1))).to.equal(market.address)
        })

        it('should correctly approve market to process ERC20 payment:', async ()=>{
            await land._approve(market.address, 1, 1);
            await smd.connect(alice).approve(market.address, 100);
            await market.connect(alice).buy(1,1)
            expect(await(land.ownerOf(1,1))).to.equal(alice.address);
        })

        it('should not allow to buy a land when user did not approved market to sell', async() => {
            await smd.approve(market.address, 100);
            await expect(market.connect(alice).buy(1,1)).to.be.revertedWith("SquareLand: not allowed");
        })
    })



})
