import { useEffect, useState } from "react";

import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { getAccountId } from "../../redux/account/selectors";
import myEpicNFT from "../../utils/MyEpicNFT.json";
import { ButtonMUI } from "../UI/atoms/Button";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "https://testnets.opensea.io/assets/";
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0xA79075Eec50818ef5b0D9fe82c1dDd40bED4b482";

export const Mint = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [totalSupply, setTotalSupply] = useState(50);
  const [nftMinted, setNftMinted] = useState(0);
  
  const account = useSelector(getAccountId);

  const dispatch = useDispatch();

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) {
      alert("Make sure you have metamaskt!");
      return;
    }

    console.log("We have the ethereum object", window.ethereum);
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    console.log(accounts);

    if (accounts.length > 0) {
      console.log("found an autheized account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      setupEventListener();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    
    try {
      const provider = await detectEthereumProvider();
      console.log(provider);
      if (!provider) {
        alert("GET Metamaskt!");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("Connected: ", accounts);
      setCurrentAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.log("error -> ", error);
    }
  };

  const setupEventListener = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNFT.abi,
          signer
        );

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log("FROM AND TOKENID", from, tokenId.toNumber());
          alert(
            `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        });
        console.log("Setup event listener!");
      } else {
        console.log("Ehereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          myEpicNFT.abi,
          signer
        );
        await provider.send("eth_requestAccounts", []);

        console.log("Going to pop wallet now to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`
        );

        getTotalSupply();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error -> ", error);
    }
  };

  const getTotalSupply = async () => {
    //mi address 0x258311d25007f31e26414Bc0d5F9b349EA404280

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //const provider = await detectEthereumProvider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicNFT.abi,
        signer
      );

      provider
        .send("eth_requestAccounts", [])
        .then(async (res) => {
          let nftMintedContract = await connectedContract.getTotalNFTsMinted();
          console.log(nftMintedContract);
          setNftMinted(nftMintedContract.toNumber());
        })
        .catch((error) => {
          console.log("Error", error);
          console.log("Please connect a wallet");
        });
    } else {
      console.log("No hay window.ethereum");
    }
  };

  useEffect(() => {
    //getTotalSupply();
    //dispatch(setAccountId());
    //checkIfWalletIsConnected();
  }, []);

  const renderNotConnectedContainer = () => (
    <ButtonMUI variant="contained" onClick={connectWallet}>
      Connect to Wallet
    </ButtonMUI>
  );
  const renderMintUI = () => (
    <ButtonMUI variant="outlined" onClick={askContractToMintNft}>
      Mint NFT
    </ButtonMUI>
  );
  return (
    <div className="container-mint">
      <div>
        <h1>My NFT Colection</h1>
      </div>
      <div>
        <p>{nftMinted + "/50"}</p>
      </div>
      <div>
        {account ? renderMintUI() : renderNotConnectedContainer()}
      </div>
    </div>
  );
};
