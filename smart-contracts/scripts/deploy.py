import os
from dotenv import load_dotenv
from brownie import (
	ConditionalNFT,
	ConditionalNFTFactory,
	accounts,
)

# Load environment variables

load_dotenv()

LOCK_ADDRESS = os.environ.get("LOCK_ADDRESS")

def main():
	acct = accounts.load('deployment_account')
	cnft = ConditionalNFT.deploy({'from': acct})
	cnft_factory = ConditionalNFTFactory.deploy(
		cnft, {'from': acct}
	)

	tx = cnft_factory.deploy_cnft_contract(
		'conditionalNFT',
		'cNFT',
		'Placeholder',
		1,
		1e18,
		LOCK_ADDRESS,
		{'from': acct}
	)

	cnft_instance = ConditionalNFT.at(tx.new_contracts[0])
	print("Address of cNFT instance: " + str(cnft_instance))
