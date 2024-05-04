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

    const results = [];

    for (let i = 0; i < coins.length; i++) {
        const url = `http://localhost:5555/https://api.coingecko.com/api/v3/coins/${coins[i]}/market_chart?vs_currency=usd&days=7&interval=daily`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

            console.log(result);
            console.log("Dawd")
            results.push(result.data);
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

        console.log(result);
        return result.data.results;
    } catch (error) {
        console.error(error);
    }  


}
