const developmentFactoryAddress = document.querySelector('meta[property~="development-cnft-address"]').getAttribute('content');
const rinkebyFactoryAddress = document.querySelector('meta[property~="rinkeby-cnft-address"]').getAttribute('content');
const mainnetFactoryAddress = document.querySelector('meta[property~="mainnet-cnft-address"]').getAttribute('content');

const deployButton = document.querySelector('#deploy-btn');

const _factoryABI = [
  {
	"anonymous": false,
	"inputs": [
	  {
		"indexed": false,
		"name": "token",
		"type": "address"
	  },
	  {
		"indexed": false,
		"name": "name",
		"type": "string"
	  },
	  {
		"indexed": false,
		"name": "symbol",
		"type": "string"
	  }
	],
	"name": "ConditionalNFTCreated",
	"type": "event"
  },
  {
	"inputs": [
	  {
		"name": "_target",
		"type": "address"
	  }
	],
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
  },
  {
	"gas": 167698,
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
	  }
	],
	"name": "deploy_cnft_contract",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"stateMutability": "nonpayable",
	"type": "function"
  },
  {
	"gas": 1233,
	"inputs": [
	  {
		"name": "_index",
		"type": "uint256"
	  }
	],
	"name": "get_cnft_by_index",
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
	"gas": 1478,
	"inputs": [
	  {
		"name": "_index",
		"type": "uint256"
	  },
	  {
		"name": "_cnft",
		"type": "address"
	  }
	],
	"name": "get_lock_by_index_and_cnft",
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
	"gas": 1178,
	"inputs": [],
	"name": "target",
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
	"gas": 1208,
	"inputs": [],
	"name": "totalCount",
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

deployButton.addEventListener('click', async() => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		console.log('Ethereum successfully detected');
		if (web3.chainId === '0x1') {
			window.factoryContract = new web3.eth.Contract(_factoryABI, mainnetFactoryAddress);
		} else if (web3.chainId === '0x4') {
			window.factoryContract = new web3.eth.Contract(_factoryABI, rinkebyFactoryAddress);
		} else {
			window.factoryContract = new web3.eth.Contract(_factoryABI, developmentFactoryAddress);
		}
		deployContract();

	}
})

async function deployContract() {

	var accounts = await web3.eth.getAccounts();
	const account = accounts[0];

	var tokenName = document.querySelector('#token-name').value;
	var tokenSymbol = document.querySelector('#token-symbol').value;
	var tokenURI = document.querySelector('#token-uri').value;
	var tokenSupply = document.querySelector('#token-max-supply').value;
	var tokenPrice = document.querySelector('#token-price').value;
	var tokenLock = document.querySelector('#token-lock-address').value;

	console.log(tokenPrice);

	var formattedTokenPrice = web3.utils.toWei(tokenPrice);
	console.log(formattedTokenPrice);

	factoryContract.methods.deploy_cnft_contract(tokenName, tokenSymbol, tokenURI, tokenSupply, formattedTokenPrice, tokenLock).send({'from': account})
	.on('transactionHash', function(hash) {
		console.log(hash);
		deployButton.innerHTML = 'Deploying';
		deployButton.disabled = true;
	})
	.on('confirmation', function(confirmationNumber, receipt) {
		console.log(confirmationNumber);
	})
	.on('receipt', function(receipt) {
		console.log(receipt);
		console.log(receipt.events.ConditionalNFTCreated.returnValues[0]);
	})
	.on('error', function(error, receipt) {
		console.log(error);
		deployButton.innerHTML = 'Deploy';
		deployButton.disabled = false;
	});
}
