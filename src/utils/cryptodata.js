import axios from 'axios';

export const fetchCryptoData = async (coins) => {

    const results = [];

    for (let i = 0; i < coins.length; i++) {
        const url = `http://localhost:5555/https://api.coingecko.com/api/v3/coins/${coins[i]}`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

            console.log(result);

            results.push(result.data);
        } catch (error) {
            console.error(error);
        }  
    }

    return results;


}

export const fetchCryptoChartData = async (coins) => {

    const results = {};

    for (let i = 0; i < coins.length; i++) {
        const url = `http://localhost:5555/https://api.coingecko.com/api/v3/coins/${coins[i]}/market_chart?vs_currency=usd&days=7&interval=daily&precision=2`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

            console.log(result);

            results[coins[i]] = result.data.prices;
        } catch (error) {
            console.error(error);
        }  
    }

    return results;


}

export const fetchCryptoNews = async () => {


    const url = `http://localhost:5555/https://cryptopanic.com/api/v1/posts/?auth_token=844565ccd309b49fdbad68395f4b626e5e200ddb&public=true&metadata=true`;

    try {
        const result = await axios.get(url, {
            headers: { accept: 'application/json'}
        });

        return result.data.results;
    } catch (error) {
        console.error(error);
    }  


}

export const fetchYieldRates = async () => {


    const results = [];

    const poolIds = [
        "aa70268e-4b52-42bf-a116-608b370f9501",
        "7da72d09-56ca-4ec5-a45f-59114353e487",
        "cefa9bb8-c230-459a-a855-3b94e96acd8c",
        "a349fea4-d780-4e16-973e-70ca9b606db2",
        "7e0661bf-8cf3-45e6-9424-31916d4c7b84",
        "0c8567f8-ba5b-41ad-80de-00a71895eb19"
    ]

    for (let i = 0; i < poolIds.length; i++) {
        const url = `http://localhost:5555/https://yields.llama.fi/chart/${poolIds[i]}`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

            console.log(result);

            results.push({poolId: poolIds[i], apy: result.data.data[result.data.data.length-1].apyBase});

        } catch (error) {
            console.error(error);
        }  
    }

    console.log(results);

    return results;


}
