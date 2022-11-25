import React from "react";

function Api() {
    //Get Wallet Balance and Token Price on all chains.
    // const web3ApiKey = 'paJAXUnVuLcmZ7ucGEuNcqeN6Rq0Iw86BZWx2UMLJpxpWdHkghqk4s7rO6yEbc14';
    // const web3ApiKey = process.env.WEB_API_KEY;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-API-Key": process.env.WEB_API_KEY,
        },
    };
    // Chain and its wrapper token address data
    const networkData = [
        {
            networkName: "Ethereum",
            chainId: "0x1",
            wrappedTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        },
        {
            networkName: "Polygon",
            chainId: "0x89",
            wrappedTokenAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        },
        {
            networkName: "Binance",
            chainId: "0x38",
            wrappedTokenAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        },
        {
            networkName: "Avalanche",
            chainId: "0xa86a",
            wrappedTokenAddress: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        },
        {
            networkName: "Fantom",
            chainId: "0xfa",
            wrappedTokenAddress: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
        },
        {
            networkName: "Cronos",
            chainId: "0x19",
            wrappedTokenAddress: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
        },
    ];

    const address = "0x4bac59d9cbb5d58e770b56bbe5cf587f47175720";

    networkData.forEach(async (curr) => {
        try {
            const resBalanceData = await fetch(
                `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${curr.chainId}`,
                options
            );
            const resBalance = await resBalanceData.json();
            const resTokenPriceData = await fetch(
                `https://deep-index.moralis.io/api/v2/erc20/${curr.wrappedTokenAddress}/price?chain=${curr.chainId}`,
                options
            );
            const resTokenPrice = await resTokenPriceData.json();
            console.log(resTokenPrice);
            console.log(`
    Network Name - ${curr.networkName}
    Wallet Balance - ${resBalance.balance / 1e18}
    Token Price - $${resTokenPrice.usdPrice.toLocaleString()}/${resTokenPrice.nativePrice.symbol
                }
`);
        } catch (err) {
            console.log(err);
        }
    });
    return <div></div>;
}

export default Api;
