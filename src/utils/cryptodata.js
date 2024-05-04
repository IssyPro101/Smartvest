import axios from 'axios';



export const fetchCryptoData = async (coins) => {

    const results = [];

    for (let i = 0; i < coins.length; i++) {
        const url = `https://api.coingecko.com/api/v3/coins/${coins[i]}`;

        try {
            const result = await axios.get(url, {
                headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
            });

            console.log(result.data);
            results.push(result.data);
        } catch (error) {
            console.error(error);
        }  
    }

    return results;


}
