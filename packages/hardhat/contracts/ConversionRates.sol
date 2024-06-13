// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import { AggregatorV3Interface } from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library ConversionRates {
	function getEthValue() internal view returns (int, uint8) {
		AggregatorV3Interface priceFeed = AggregatorV3Interface(
			0xd94522a6feF7779f672f4C88eb672da9222f2eAc
		);
		(, int answer, , , ) = priceFeed.latestRoundData();
		return (answer, priceFeed.decimals());
	}

	function weiToUsd(uint amountInWei) internal view returns (uint) {
		(int usd, uint8 decimals) = getEthValue();
		return (amountInWei * uint(usd)) / (10 ** (decimals + 18)); // 1 eth = 10e18 wei
	}
}
