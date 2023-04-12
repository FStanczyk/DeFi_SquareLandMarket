import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/button.css';
import './css/main.css';
import './css/marketInfo.css';
import Main from './pages/main'
import { WagmiConfig, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { chain, configureChains } from 'wagmi'
const ethers = require('ethers');

const root = ReactDOM.createRoot(document.getElementById('root'));
//export let provider = new ethers.providers.Web3Provider(window.ethereum)

const { provider } = configureChains(
  [chain.goerli],
  [infuraProvider({
    apiKey: "aaa8f99b06fe4d4580921fd6bc0e5175",
    stallTimeout: 1_000
  })],
)


const client = createClient({
  autoConnect: true,
  provider: provider,
})

root.render(
  <WagmiConfig client={client}>
      <Main />
  </WagmiConfig>
);