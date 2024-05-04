import httpx

BASE_URL = "http://localhost:7777"

# Query, without context.
print("\n\nTesting query:")
print("==============")
with httpx.stream(
    "POST",
    f"{BASE_URL}/v1/query",
    json={"messages": [{"role": "human", "content": "What is your name?"}]},
) as response:
    for chunk in response.iter_text():
        print(chunk, end="", flush=True)


# Query, with context.
print("\n\nTesting query with context:")
print("==============")
with httpx.stream(
    "POST",
    f"{BASE_URL}/v1/query",
    json={
        "messages": [
            {"role": "human", "content": "What is the current stock price of BTC?"}
        ],
        "context": [
            {
                "uuid": "12345-abcde",
                "name": "Crypto price widget",
                "description": "Contains the price of a cryptocurrency.",
                "metadata": {"ticker": "BTC"},
                "content": "The price of bitcoin is $100",
            }
        ],
    },
) as response:
    for chunk in response.iter_text():
        print(chunk, end="", flush=True)


# Query, with history.
print("\n\nTesting query with chat history:")
print("==============")
with httpx.stream(
    "POST",
    f"{BASE_URL}/v1/query",
    json={
        "messages": [
            {
                "role": "human",
                "content": "Only provide Yes or No as your answer and NOTHING ELSE. Is ETH a well known cryptocurrency?",
            },
            {"role": "ai", "content": "Yes."},
            {"role": "human", "content": "What about BTC?"},
        ],
    },
) as response:
    for chunk in response.iter_text():
        print(chunk, end="", flush=True)
