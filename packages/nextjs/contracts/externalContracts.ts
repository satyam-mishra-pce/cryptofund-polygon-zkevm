import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
// "0x50098E7F6Ce069A9396C0d9258BE9840e5243a49"
const externalContracts = {
  2442: {
    CRYPTOFUND: {
      address: "0x7985da86a23716440de3b3815cc421f52a17f631",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "addressToCampaignIdx",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "addressToUser",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "bio",
              type: "string",
            },
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "timeOfCreation",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "campaignCount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "campaignToFunding",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "bio",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timeOfCreation",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "likedCampaignsIdx",
                  type: "uint256[]",
                },
              ],
              internalType: "struct CryptoFund.User",
              name: "funder",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountFunded",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isSuppliedBack",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "amountSupplied",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "bonusSupplied",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timeOfFunding",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "claimFunds",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "pitch",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "askAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "interestRate",
              type: "uint256",
            },
            {
              internalType: "string[]",
              name: "assetLinks",
              type: "string[]",
            },
            {
              internalType: "uint256",
              name: "returnTimeInDays",
              type: "uint256",
            },
          ],
          name: "createCampaign",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "createFunding",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "bio",
              type: "string",
            },
          ],
          name: "createUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address[]",
              name: "arr",
              type: "address[]",
            },
            {
              internalType: "address",
              name: "addr",
              type: "address",
            },
          ],
          name: "getAddressIdx",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "getCampaign",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: "string",
                          name: "name",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "bio",
                          type: "string",
                        },
                        {
                          internalType: "address",
                          name: "userAddress",
                          type: "address",
                        },
                        {
                          internalType: "uint256",
                          name: "timeOfCreation",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256[]",
                          name: "likedCampaignsIdx",
                          type: "uint256[]",
                        },
                      ],
                      internalType: "struct CryptoFund.User",
                      name: "createdBy",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "idx",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "timeOfCreation",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignMetadata",
                  name: "metadata",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "pitch",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "askAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "interestRate",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "assetLinks",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "returnTimeInDays",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignData",
                  name: "data",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "isAskFulfilled",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "isCampaignCompleted",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "isAcceptingFundings",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "suppliedBackAmount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignStatus",
                  name: "status",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "likeCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "fundingCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountFunded",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignStatistics",
                  name: "statistics",
                  type: "tuple",
                },
                {
                  internalType: "address[]",
                  name: "funders",
                  type: "address[]",
                },
                {
                  internalType: "address[]",
                  name: "likers",
                  type: "address[]",
                },
              ],
              internalType: "struct CryptoFund.Campaign",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getCampaignFeed",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      components: [
                        {
                          internalType: "string",
                          name: "name",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "bio",
                          type: "string",
                        },
                        {
                          internalType: "address",
                          name: "userAddress",
                          type: "address",
                        },
                        {
                          internalType: "uint256",
                          name: "timeOfCreation",
                          type: "uint256",
                        },
                        {
                          internalType: "uint256[]",
                          name: "likedCampaignsIdx",
                          type: "uint256[]",
                        },
                      ],
                      internalType: "struct CryptoFund.User",
                      name: "createdBy",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "idx",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "timeOfCreation",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignMetadata",
                  name: "metadata",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "string",
                      name: "pitch",
                      type: "string",
                    },
                    {
                      internalType: "uint256",
                      name: "askAmount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "interestRate",
                      type: "uint256",
                    },
                    {
                      internalType: "string[]",
                      name: "assetLinks",
                      type: "string[]",
                    },
                    {
                      internalType: "uint256",
                      name: "returnTimeInDays",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignData",
                  name: "data",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "bool",
                      name: "isAskFulfilled",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "isCampaignCompleted",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "isAcceptingFundings",
                      type: "bool",
                    },
                    {
                      internalType: "uint256",
                      name: "suppliedBackAmount",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignStatus",
                  name: "status",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "likeCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "fundingCount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountFunded",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct CryptoFund.CampaignStatistics",
                  name: "statistics",
                  type: "tuple",
                },
                {
                  internalType: "address[]",
                  name: "funders",
                  type: "address[]",
                },
                {
                  internalType: "address[]",
                  name: "likers",
                  type: "address[]",
                },
              ],
              internalType: "struct CryptoFund.Campaign[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "arr",
              type: "uint256[]",
            },
            {
              internalType: "uint256",
              name: "item",
              type: "uint256",
            },
          ],
          name: "getUintIdx",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
          ],
          name: "getUserCampaigns",
          outputs: [
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
          ],
          name: "getUserData",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "bio",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timeOfCreation",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "likedCampaignsIdx",
                  type: "uint256[]",
                },
              ],
              internalType: "struct CryptoFund.User",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "userAddress",
              type: "address",
            },
          ],
          name: "getUserFundings",
          outputs: [
            {
              components: [
                {
                  components: [
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "bio",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "userAddress",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "timeOfCreation",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256[]",
                      name: "likedCampaignsIdx",
                      type: "uint256[]",
                    },
                  ],
                  internalType: "struct CryptoFund.User",
                  name: "funder",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "campaignIdx",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountFunded",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isSuppliedBack",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "amountSupplied",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "bonusSupplied",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeOfFunding",
                  type: "uint256",
                },
              ],
              internalType: "struct CryptoFund.Funding[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "likeCampaign",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "supplyFundsBack",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
          ],
          name: "unlikeCampaign",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "bio",
              type: "string",
            },
          ],
          name: "updateUser",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "userToFundings",
          outputs: [
            {
              components: [
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "bio",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "userAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "timeOfCreation",
                  type: "uint256",
                },
                {
                  internalType: "uint256[]",
                  name: "likedCampaignsIdx",
                  type: "uint256[]",
                },
              ],
              internalType: "struct CryptoFund.User",
              name: "funder",
              type: "tuple",
            },
            {
              internalType: "uint256",
              name: "campaignIdx",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountFunded",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isSuppliedBack",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "amountSupplied",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "bonusSupplied",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timeOfFunding",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
