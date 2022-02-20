const { expect } = require("chai")

describe("CoinFlip contract", function () {

    let coinFlip
    let deployer
    let alice
    let bob
    let addrs

    const logger = ethers.utils.Logger.globalLogger()

    beforeEach(async function () {
        [deployer, alice, bob, ...addrs] = await ethers.getSigners()
        let coinFlipFactory = await ethers.getContractFactory("CoinFlip")
        coinFlip = await coinFlipFactory.deploy()
        await coinFlip.deployed()
    })

    it("initial consecutive wins should be 0", async function () {
        expect(await coinFlip.consecutiveWins()).to.equal(0)
    })

})
