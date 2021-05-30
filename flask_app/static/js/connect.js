const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const showNetwork = document.querySelector('.showNetwork');
const showFactoryAddress = document.querySelector('.showFactoryAddress');






ethereumButton.addEventListener('click', () => {
  getAccount();

});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  if (account) {
	  ethereumButton.disabled = true;
	  ethereumButton.innerHTML = 'Connected';
	  getChainId();
  }
  showAccount.innerHTML = account;
}

async function getChainId() {
	const chainId = ethereum.chainId;
	console.log(chainId);
	if (chainId === '0x1') {
		showNetwork.innerHTML = 'Mainnet';

		const developmentFactoryAddress = document.querySelector('meta[property~="development-cnft-address"]').getAttribute('content');

		showFactoryAddress.innerHTML = mainnetFactoryAddress;
	} else if (chainId === '0x4') {
		showNetwork.innerHTML = 'Rinkeby';
		const rinkebyFactoryAddress = document.querySelector('meta[property~="rinkeby-cnft-address"]').getAttribute('content');

		showFactoryAddress.innerHTML = rinkebyFactoryAddress;
	} else {
		showNetwork.innerHTML = 'Not Mainnet or Rinkeby!';
		const mainnetFactoryAddress = document.querySelector('meta[property~="mainnet-cnft-address"]').getAttribute('content');

		showFactoryAddress.innerHTML = developmentFactoryAddress;
	}
}
