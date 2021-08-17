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
def base_rcnft(RecursiveConditionalNFTFactoryContract, accounts):

	tx1 = RecursiveConditionalNFTFactoryContract.deploy_rcnft_contract(
		'rcNFT1',
		'rcNFT',
		'Placeholder',
		100,
		BASE_RCNFT_PRICE,
		ZERO_ADDRESS,
		{'from': accounts[0]}
	)

	yield RecursiveConditionalNFT.at(tx1.new_contracts[0])

@pytest.fixture(scope="module", autouse=True)
def secondary_rcnft(base_rcnft, RecursiveConditionalNFTFactoryContract, accounts):

	tx1 = RecursiveConditionalNFTFactoryContract.deploy_rcnft_contract(
		'rcNFT2',
		'rcNFT',
		'Placeholder',
		10,
		SECONDARY_RCNFT_PRICE,
		base_rcnft,
		{'from': accounts[0]}
	)

	yield RecursiveConditionalNFT.at(tx1.new_contracts[0])

@pytest.fixture(scope="module", autouse=True)
def add1_buys_base_rcnft(base_rcnft, accounts):
	"""
	Address 1 purchases base rcNFT
	"""
	tx1 = base_rcnft.purchase({'from': accounts[1], 'value': BASE_RCNFT_PRICE})

	assert tx1.events['Purchase']['purchaser'] == accounts[1]
	assert tx1.events['Purchase']['tokenId'] == 1
	assert tx1.events['Purchase']['value'] == BASE_RCNFT_PRICE

@pytest.fixture(autouse=True)
def isolation(fn_isolation):
	pass

def test_initial_state(base_rcnft, secondary_rcnft, accounts):

	assert base_rcnft.preconditionContractAddress() == ZERO_ADDRESS
	assert base_rcnft.balanceOf(accounts[1]) == 1
	assert base_rcnft.ownerOf(1) == accounts[1]

	assert secondary_rcnft.preconditionContractAddress() == base_rcnft.address

def test_add1_authorised_purchase_secondary_rcnft(secondary_rcnft, accounts):
	"""
	Address 1 owns primary rcNFT.
	Address 1 purchases secondary rcNFT.
	"""
	assert secondary_rcnft.isEligible(accounts[1]) == True

	tx1 = secondary_rcnft.purchase({'from': accounts[1], 'value': SECONDARY_RCNFT_PRICE})

	assert tx1.events['Purchase']['purchaser'] == accounts[1]
	assert tx1.events['Purchase']['tokenId'] == 1
	assert tx1.events['Purchase']['value'] == SECONDARY_RCNFT_PRICE

def test_add1_unauthorised_transfer_secondary_rcnft(secondary_rcnft, accounts):
	"""
	Address 1 owns primary and secondary rcNFT.
	Address 2 does not own primary rcNFT.
	Address 1 transfers secondary rcNFT to address 2.
	"""
	assert secondary_rcnft.isEligible(accounts[2]) == False

	with reverts():
		tx1 = secondary_rcnft.transferFrom(accounts[1], accounts[2], 1, {'from': accounts[1]})

def test_add2_unauthorised_purchase_secondary_rcnft(secondary_rcnft, accounts):
	"""
	Address 2 does not own primary rcNFT.
	Address 2 purchases secondary rcNFT.
	"""
	assert secondary_rcnft.isEligible(accounts[2]) == False

	with reverts():
		tx1 = secondary_rcnft.purchase({'from': accounts[2], 'value': SECONDARY_RCNFT_PRICE})

def test_add1_authorised_transfer_secondary_rcnft(base_rcnft, secondary_rcnft, accounts):
	"""
	Address 1 and 2 owns primary rcNFT.
	Address 1 owns secondary rcNFT.
	Address 1 transfers secondary rcNFT to address 2.
	"""
	tx1 = base_rcnft.purchase({'from': accounts[2], 'value': BASE_RCNFT_PRICE})
	tx2 = secondary_rcnft.purchase({'from': accounts[1], 'value': SECONDARY_RCNFT_PRICE})

	assert secondary_rcnft.isEligible(accounts[2]) == True

	tx3 = secondary_rcnft.transferFrom(accounts[1], accounts[2], 1, {'from': accounts[1]})

	assert tx3.events['Transfer']['sender'] == accounts[1]
	assert tx3.events['Transfer']['receiver'] == accounts[2]
	assert tx3.events['Transfer']['tokenId'] == 1
	assert secondary_rcnft.ownerOf(1) == accounts[2]
