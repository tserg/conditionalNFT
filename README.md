# ConditionalNFT

This is an implementation of ERC721 in Vyper.

In order to hold, receive, purchase or transfer a Conditional NFT, an address has to also hold an associated Lock from Unlock Protocol.

The purpose of Conditional NFT is to introduce second-order monetisation for exclusive content. Currently, Unlock Protocol grants first-order monetisation by using Locks to limit access to content. We extend this concept by transforming Locks into merely a right or chance to qualify for access or purchase to content.

For example, an artist may issue a limited run of 50 pieces of 12" vinyls, wrapped as a NFT. In order to be able to purchase this NFT, an address has to first have a Lock issued by the artist, thereby rendering the primary NFT one that is conditional upon a Lock.  

Original ERC721 code is taken from the [official Vyper repository](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)

The following additional extensions have been implemented:
- ERC721Metadata
- ERC721Enumerable

An instance has been deployed on https://cnft.herokuapp.com

## Installation

We use the Brownie framework for development and deployment. Please refer to the instructions below for installation.

### Vyper

See the (Vyper documentation)[https://vyper.readthedocs.io/en/latest/installing-vyper.html] for build instructions.

### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

### PIP dependencies

Once you have your virtual environment setup and running, install dependencies by running:
```bash
pip install -r requirements.txt
```
This will install all of the required packages we selected within the `requirements.txt` file.

## Deployment

### Smart Contracts

To deploy the contract on your local instance, run `brownie run deploy.py --network development`.

For deployment on Rinkeby, replace `development` with `rinkeby` and save your Infura project ID as an environment variable.

```
export WEB3_INFURA_PROJECT_ID=<PROJECT_ID>
```

### Flask

To launch the Flask app on your local console, navigate to the project root and run the following commands:

```
export FLASK_APP=flask_app
export FLASK_DEBUG=True
flask run
```

## Future Improvements
- Add ERC20 token for payment
- Toggle whether smart contract also requires a lock based on boolean variable
