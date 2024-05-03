import React from "react";

// MessageParser starter code
export const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
      if (message.includes('hello')) {
        actions.handleHello();
      }
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
  export const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
      const botMessage = createChatBotMessage('Hello. Nice to meet you.');
  
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
  
    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              handleHello,
            },
          });
        })}
      </div>
    );
  };

  
  // Config starter code
  import { createChatBotMessage } from "react-chatbot-kit";
  
  export const config = {
    initialMessages: [createChatBotMessage(`Hello world`)]
  }
