import React, { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null); // State to store web3Modal instance

  useEffect(() => {
    const providerOptions = {
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: 'Your dApp Name',
          infuraId: 'YOUR_INFURA_ID',  // Replace with your actual Infura ID
          chainId: 1, 
        }
      }
    };

    (async () => {
      const modal = new Web3Modal({ providerOptions });
      setWeb3Modal(modal); // Store the web3Modal instance

      try {
        const provider = await modal.connect();
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        const [connectedAccount] = await web3Instance.eth.getAccounts();
        setAccount(connectedAccount);
      } catch (error) {
        console.error("Error connecting:", error); 
      }
    })(); 
  }, []); 

  return (
    <div>
      <button onClick={() => web3 ? web3.eth.getBalance(account).then(console.log) : web3Modal.connect()}>
        {web3 ? 'Get Balance' : 'Connect Wallet'}
      </button>
      {web3 && <div>Connected! Account: {account}</div>}
    </div>
  );
}

export default App;