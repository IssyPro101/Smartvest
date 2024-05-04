import React from "react";
import axios from 'axios';

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

        console.log(state.context)
        const bitcoinPriceHistory = JSON.stringify(state.context.bitcoinPrice);
        const ethPriceHistory = JSON.stringify(state.context.ethereumPrice);
        const avaxPriceHistory = JSON.stringify(state.context.avaxPrice);
        const dogePriceHistory = JSON.stringify(state.context.dogePrice);
        const latestNews = JSON.stringify(state.context.news);

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
                }
            ]
          };
          
        try {
            const response = await axios.post(`http://localhost:7777/v1/query`, requestData, {
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
  
    // Put the handleHello function in the actions object to pass to the MessageParser
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

  
  // Config starter code
  
  export const config = {
    initialMessages: []
  }
