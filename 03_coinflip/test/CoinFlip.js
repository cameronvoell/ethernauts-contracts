const { expect } = require("chai")
// const { solidity } = require("ethereum-waffle")
// const chai = require("chai")



describe("CoinFlip contract", function () {

    let coinFlip
    let coinFlipCheater
    let deployer
    let alice
    let bob
    let addrs

    const logger = ethers.utils.Logger.globalLogger()

    beforeEach(async function () {
        [deployer, alice, bob, ...addrs] = await ethers.getSigners()
        let coinFlipFactory = await ethers.getContractFactory("CoinFlip")
        coinFlip = await coinFlipFactory.deploy()

        let coinFlipCheaterFactory = await ethers.getContractFactory("CoinFlipCheater")
        coinFlipCheater = await coinFlipCheaterFactory.deploy(coinFlip.address)
        await coinFlipCheater.deployed()

        // chai.use(solidity)

    })

    it("initial consecutive wins should be 0", async function () {
        expect(await coinFlip.consecutiveWins()).to.equal(0)
    })

    it("10 random flips will result in a consecutive wins less than 10", async function () {
        for (let i = 0; i < 10; i++) {
            await coinFlip.flip(true)
        }
        expect(await coinFlip.consecutiveWins()).to.below(10)
    })

    it("coinflip cheater deployed correctly", async function () {
        expect(await coinFlip.consecutiveWins()).to.equal(0)
        expect(await coinFlipCheater.coinFlipAddress()).to.equal(coinFlip.address)
    })



    it("10 cheat flips will result in a consecutive wins equal to 10", async function () {

        let wins = await coinFlip.consecutiveWins()

        while  (wins < 10) {
            coinFlipCheater.flipIfCorrect(true)
            coinFlipCheater.flipIfCorrect(false)
            wins = await coinFlip.consecutiveWins()
        }
        //let finalWins = await coinFlip.consecutiveWins()
        //var result = new BigNumber(finalWins)

        // expect(result).to.be.bignumber.at.least(10);
        expect(await coinFlip.consecutiveWins()).to.equal(10)

    })

})
