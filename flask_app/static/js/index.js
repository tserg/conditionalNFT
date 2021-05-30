const developmentFactoryAddress = document.querySelector('meta[property~="development-cnft-address"]').getAttribute('content');
const rinkebyFactoryAddress = document.querySelector('meta[property~="rinkeby-cnft-address"]').getAttribute('content');
const mainnetFactoryAddress = document.querySelector('meta[property~="mainnet-cnft-address"]').getAttribute('content');

const cnftFactoryTable = document.querySelector('#cnft-factory-table');

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

window.addEventListener('load', async() => {

	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		console.log('Ethereum successfully detected');
		web3.eth.getChainId().then(function(result) {
			console.log(result);
			if (result === 1) {
				getFactoryListings(mainnetFactoryAddress);
			} else if (result === 4) {
				console.log("Rinkeby detected");
				getFactoryListings(rinkebyFactoryAddress);
			} else {
				console.log("Rinkeby not detected")
				getFactoryListings(developmentFactoryAddress);
			}
		});
	}
})

async function getFactoryListings(_address) {

	window.factoryContract = new web3.eth.Contract(_factoryABI, _address);

	factoryContract.methods.totalCount().call()
	.then(function(result) {
		console.log(result);
		for (i=1; i<parseInt(result)+1; i++) {
			updateListing(i);
		}
	});
	console.log(factoryContract);
	console.log(123);
	console.log(_address);
}

async function updateListing(_index) {
	var cnftAddress = factoryContract.methods.get_cnft_by_index(_index).call(function(error, result) {
		if (!error) {
			var row = cnftFactoryTable.insertRow();
			var th = document.createElement('th');
			th.scope = 'row';
			th.innerHTML = _index;

			row.appendChild(th);

			var td1 = document.createElement('td');
			td1.innerHTML = result;
			row.appendChild(td1);

			var viewButton = document.createElement('a');
			viewButton.innerHTML = 'View';
			viewButton.type = 'button';
			viewButton.href = '/purchase/' + result.toString();
			row.appendChild(viewButton);
		} else {
			console.log(error);
		}
	});
}
