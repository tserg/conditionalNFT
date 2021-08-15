# @version ^0.2.0

"""
@title Recursive Conditional NFT Factory
@author Gary Tse
@notice Factory to deploy `RecursiveConditionalNFT` contracts
"""

interface RecursiveConditionalNFT:
	def initialize(
		_name: String[64],
		_symbol: String[32],
		_tokenURI: String[128],
		_maxSupply: uint256,
		_minPrice: uint256,
		_preconditionAddress: address,
		_minter: address,
		_beneficiary: address
	) -> bool: nonpayable

event RecursiveConditionalNFTCreated:
	token: address
	name: String[64]
	symbol: String[32]

# @dev Target address of the ConditionalNFT contract
target: public(address)

# @dev Coutn of cNFT instances
totalCount: public(uint256)

# @dev Mapping of index to cNFT address
indexToCNFT: HashMap[uint256, address]

# @dev Mapping of cNFT to Lock address
indexToCNFTToCondition: HashMap[uint256, HashMap[address, address]]

@external
def __init__(_target: address):
	self.target = _target
	self.totalCount = 0

@external
def deploy_rcnft_contract(
	_name: String[64],
	_symbol: String[32],
	_tokenURI: String[128],
	_maxSupply: uint256,
	_minPrice: uint256,
	_preconditionAddress: address
) -> address:
	"""
	@notice Deploy a cNFT contract
	@param _name Name of the token
	@param _symbol Symbol of the token
	@param _tokenURI URI of the token metadata
	@param _maxSupply Maximum supply of the token
	@param _minPrice Minimum price of the token
	@param _preconditionAddress Address of the RecursiveConditionalNFT contract that is condition for holding, transferring and receiving token
	@return address Address of deployed cNFT
	"""
	_contract: address = create_forwarder_to(self.target)
	RecursiveConditionalNFT(_contract).initialize(
		_name,
		_symbol,
		_tokenURI,
		_maxSupply,
		_minPrice,
		_preconditionAddress,
		msg.sender,
		msg.sender
	)
	log RecursiveConditionalNFTCreated(_contract, _name, _symbol)
	self.totalCount += 1
	current_index: uint256 = self.totalCount
	self.indexToCNFT[current_index] = _contract
	self.indexToCNFTToCondition[current_index][_contract] = _preconditionAddress
	return _contract

@view
@external
def get_cnft_by_index(
	_index: uint256
) -> address:
	"""
	@notice Get cNFT address by index
	@param _index Index of cNFT
	@return address Address of cNFT at index
	"""
	return self.indexToCNFT[_index]

@view
@external
def get_condition_by_index_and_cnft(
	_index: uint256,
	_cnft: address
) -> address:
	"""
	@notice Get condition address by index and cNFT
	@param _index Index of cNFT
	@param _cnft Address of cNFT
	@return address Address of lock for given index and cNFT
	"""
	return self.indexToCNFTToCondition[_index][_cnft]
