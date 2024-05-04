### Installation and Running

1. Clone this repository to your local machine.
2. Set the OpenAI API key as an environment variable in your .bashrc or .zshrc file:

``` sh
# in .zshrc or .bashrc
export OPENAI_API_KEY=<your-api-key>
```

3. Install the necessary dependencies:

``` sh
poetry install --no-root
```

4.Start the API server:

``` sh
uvicorn main:app --port 7777 --reload
```

This command runs the FastAPI application, making it accessible on your network.

### Testing the Example Copilot
Once the API server is running, you can make sure it works correctly by
executing the `test.py` file:

``` sh
python3 test.py
```

### Accessing the Documentation

Once the API server is running, you can view the documentation and interact with
the API by visiting: http://localhost:7777/docs
