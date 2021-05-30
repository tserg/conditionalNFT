const tokenName = document.querySelector('#token-name');
const tokenSymbol = document.querySelector('#token-symbol');
const tokenURI = document.querySelector('#token-uri');
const tokenMaxSupply = document.querySelector('#token-max-supply');
const tokenRemainingSupply = document.querySelector('#token-remaining-supply');
const tokenPrice = document.querySelector('#token-price');
const tokenLock = document.querySelector('#token-lock-address');
const addressBalance = document.querySelector('#address-balance');
const addressBalanceIds = document.querySelector('#address-balance-ids');
const contractFundsBalance = document.querySelector('#contract-funds-balance');

const verifyTokenLockButton = document.querySelector('#verify-lock-address-button');
const verifyTokenLockResult = document.querySelector('#verify-lock-address-result');

const withdrawButton = document.querySelector('#withdraw-btn');

const purchaseButton = document.querySelector('#purchase-btn');

const transferButton = document.querySelector('#transfer-btn');

const cnftAddress = document.querySelector('meta[property~="cnft-address"]').getAttribute('content');

const _cnftABI = [
  {
	"anonymous": false,
	"inputs": [
	  {
		"indexed": true,
		"name": "sender",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "receiver",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "tokenId",
		"type": "uint256"
	  }
	],
	"name": "Transfer",
	"type": "event"
  },
  {
	"anonymous": false,
	"inputs": [
	  {
		"indexed": true,
		"name": "owner",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "approved",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "tokenId",
		"type": "uint256"
	  }
	],
	"name": "Approval",
	"type": "event"
  },
  {
	"anonymous": false,
	"inputs": [
	  {
		"indexed": true,
		"name": "owner",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "operator",
		"type": "address"
	  },
	  {
		"indexed": false,
		"name": "approved",
		"type": "bool"
	  }
	],
	"name": "ApprovalForAll",
	"type": "event"
  },
  {
	"anonymous": false,
	"inputs": [
	  {
		"indexed": true,
		"name": "purchaser",
		"type": "address"
	  },
	  {
		"indexed": true,
		"name": "tokenId",
		"type": "uint256"
	  },
	  {
		"indexed": false,
		"name": "value",
		"type": "uint256"
	  }
	],
	"name": "Purchase",
	"type": "event"
  },
  {
	"inputs": [],
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
  },
  {
	"gas": 784747,
	"inputs": [
	  {
		"name": "_name",
		"type": "string"
	  },
	  {
		"name": "_symbol",
		"type": "string"
	  },
	  {
		"name": "_tokenURI",
		"type": "string"
	  },
	  {
		"name": "_maxSupply",
		"type": "uint256"
	  },
	  {
		"name": "_minPrice",
		"type": "uint256"
	  },
	  {
		"name": "_lockAddress",
		"type": "address"
	  },
	  {
		"name": "_minter",
		"type": "address"
	  },
	  {
		"name": "_beneficiary",
		"type": "address"
	  }
	],
	"name": "initialize",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 1233,
	"inputs": [
	  {
		"name": "_interfaceID",
		"type": "bytes32"
	  }
	],
	"name": "supportsInterface",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1941,
	"inputs": [
	  {
		"name": "_owner",
		"type": "address"
	  }
	],
	"name": "balanceOf",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1405,
	"inputs": [
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "ownerOf",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 2332,
	"inputs": [
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "getApproved",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1668,
	"inputs": [
	  {
		"name": "_owner",
		"type": "address"
	  },
	  {
		"name": "_operator",
		"type": "address"
	  }
	],
	"name": "isApprovedForAll",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 7670,
	"inputs": [],
	"name": "name",
	"outputs": [
	  {
		"name": "",
		"type": "string"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 6723,
	"inputs": [],
	"name": "symbol",
	"outputs": [
	  {
		"name": "",
		"type": "string"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 9684,
	"inputs": [
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "tokenURI",
	"outputs": [
	  {
		"name": "",
		"type": "string"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 2737,
	"inputs": [],
	"name": "totalSupply",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 4850,
	"inputs": [
	  {
		"name": "_index",
		"type": "uint256"
	  }
	],
	"name": "tokenByIndex",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 4469,
	"inputs": [
	  {
		"name": "_owner",
		"type": "address"
	  },
	  {
		"name": "_index",
		"type": "uint256"
	  }
	],
	"name": "tokenOfOwnerByIndex",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1448,
	"inputs": [],
	"name": "getLockAddress",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 2755,
	"inputs": [
	  {
		"name": "_from",
		"type": "address"
	  }
	],
	"name": "isUnlocked",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1089417,
	"inputs": [
	  {
		"name": "_from",
		"type": "address"
	  },
	  {
		"name": "_to",
		"type": "address"
	  },
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "transferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"inputs": [
	  {
		"name": "_from",
		"type": "address"
	  },
	  {
		"name": "_to",
		"type": "address"
	  },
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"inputs": [
	  {
		"name": "_from",
		"type": "address"
	  },
	  {
		"name": "_to",
		"type": "address"
	  },
	  {
		"name": "_tokenId",
		"type": "uint256"
	  },
	  {
		"name": "_data",
		"type": "bytes"
	  }
	],
	"name": "safeTransferFrom",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 41079,
	"inputs": [
	  {
		"name": "_approved",
		"type": "address"
	  },
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "approve",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 38392,
	"inputs": [
	  {
		"name": "_operator",
		"type": "address"
	  },
	  {
		"name": "_approved",
		"type": "bool"
	  }
	],
	"name": "setApprovalForAll",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 565224,
	"inputs": [
	  {
		"name": "_to",
		"type": "address"
	  }
	],
	"name": "mint",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 568057,
	"inputs": [],
	"name": "purchase",
	"outputs": [
	  {
		"name": "",
		"type": "bool"
	  }
	],
	"stateMutability": "payable",
	"type": "function"
  },
  {
	"gas": 36451,
	"inputs": [],
	"name": "withdraw",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 453048,
	"inputs": [
	  {
		"name": "_tokenId",
		"type": "uint256"
	  }
	],
	"name": "burn",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 1748,
	"inputs": [],
	"name": "maxSupply",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  },
  {
	"gas": 1778,
	"inputs": [],
	"name": "minPrice",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"stateMutability": "view",
	"type": "function"
  }
]

window.addEventListener('load', async() => {

	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		console.log('Ethereum successfully detected');
		window.cnftContract = new web3.eth.Contract(_cnftABI, cnftAddress);
		populateInfo();

	}

})

verifyTokenLockButton.addEventListener('click', async() => {

	var accounts = await web3.eth.getAccounts();
	const account = accounts[0];
	console.log("verify token");
	var verifyLockAddress = document.querySelector('#verify-lock-address').value;
	console.log(verifyLockAddress);

	cnftContract.methods.isUnlocked(verifyLockAddress).call()
	.then(function(result) {
		if (result === true) {
			verifyTokenLockResult.innerHTML = 'This address is eligible to purchase, hold, transfer and receive this cNFT.';
		} else if (result === false) {
			verifyTokenLockResult.innerHTML = 'This address is not eligible to purchase, hold, transfer and receive this cNFT.';
		}
	});

})

withdrawButton.addEventListener('click', async() => {
	var accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	cnftContract.methods.withdraw().send({'from': account})
	.on('transactionHash', function(hash) {
		console.log(hash);
		withdrawButton.innerHTML = 'Withdrawing';
		withdrawButton.disabled = true;
	})
	.on('confirmation', function(confirmationNumber, receipt) {
		console.log(confirmationNumber);
	})
	.on('receipt', function(receipt) {
		console.log(receipt);
		window.location.reload();
	})
	.on('error', function(error, receipt) {
		console.log(error);
		withdrawButton.innerHTML = 'Withdraw to beneficiary';
		withdrawButton.disabled = false;
	});
})

transferButton.addEventListener('click', async() => {
	var accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	var tokenIDToTransfer = parseInt(document.querySelector('#transfer-token-id').value);
	var addressToTransfer = document.querySelector('#transfer-address').value;

	cnftContract.methods.transferFrom(account, addressToTransfer, tokenIDToTransfer).send({'from': account})
	.on('transactionHash', function(hash) {
		console.log(hash);
		transferButton.innerHTML = 'Transferring';
		transferButton.disabled = true;
	})
	.on('confirmation', function(confirmationNumber, receipt) {
		console.log(confirmationNumber);
	})
	.on('receipt', function(receipt) {
		console.log(receipt);
		window.location.reload();
	})
	.on('error', function(error, receipt) {
		console.log(error);
		transferButton.innerHTML = 'Transfer';
		transferButton.disabled = false;
	});
})

purchaseButton.addEventListener('click', async() => {

	var accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	var purchaseValue = document.querySelector('#token-purchase-price').value;
	var formattedPurchaseValue = web3.utils.toWei(purchaseValue);
	console.log(formattedPurchaseValue);

	cnftContract.methods.purchase().send({'from': account, 'value': formattedPurchaseValue})
	.on('transactionHash', function(hash) {
		console.log(hash);
		purchaseButton.innerHTML = 'Purchasing';
		purchaseButton.disabled = true;
	})
	.on('confirmation', function(confirmationNumber, receipt) {
		console.log(confirmationNumber);
	})
	.on('receipt', function(receipt) {
		console.log(receipt);
		console.log(receipt.events.Purchase.returnValues[0]);
		window.location.reload();
	})
	.on('error', function(error, receipt) {
		console.log(error);
		purchaseButton.innerHTML = 'Purchase';
		purchaseButton.disabled = false;
	});

})

async function populateInfo() {

	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	var account = accounts[0];

	cnftContract.methods.maxSupply().call()
	.then(function(result) {
		var maxSupplyValue = result;
		tokenMaxSupply.innerHTML = result.toString();
		cnftContract.methods.totalSupply().call()
		.then(function(result) {
			tokenRemainingSupply.innerHTML = (maxSupplyValue - result).toString();
		});
	});

	cnftContract.methods.minPrice().call()
	.then(function(result) {
		tokenPrice.innerHTML = web3.utils.fromWei(result).toString() + ' ETH';
	});

	cnftContract.methods.getLockAddress().call()
	.then(function(result) {
		tokenLock.innerHTML = result.toString();
	});

	cnftContract.methods.symbol().call()
	.then(function(result) {
		tokenSymbol.innerHTML = result;
	});

	cnftContract.methods.name().call()
	.then(function(result) {
		tokenName.innerHTML = result;
	});

	cnftContract.methods.balanceOf(accounts[0]).call()
	.then(function(result) {
		addressBalance.innerHTML = result.toString();

		var accountBalance = parseInt(result);
		getTokenIdByAddress(accountBalance, account);
		//addressBalanceIds.innerHTML = tokenIds.toString();

	});

	web3.eth.getBalance(cnftAddress)
	.then(function(result) {
		contractFundsBalance.innerHTML = web3.utils.fromWei(result).toString() + ' ETH';
	});

}

async function getTokenIdByAddress(_balance, _address) {

	for (i=1; i<_balance+1; i++) {
		cnftContract.methods.tokenOfOwnerByIndex(_address, i).call()
		.then(function(result) {
			console.log(result);
			addressBalanceIds.innerHTML += " " + result.toString();

		});
	}

}
