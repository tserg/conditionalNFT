import pytest

from brownie import (
	accounts,
	reverts,
	RecursiveConditionalNFT,
	RecursiveConditionalNFTFactory,
)

ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

BASE_RCNFT_PRICE = 1e16
SECONDARY_RCNFT_PRICE = 5e15

@pytest.fixture(scope="module")
def RecursiveConditionalNFTContract(RecursiveConditionalNFT, accounts):
	yield RecursiveConditionalNFT.deploy({'from': accounts[0]})

@pytest.fixture(scope="module")
def RecursiveConditionalNFTFactoryContract(RecursiveConditionalNFTContract, RecursiveConditionalNFTFactory, accounts):
	yield RecursiveConditionalNFTFactory.deploy(RecursiveConditionalNFTContract, {'from': accounts[0]})

@pytest.fixture(scope="module", autouse=True)
def deploy_base_rcnft(RecursiveConditionalNFTFactoryContract, accounts):

	tx1 = RecursiveConditionalNFTFactoryContract.deploy_rcnft_contract(
		'rcNFT1',
		'rcNFT',
		'Placeholder',
		100,
		BASE_RCNFT_PRICE,
		ZERO_ADDRESS,
		{'from': accounts[0]}
	)

	global BASE_RCNFT_INSTANCE_ADDRESS
	BASE_RCNFT_INSTANCE_ADDRESS = tx1.new_contracts[0]

@pytest.fixture(scope="module", autouse=True)
def deploy_secondary_rcnft(RecursiveConditionalNFTFactoryContract, accounts):

	tx1 = RecursiveConditionalNFTFactoryContract.deploy_rcnft_contract(
		'rcNFT2',
		'rcNFT',
		'Placeholder',
		10,
		SECONDARY_RCNFT_PRICE,
		BASE_RCNFT_INSTANCE_ADDRESS,
		{'from': accounts[0]}
	)

	global SECONDARY_RCNFT_INSTANCE_ADDRESS
	SECONDARY_RCNFT_INSTANCE_ADDRESS = tx1.new_contracts[0]

@pytest.fixture(scope="module", autouse=True)
def add1_buys_base_rcnft(deploy_base_rcnft, accounts):
	"""
	Address 1 purchases base rcNFT
	"""

	base_rcnft_instance = RecursiveConditionalNFT.at(BASE_RCNFT_INSTANCE_ADDRESS)

	tx1 = base_rcnft_instance.purchase({'from': accounts[1], 'value': BASE_RCNFT_PRICE})

	assert tx1.events['Purchase']['purchaser'] == accounts[1]
	assert tx1.events['Purchase']['tokenId'] == 1
	assert tx1.events['Purchase']['value'] == BASE_RCNFT_PRICE

@pytest.fixture(autouse=True)
def isolation(fn_isolation):
	pass

def test_initial_state(accounts):

	base_rcnft_instance = RecursiveConditionalNFT.at(BASE_RCNFT_INSTANCE_ADDRESS)

	assert base_rcnft_instance.preconditionContractAddress() == ZERO_ADDRESS
	assert base_rcnft_instance.balanceOf(accounts[1]) == 1
	assert base_rcnft_instance.ownerOf(1) == accounts[1]

	secondary_rcnft_instance = RecursiveConditionalNFT.at(SECONDARY_RCNFT_INSTANCE_ADDRESS)

	assert secondary_rcnft_instance.preconditionContractAddress() == BASE_RCNFT_INSTANCE_ADDRESS

def test_add1_authorised_purchase_secondary_rcnft(accounts):
	"""
	Address 1 owns primary rcNFT.
	Address 1 purchases secondary rcNFT.
	"""
	secondary_rcnft_instance = RecursiveConditionalNFT.at(SECONDARY_RCNFT_INSTANCE_ADDRESS)

	tx1 = secondary_rcnft_instance.purchase({'from': accounts[1], 'value': SECONDARY_RCNFT_PRICE})

	assert tx1.events['Purchase']['purchaser'] == accounts[1]
	assert tx1.events['Purchase']['tokenId'] == 1
	assert tx1.events['Purchase']['value'] == SECONDARY_RCNFT_PRICE

def test_add2_unauthorised_purchase_secondary_rcnft(accounts):
	"""
	Address 2 does not own primary rcNFT.
	Address 2 purchases secondary rcNFT.
	"""
	secondary_rcnft_instance = RecursiveConditionalNFT.at(SECONDARY_RCNFT_INSTANCE_ADDRESS)

	with reverts():
		tx1 = secondary_rcnft_instance.purchase({'from': accounts[2], 'value': SECONDARY_RCNFT_PRICE})
