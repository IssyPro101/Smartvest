import axios from 'axios';



export const fetchCryptoData = async (coins) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join()}&vs_currencies=usd`;
    try {
        const result = await axios.get(url, {
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mPnW1f6p1SgeWWwmLW5mvH41' }
        });

        console.log(result);
    } catch (error) {
        console.error(error);
    }

}
