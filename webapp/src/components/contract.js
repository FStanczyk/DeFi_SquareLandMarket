const ethers = require('ethers');

export const smdAddress = "0xF549Baf1b46f5514EDC2Fe96C685f6B9eD968Bb9";
export const marketAddress = "0x3660461673c31c1Ad5F67E757C600b1517AcB58f";
export const landAddress = "0xD8dfb2814E9c7335600Dd724fdd9948C0883D111";

// export const marketAbi = [
//     "function buy(uint x, uint y)",
//     "function _changePrice(uint x, uint y, uint _price)",
//     "function ownerOf(uint256 _x, uint256 _y) view",
//     "function approved(uint256 _x, uint256 _y)",
//     "function _approve(address _toApprove, uint256 _x, uint256 _y)",
//     "function _desapprove(address _toDesapprove, uint256 _x, uint _y)",
// ];

export const landAbi = [
    {
        type: 'function', 
        name:'ownerOf', 
        stateMutability: 'view',
        inputs: [
            {name: '_x', type: 'uint256'},
            {name: '_y', type: 'uint256'}
        ],
        outputs: [{type: 'address'}],
    },
    {
        type: 'function', 
        name:'_approve', 
        stateMutability: 'public',
        inputs: [
            {name: '_toApprove', type: 'address'},
            {name: '_x', type: 'uint256'},
            {name: '_y', type: 'uint256'}
        ],
    },
]

export const marketAbi = [
    {
        type: 'function', 
        name:'buy', 
        stateMutability: 'public',
        inputs: [
            {name: 'x', type: 'uint256'},
            {name: 'y', type: 'uint256'}
        ],
    },
]


export const smdAbi = [
    "function approve(address spender, uint256 amount)",
    "function balanceOf(address account)"
];


export let provider = new ethers.providers.Web3Provider(window.ethereum)

