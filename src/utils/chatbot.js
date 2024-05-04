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

        const arrayString = JSON.stringify(state.context);
        
        console.log(`Bitcoin price history: ${arrayString}`);

        const requestData = {
            messages: [
              {
                role: 'human',
                content: message,
              }
            ],
            context: [
                {
                    "uuid": "12345-abcde",
                    "name": "Crypto price widget",
                    "description": "Contains the price history of a cryptocurrency with epoch timestamps in milliseconds. It is an 2 dimensional array with the first element being the epoch timemstamp in milliseconds and the second element being the price of the cryptocurrency at that time.",
                    "content": `Bitcoin price history: ${arrayString}`,
                }
            ]
          };

          console.log(state);
          

        try {
            const response = await axios.post(`http://localhost:7777/v1/query`, requestData, {
              headers: {
                'Content-Type': 'application/json',
              },
              responseType: 'stream',
            });

            console.log(response);

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
