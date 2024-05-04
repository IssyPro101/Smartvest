import axios from 'axios';

export const fetchCryptoData = async (coins) => {

    const results = [];

    for (let i = 0; i < coins.length; i++) {
        const url = `https://api.coingecko.com/api/v3/coins/${coins[i]}`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

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
        const url = `https://api.coingecko.com/api/v3/coins/${coins[i]}/market_chart?vs_currency=usd&days=7`;

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

export const fetchCryptoNews = async () => {

    const results = [];

    for (let i = 0; i < 2; i++) {
        const url = `https://cryptonews-api.com/api/v1/category?section=general&items=3&page=${i+1}&token=3rqmq1tlalskmnjzkzahg2sdzoecebkalsyhwxnm`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });
    
            console.log(result.data.data);
            results.push(...result.data.data);
        } catch (error) {
            console.error(error);
        }  
    }


    console.log(results);
    return results;


}
