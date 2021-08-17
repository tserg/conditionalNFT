import os

from dotenv import load_dotenv

from flask import (
	Flask,
	render_template,
)

load_dotenv()

CNFT_FACTORY_ADDRESS_DEVELOPMENT = os.getenv('CNFT_FACTORY_ADDRESS_DEVELOPMENT')
CNFT_FACTORY_ADDRESS_RINKEBY = os.getenv('CNFT_FACTORY_ADDRESS_RINKEBY')
CNFT_FACTORY_ADDRESS_MAINNET = os.getenv('CNFT_FACTORY_ADDRESS_MAINNET')

RCNFT_FACTORY_ADDRESS_DEVELOPMENT = os.getenv('RCNFT_FACTORY_ADDRESS_DEVELOPMENT')
RCNFT_FACTORY_ADDRESS_RINKEBY = os.getenv('RCNFT_FACTORY_ADDRESS_RINKEBY')
RCNFT_FACTORY_ADDRESS_MAINNET = os.getenv('RCNFT_FACTORY_ADDRESS_MAINNET')

CNFT_FACTORY_ADDRESSES = {
	'development': CNFT_FACTORY_ADDRESS_DEVELOPMENT,
	'rinkeby': CNFT_FACTORY_ADDRESS_RINKEBY,
	'mainnet': CNFT_FACTORY_ADDRESS_MAINNET
}

RCNFT_FACTORY_ADDRESSES = {
	'development': RCNFT_FACTORY_ADDRESS_DEVELOPMENT,
	'rinkeby': RCNFT_FACTORY_ADDRESS_RINKEBY,
	'mainnet': RCNFT_FACTORY_ADDRESS_MAINNET
}

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():

    return render_template('pages/index.html', cnft_factory_addresses=RCNFT_FACTORY_ADDRESSES)

@app.route('/unlock', methods=['GET'])
def index_unlock():

	return render_template('pages/index_unlock.html', cnft_factory_addresses=CNFT_FACTORY_ADDRESSES)

@app.route('/deploy', methods=['GET'])
def deploy():

	return render_template('pages/deploy.html', cnft_factory_addresses=RCNFT_FACTORY_ADDRESSES)

@app.route('/unlock/deploy', methods=['GET'])
def deploy_unlock():

	return render_template('pages/deploy.html', cnft_factory_addresses=CNFT_FACTORY_ADDRESSES)

@app.route('/purchase/<cnft_address>', methods=['GET'])
def purchase(cnft_address):
	print(str(cnft_address));
	return render_template(
		'pages/purchase.html',
		cnft_address=str(cnft_address)
	)

@app.route('/unlock/purchase/<cnft_address>', methods=['GET'])
def purchase_unlock(cnft_address):
	print(str(cnft_address));
	return render_template(
		'pages/purchase.html',
		cnft_address=str(cnft_address)
	)
