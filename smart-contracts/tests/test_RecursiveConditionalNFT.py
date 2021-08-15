import pytest

from brownie import (
	accounts,
	RecursiveConditionalNFT,
	RecursiveConditionalNFTFactory,
)

ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

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
		1e16,
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
		5e15,
		BASE_RCNFT_INSTANCE_ADDRESS,
		{'from': accounts[0]}
	)

	global SECONDARY_RCNFT_INSTANCE_ADDRESS
	SECONDARY_RCNFT_INSTANCE_ADDRESS = tx1.new_contracts[0]

@pytest.fixture(autouse=True)
def isolation(fn_isolation):
	pass

def test_initial_state():

	base_rcnft_instance = RecursiveConditionalNFT.at(BASE_RCNFT_INSTANCE_ADDRESS)

	assert base_rcnft_instance.preconditionContractAddress() == ZERO_ADDRESS

	secondary_rcnft_instance = RecursiveConditionalNFT.at(SECONDARY_RCNFT_INSTANCE_ADDRESS)

	assert secondary_rcnft_instance.preconditionContractAddress() == BASE_RCNFT_INSTANCE_ADDRESS
