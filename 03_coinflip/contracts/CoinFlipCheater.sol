// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CoinFlip.sol";

contract CoinFlipCheater {

    CoinFlip public coinFlip;
    address public coinFlipAddress;

    constructor(address _coinFlipAddress) public {
        coinFlipAddress = _coinFlipAddress;
        coinFlip = CoinFlip(coinFlipAddress);
    }

    function flipIfCorrect(bool guess) public {
        require(coinFlip.flip(guess), "guess again ;-)");
    }

}