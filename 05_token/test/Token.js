const { expect } = require("chai")

describe("Token contract", function () {

    let token
    let deployer
    let alice
    let bob
    let addrs

    const logger = ethers.utils.Logger.globalLogger()

    beforeEach(async function () {
        [deployer, alice, bob, ...addrs] = await ethers.getSigners()
        let tokenFactory = await ethers.getContractFactory("Token")
        token = await tokenFactory.deploy(2100)


    })

    it("initial balance of deployer should ve totalSupply", async function () {
        let totalBalance = await token.totalSupply()
        expect(await token.balanceOf(deployer.address)).to.equal(totalBalance)
    })

    it("test large transer from another account", async function () {
        //Send 20 tokens to Alice
        await token.connect(deployer).transfer(alice.address, 20)
        expect(await token.balanceOf(alice.address)).to.equal(20)

        await token.connect(alice).transfer(bob.address, 1)
        expect(await token.balanceOf(bob.address)).to.equal(1)

        await token.connect(bob).transfer(alice.address, 1000)


        expect(await token.balanceOf(alice.address)).to.equal(1019)
    })

})