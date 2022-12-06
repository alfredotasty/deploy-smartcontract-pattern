const Web3  = require('web3')
const SmartContract = require('./build/contracts/Number.json')
const address = '0x91b6dA86F790361c46CFf497DC7adf0fC3d5D266'
const privateKey = '61fbb4d3d4e8620624e6e7d3684d73940fd4d6a083a4f6134cd665dd509a23a9'
const infura = 'https://goerli.infura.io/v3/e637e6e4607047e3a69afca5317957c1'


const interact = async () => {
    const web3 = new Web3(infura)
    const networkId = await web3.eth.net.getId()
    const smartContract = new web3.eth.Contract(
        SmartContract.abi,
        SmartContract.networks[networkId].address
    )     
    const transaction = smartContract.methods.setNumber(9)
    const data = transaction.encodeABI();
    const gas = await transaction.estimateGas({address})
    const gasPrice = await web3.eth.getGasPrice()
    const nonce = await web3.eth.getTransactionCount(address)
    web3.eth.accounts.wallet.add(privateKey)
    const acc = await web3.eth.accounts.wallet[address].address
    web3.eth.getAccounts().then(result => console.log(result))
    console.log(acc)
    
    const transactionData = {
        from: 0x91b6dA86F790361c46CFf497DC7adf0fC3d5D266,
        to: smartContract.options.address,
        data: data,
        gas,
        gasPrice,
        nonce,
        chain: 'goerli',
        hardfork: 'istanbul'
    }


    console.log(`before set number: ${await smartContract.methods.getNumber().call()}`)
    console.log("wait for proof transaction and save new number to blockchain...")
    const result = await web3.eth.sendTransaction(transactionData)
    console.log(`after set number: ${await smartContract.methods.getNumber().call()}`)
    console.log(`transaction hash: ${result.transactionHash}`)
  

}  
interact()