import hvac
import os

root_token = os.environ.get('VAULT_TOKEN')
vault_url = os.environ.get('VAULT_ADDR')
print(root_token)
print(vault_url)

def put_vault_secret(token, secret_path, secret_data):
    """
    Puts a secret in HashiCorp Vault.
    
    :param vault_url: The URL of the Vault server (e.g., 'http://
    :param token: The Vault authentication token.
    :param secret_path: The path to the secret (e.g., 'secret/my_secret')
    :param secret_data: The secret data to store.
    :return: A message indicating success or failure.
    """
    try:
        # Create a Vault client
        client = hvac.Client(url=vault_url, token=token)
        
        # Check if client is authenticated
        if not client.is_authenticated():
            raise Exception("Vault authentication failed.")
        
        # Put the secret
        client.secrets.kv.v2.create_or_update_secret(path=secret_path, secret=secret_data)
        
        return "Secret stored successfully."

    except Exception as e:
        return f"Error storing secret: {str(e)}"

# put_vault_secret(root_token, 'django', {'tabi3a': 'my_secret'})
def get_vault_secret(token, secret_path):
    """
    Fetches a secret from HashiCorp Vault.
    
    :param vault_url: The URL of the Vault server (e.g., 'http://127.0.0.1:8200')
    :param token: The Vault authentication token.
    :param secret_path: The path to the secret (e.g., 'secret/my_secret')
    :return: The secret data or an error message.
    """
    try:
        # Create a Vault client
        client = hvac.Client(url=vault_url, token=token)
        
        # Check if client is authenticated
        if not client.is_authenticated():
            raise Exception("Vault authentication failed.")
        
        # Fetch the secret
        secret = client.secrets.kv.read_secret_version(path=secret_path)
        print(secret)
        # Return the data part of the secret
        return secret['data']['data']  # Adjust based on your secret engine version

    except Exception as e:
        return f"Error fetching secret: {str(e)}"


SECRET_KEY = get_vault_secret(root_token, 'django')['SECRET_KEY']

print(SECRET_KEY)