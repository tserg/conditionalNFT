import os
from dotenv import load_dotenv

load_dotenv()

LOCK_ADDRESS = os.environ.get("LOCK_ADDRESS")

from brownie import ConditionalNFT, accounts

def main():
	acct = accounts.load('deployment_account')
	ConditionalNFT.deploy('conditionalNFT', 'cNFT', 'Placeholder', LOCK_ADDRESS, {'from': acct})
