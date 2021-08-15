import os
from dotenv import load_dotenv
from brownie import (
	RecursiveConditionalNFT,
	RecursiveConditionalNFTFactory,
	accounts,
)

ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

def main():
	acct = accounts.load('deployment_account')
	rcnft = RecursiveConditionalNFT.deploy({'from': acct})
	rcnft_factory = RecursiveConditionalNFTFactory.deploy(
		rcnft, {'from': acct}
	)

	tx = rcnft_factory.deploy_rcnft_contract(
		'recursiveConditionalNFT',
		'cNFT_1',
		'Placeholder',
		1,
		1e18,
		ZERO_ADDRESS,
		{'from': acct}
	)

	rcnft_instance = RecursiveConditionalNFT.at(tx.new_contracts[0])
	print("Address of rcNFT instance: " + str(rcnft_instance))

	tx2 = rcnft_factory.deploy_rcnft_contract(
		'recursiveConditionalNFT 2',
		'cNFT_2',
		'Placeholder 2',
		1,
		1e18,
		rcnft_instance.address,
		{'from': acct}
	)

	rcnft_instance_2 = RecursiveConditionalNFT.at(tx2.new_contracts[0])
	print("Adddress of 2nd rcNFT instance: " + str(rcnft_instance_2))
