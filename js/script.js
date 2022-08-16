const netURL = 'https://mainnet.infura.io/v3/30ea44a7f7a54d0d899346ed5a0929fd';
const ADDRESS = '0x80D74DEe91942D5D7aE7a860EA46cb60E77a2c6C';
const web3 = window.Web3
const ethereum = window.ethereum
let accounts
let price = 0.03
const input = document.querySelector(".eth_input")
const button = document.querySelector(".metamask_content-btn")
const title = document.querySelector(".metamask_content-title")
const priceDisplay = document.querySelector("#price")
const Web3 = new web3(netURL)

window.addEventListener("load", () => {
    button.disabled = false
    button.classList.remove('hidden');
    if (ethereum.selectedAddress) {
        document.querySelector(".container_link_metamask_install-btn").style.display = "none"
        document.querySelector(".container_metamask_content-btn").style.display = "flex"
        button.innerHTML = "Mint now"
        input.disabled = false
        title.innerHTML = "MetaMask connected"
    }
    else if (ethereum.isMetaMask) {
        document.querySelector(".container_link_metamask_install-btn").style.display = "none"
        document.querySelector(".container_metamask_content-btn").style.display = "flex"
        title.innerHTML = "MetaMask installed"
        input.disabled = false
    }


})

const getAccount = async () => {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts)
    if (window.ethereum.chainId == "0x1") console.log("Already connected to ethereum mainnet...")
    else {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x1'}],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x1',
                            rpcUrl: netURL
                        }],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
        }
    }
}


const sendTransaction =  async () => {
    price = +input.value * 0.03
    const priceToWei = (price * 1e18).toString(16)
    ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: accounts[0],
                    to: ADDRESS,
                    value: priceToWei,
                },
            ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
};


input.addEventListener("input", () => {
    if (+input.value < 1) button.disabled = true
    else if (+input.value >= 1) button.disabled = false

    price = +input.value * 0.03
    if (+input.value >= 1) priceDisplay.innerText = price.toFixed(2)
	//else if(input.value < 1) input.value =+ "1"
	else priceDisplay.innerText = "0"
})

button.addEventListener("click", async () => {
    if (!ethereum.selectedAddress) {
        await getAccount()
        button.innerHTML = "Mint now"
        title.innerHTML = "MetaMask connected"
    } else {
        await getAccount()
        await sendTransaction()
    }
})

document.querySelector(".up_arrow").addEventListener("click", () => {
    input.value = +input.value + 1
    event = new Event("input")
    input.dispatchEvent(event)

})
document.querySelector(".down_arrow").addEventListener("click", () => {
    input.value = +input.value - 1
    event = new Event("input")
    input.dispatchEvent(event)

})
