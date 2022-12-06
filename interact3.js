const Web3  = require('web3')
const SmartContract = require('./build/contracts/Number.json')
const address = '0x91b6dA86F790361c46CFf497DC7adf0fC3d5D266'
const privateKey = '61fbb4d3d4e8620624e6e7d3684d73940fd4d6a083a4f6134cd665dd509a23a9'
const infura = 'https://goerli.infura.io/v3/e637e6e4607047e3a69afca5317957c1'
const Provider = require('@truffle/hdwallet-provider')


const interact = async () => {
    const provider = new Provider(privateKey, infura); 
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId()
    const smartContract = new web3.eth.Contract(
        SmartContract.abi,
        SmartContract.networks[networkId].address
    )

    console.log(`before set number: ${await smartContract.methods.getNumber().call()}`)
    console.log("wait for proof transaction and save new number to blockchain...")
    const result = await smartContract.methods.setNumber(25).send({from: address})
    console.log(`after set number: ${await smartContract.methods.getNumber().call()}`)
    console.log(`transaction hash: ${result.transactionHash}`)

}
interact()
    