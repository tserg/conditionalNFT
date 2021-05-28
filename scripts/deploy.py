from brownie import ConditionalNFT, accounts

def main():
	acct = accounts.load('deployment_account')
	ConditionalNFT.deploy('conditionalNFT', 'cNFT', 'Placeholder', '0xe29ec42f0b620b1c9a716f79a02e9dc5a5f5f98a', {'from': acct})
