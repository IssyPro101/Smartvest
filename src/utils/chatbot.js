import React from "react";
import axios from 'axios';

const BASE_URL_COPILOT = process.env.REACT_APP_BASE_URL_COPILOT;

const platformMap = {
    "aa70268e-4b52-42bf-a116-608b370f9501": "AAVE V3 - Ethereum",
    "7da72d09-56ca-4ec5-a45f-59114353e487": "Compound V3 - Ethereum",
    "cefa9bb8-c230-459a-a855-3b94e96acd8c": "Compound V2 - Ethereum",
    "a349fea4-d780-4e16-973e-70ca9b606db2": "AAVE V2 - Ethereum",
    "7e0661bf-8cf3-45e6-9424-31916d4c7b84": "AAVE V3 - Base",
    "0c8567f8-ba5b-41ad-80de-00a71895eb19": "Compound V3 - Base"
}

import {
    createCustomMessage,
  } from 'react-chatbot-kit';

// MessageParser starter code
export const MessageParser = ({ children, actions }) => {
    const parse = (message) => {

        actions.handleMessage(message);

    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

// ActionProvider starter code
export const ActionProvider = ({ createChatBotMessage, setState, state, children }) => {
    const handleMessage = async (message) => {

        console.log(createCustomMessage);

        console.log(state.context)
        const bitcoinPriceHistory = JSON.stringify(state.context.bitcoinPrice);
        const ethPriceHistory = JSON.stringify(state.context.ethereumPrice);
        const avaxPriceHistory = JSON.stringify(state.context.avaxPrice);
        const dogePriceHistory = JSON.stringify(state.context.dogePrice);
        const latestNews = JSON.stringify(state.context.news);
        const usdcYields = JSON.stringify(state.context.yields.map((y) => {
            return ({
                "platform": platformMap[y.poolId],
                "apy": y.apy
            })
        }));

        console.log(latestNews);

        const requestData = {
            messages: [
                ...state.messages.map((message) => {
                    if (message.type === "bot") {
                        return {
                            "role": "ai",
                            "content": message.message
                        }
                    } else {
                        return {
                            "role": "human",
                            "content": message.message
                        }
                    }
                }),
                {
                    role: 'human',
                    content: message,
                }
            ],
            context: [
                {
                    "uuid": "12345-abcde",
                    "name": "Crypto price widget",
                    "description": "Contains the price history of a cryptocurrency with epoch timestamps in milliseconds. It is an 2 dimensional array with the first element being the epoch timemstamp in milliseconds and the second element being the price of the cryptocurrency at that time. When delivering this information make sure to always communicate with dates and not epoch timestamps, this may require you to convert the epoch timestamps to dates.",
                    "content": `Bitcoin price history: ${bitcoinPriceHistory}`,
                },
                {
                    "uuid": "12345-abcdeff",
                    "name": "Crypto price widget",
                    "description": "Contains the price history of a cryptocurrency with epoch timestamps in milliseconds. It is an 2 dimensional array with the first element being the epoch timemstamp in milliseconds and the second element being the price of the cryptocurrency at that time. When delivering this information make sure to always communicate with dates and not epoch timestamps, this may require you to convert the epoch timestamps to dates.",
                    "content": `Ether price history: ${ethPriceHistory}`,
                },
                {
                    "uuid": "12345-abcdedaw",
                    "name": "Crypto price widget",
                    "description": "Contains the price history of a cryptocurrency with epoch timestamps in milliseconds. It is an 2 dimensional array with the first element being the epoch timemstamp in milliseconds and the second element being the price of the cryptocurrency at that time. When delivering this information make sure to always communicate with dates and not epoch timestamps, this may require you to convert the epoch timestamps to dates.",
                    "content": `Avax price history: ${avaxPriceHistory}`,
                },
                {
                    "uuid": "12345-abcde42",
                    "name": "Crypto price widget",
                    "description": "Contains the price history of a cryptocurrency with epoch timestamps in milliseconds. It is an 2 dimensional array with the first element being the epoch timemstamp in milliseconds and the second element being the price of the cryptocurrency at that time. When delivering this information make sure to always communicate with dates and not epoch timestamps, this may require you to convert the epoch timestamps to dates.",
                    "content": `Dogecoin price history: ${dogePriceHistory}`,
                },
                {
                    "uuid": "12345-abcdef",
                    "name": "Latest Crypto News",
                    "description": "Contains an array of the latest news in the crypto industry. When giving this information make sure it is readable and not in JSON format.",
                    "content": latestNews,
                },
                {
                    "uuid": "12345-41243",
                    "name": "USDC Yield Rates",
                    "description": "Contains an array of USDC yield rates from different DeFi platforms. When giving this information make sure it is readable and not in JSON format.",
                    "content": usdcYields,
                }
            ]
        };

        try {
            const response = await axios.post(`${BASE_URL_COPILOT}/v1/query`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'stream',
            });

            const botMessage = createChatBotMessage(response.data);

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));

        } catch (error) {
            console.error('Error:', error);
        }


    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleMessage,
                    },
                });
            })}
        </div>
    );
};