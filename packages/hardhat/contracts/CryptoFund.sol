// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ConversionRates.sol";

contract CryptoFund {
	using ConversionRates for uint;

	struct User {
		string name;
		string bio;
		address userAddress;
		uint256 timeOfCreation;
		uint[] likedCampaignsIdx;
	}

	struct Funding {
		User funder;
		uint campaignIdx;
		uint amountFunded;
		bool isSuppliedBack;
		uint amountSupplied;
		uint bonusSupplied;
		uint timeOfFunding;
	}

	struct CampaignMetadata {
		User createdBy;
		uint idx;
		uint timeOfCreation;
	}

	struct CampaignData {
		string pitch;
		uint askAmount;
		uint interestRate;
		string[] assetLinks;
		uint returnTimeInDays;
	}

	struct CampaignStatistics {
		uint likeCount;
		uint fundingCount;
		uint amountFunded;
	}

	struct CampaignStatus {
		bool isAskFulfilled;
		bool isCampaignCompleted;
		bool isAcceptingFundings;
		uint suppliedBackAmount;
	}

	struct Campaign {
		CampaignMetadata metadata;
		CampaignData data;
		CampaignStatus status;
		CampaignStatistics statistics;
		address[] funders;
		address[] likers;
	}

	mapping(address => User) public addressToUser;
	Campaign[] campaigns;
	mapping(uint => mapping(address => Funding)) public campaignToFunding;

	mapping(address => uint[]) public addressToCampaignIdx;
	mapping(address => Funding[]) public userToFundings;

	uint public campaignCount = 0;

	modifier userExists() {
		require(
			bytes(addressToUser[msg.sender].name).length > 0,
			"User does not exist"
		);
		_;
	}

	modifier campaignExists(uint campaignIdx) {
		require(campaignCount > campaignIdx, "Campaign does not exist");
		_;
	}

	function createUser(string memory name, string memory bio) public {
		uint[] memory likedCampaignsIdx;
		addressToUser[msg.sender] = User({
			name: name,
			bio: bio,
			userAddress: msg.sender,
			timeOfCreation: block.timestamp,
			likedCampaignsIdx: likedCampaignsIdx
		});
	}

	function updateUser(
		string memory name,
		string memory bio
	) public userExists {
		User memory user = addressToUser[msg.sender];
		user.name = name;
		user.bio = bio;
		addressToUser[msg.sender] = user;
	}

	function createCampaign(
		string memory pitch,
		uint askAmount,
		uint interestRate,
		string[] memory assetLinks,
		uint returnTimeInDays
	) public userExists {
		CampaignMetadata memory metadata = CampaignMetadata({
			createdBy: addressToUser[msg.sender],
			idx: campaignCount,
			timeOfCreation: block.timestamp
		});
		CampaignData memory data = CampaignData({
			pitch: pitch,
			askAmount: askAmount,
			interestRate: interestRate,
			assetLinks: assetLinks,
			returnTimeInDays: returnTimeInDays
		});
		CampaignStatus memory status = CampaignStatus({
			isAskFulfilled: false,
			isCampaignCompleted: false,
			isAcceptingFundings: true,
			suppliedBackAmount: 0
		});
		CampaignStatistics memory statistics = CampaignStatistics({
			likeCount: 0,
			fundingCount: 0,
			amountFunded: 0
		});
		address[] memory funders;
		address[] memory likers;
		Campaign memory newCampaign = Campaign({
			metadata: metadata,
			status: status,
			data: data,
			statistics: statistics,
			funders: funders,
			likers: likers
		});
		campaigns.push(newCampaign);
		addressToCampaignIdx[msg.sender].push(campaignCount);
		campaignCount++;
	}

	function getUintIdx(
		uint[] memory arr,
		uint item
	) public pure returns (uint) {
		//Returns 0 if item is not found
		for (uint i = 1; i <= arr.length; i++) {
			if (arr[i - 1] == item) {
				return i;
			}
		}
		return 0;
	}

	function getAddressIdx(
		address[] memory arr,
		address addr
	) public pure returns (uint) {
		//Returns 0 if address is not found
		for (uint i = 1; i <= arr.length; i++) {
			if (arr[i - 1] == addr) {
				return i;
			}
		}
		return 0;
	}

	function likeCampaign(uint campaignIdx) public campaignExists(campaignIdx) {
		Campaign storage campaign = campaigns[campaignIdx];
		require(
			getAddressIdx(campaign.likers, msg.sender) == 0,
			"User has already liked this campaign"
		);
		campaign.likers.push(msg.sender);
		campaign.statistics.likeCount += 1;
		User storage user = addressToUser[msg.sender];
		user.likedCampaignsIdx.push(campaignIdx);
	}

	function unlikeCampaign(
		uint campaignIdx
	) public campaignExists(campaignIdx) {
		Campaign storage campaign = campaigns[campaignIdx];
		uint likerIdx = getAddressIdx(campaign.likers, msg.sender);
		require(likerIdx > 0, "User has not liked this campaign");
		delete campaign.likers[likerIdx];
		campaign.statistics.likeCount -= 1;
		User storage user = addressToUser[msg.sender];
		uint likedCampaignIdx = getUintIdx(user.likedCampaignsIdx, campaignIdx);
		delete user.likedCampaignsIdx[likedCampaignIdx];
	}

	function createFunding(
		uint campaignIdx
	) public payable userExists campaignExists(campaignIdx) {
		Campaign storage campaign = campaigns[campaignIdx];

		require(
			campaign.status.isAcceptingFundings,
			"Campaign is not accepting fundings"
		);
		require(
			!campaign.status.isAskFulfilled,
			"Ask amount already fulfilled"
		);
		require(msg.value > 0, "Funding amount must be greater than 0");

		// Check if user has already funded
		require(
			!(campaignToFunding[campaignIdx][msg.sender].amountFunded > 0),
			"User has already funded"
		);

		uint usdValue = msg.value.weiToUsd();
		require(
			usdValue <=
				(campaign.data.askAmount - campaign.statistics.amountFunded),
			"Proposed amount exceeds remaining ask amount"
		);

		Funding memory newFunding = Funding({
			funder: addressToUser[msg.sender],
			campaignIdx: campaignIdx,
			amountFunded: msg.value,
			isSuppliedBack: false,
			amountSupplied: 0,
			bonusSupplied: 0,
			timeOfFunding: block.timestamp
		});

		campaign.funders.push(msg.sender);
		campaignToFunding[campaignIdx][msg.sender] = newFunding;
		userToFundings[msg.sender].push(newFunding);
		campaign.statistics.amountFunded += usdValue;

		uint THRESHOLD_USD = 100;
		if (
			campaign.statistics.amountFunded + THRESHOLD_USD >=
			campaign.data.askAmount
		) {
			campaign.status.isAskFulfilled = true;
			campaign.status.isAcceptingFundings = false;
		}

		campaign.statistics.fundingCount++;
	}

	function claimFunds(uint campaignIdx) public campaignExists(campaignIdx) {
		Campaign storage campaign = campaigns[campaignIdx];
		require(
			campaign.metadata.createdBy.userAddress == msg.sender,
			"Only campaign creator can claim funds"
		);
		require(campaign.status.isAskFulfilled, "Funding goal not reached yet");
		require(
			!campaign.status.isCampaignCompleted,
			"Campaign already completed"
		);

		uint amountToTransfer = campaign.statistics.amountFunded.weiToUsd();
		payable(msg.sender).transfer(amountToTransfer);

		campaign.status.isCampaignCompleted = true;
		campaign.status.suppliedBackAmount = 0; // Initialize to zero
	}

	function supplyFundsBack(
		uint campaignIdx
	) public payable campaignExists(campaignIdx) {
		Campaign storage campaign = campaigns[campaignIdx];
		require(campaign.status.isAskFulfilled, "Funding goal not reached yet");
		require(
			campaign.status.isCampaignCompleted,
			"Campaign not yet completed"
		);

		uint repaymentAmount = campaign.data.askAmount +
			((campaign.data.askAmount *
				campaign.data.interestRate *
				(campaign.data.returnTimeInDays / 30)) / 100);
		uint ethValue = repaymentAmount.weiToUsd();
		require(msg.value >= ethValue, "Insufficient repayment amount");

		// Calculate total bonus pool based on campaign ask and duration
		uint totalBonus = (campaign.data.askAmount *
			campaign.data.interestRate *
			campaign.data.returnTimeInDays) / (100 * 30); // Interest rate as a percentage

		for (uint i = 0; i < campaign.funders.length; i++) {
			address funderAddress = campaign.funders[i];
			Funding storage funding = campaignToFunding[campaignIdx][
				funderAddress
			];
			uint userBonus = (funding.amountFunded * totalBonus) /
				campaign.data.askAmount; // Proportional bonus based on investment

			funding.isSuppliedBack = true;
			funding.amountSupplied = funding.amountFunded; // Update for clarity
			funding.bonusSupplied = userBonus;

			// Send payout directly to funder (including bonus)
			payable(funderAddress).transfer(funding.amountFunded + userBonus);
		}

		campaign.status.isCampaignCompleted = true;
		campaign.status.suppliedBackAmount = msg.value; // Record the supplied back amount
	}

	function getUserData(
		address userAddress
	) public view returns (User memory) {
		return addressToUser[userAddress];
	}

	function getUserCampaigns(
		address userAddress
	) public view returns (uint[] memory) {
		return addressToCampaignIdx[userAddress];
	}

	function getCampaignFeed() public view returns (Campaign[] memory) {
		return campaigns;
	}

	function getCampaign(
		uint campaignIdx
	) public view returns (Campaign memory) {
		return campaigns[campaignIdx];
	}

	function getUserFundings(
		address userAddress
	) public view returns (Funding[] memory) {
		return userToFundings[userAddress];
	}
}
