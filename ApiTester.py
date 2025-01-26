import requests

# Disable warnings
requests.packages.urllib3.disable_warnings()

import random

rand = random.randint(0, 1000)
def log_response(response):
    """Log the response with status code and body."""
    print(f"[Status Code]: {response.status_code}")
    try:
        print(f"[Response Body]: {response.json()}")
    except Exception:
        print(f"[Response Body]: {response.text}")

# Base URL
BASE_URL = "https://localhost/api"

# Endpoints to test
ENDPOINTS = [
    {"name": "register", "method": "POST", "url": f"{BASE_URL}/register/", "body": {"email": f"test_user{rand}@test.com", "password1": "test_password", "password2": "test_password"}},
    {"name": "login", "method": "POST", "url": f"{BASE_URL}/login/", "body": {"email": f"test_user{rand}@test.com", "password": "test_password"}},
    {"name": "get_user_profile", "method": "GET", "url": f"{BASE_URL}/user/"},
    {"name": "get_routes", "method": "GET", "url": f"{BASE_URL}/"},
    {"name": "check_user", "method": "POST", "url": f"{BASE_URL}/check-user/", "body": {"username": "test_user"}},
    # {"name": "logout", "method": "POST", "url": f"{BASE_URL}/logout/"},
    {"name": "get_user_time_spent", "method": "GET", "url": f"{BASE_URL}/time-spent/"},
    {"name": "get_health_check", "method": "GET", "url": f"{BASE_URL}/health/"},
    {"name": "get_user_by_username", "method": "GET", "url": f"{BASE_URL}/users//"},
    {"name": "get_time_spent_by_username", "method": "GET", "url": f"{BASE_URL}/users/test_user/time-spent/"},
    {"name": "activate_2fa", "method": "POST", "url": f"{BASE_URL}/user/2fa/"},
    {"name": "verify_2fa", "method": "POST", "url": f"{BASE_URL}/user/2fa/verify/"},
    {"name": "check_blocked_status", "method": "GET", "url": f"{BASE_URL}/check-blocked-status/", "params": {"userid": ""}},
    {"name": "send_friend_request", "method": "POST", "url": f"{BASE_URL}/send_friend_request/", "body": {"user_to": "2"}},
    {"name": "accept_friend_request", "method": "POST", "url": f"{BASE_URL}/friend_request/accept/1/"},
    {"name": "cancel_friend_request", "method": "POST", "url": f"{BASE_URL}/friend_request/cancel/1/"},
    {"name": "get_friend_ship_request", "method": "GET", "url": f"{BASE_URL}/friend_ship_request/"},
    {"name": "get_user_list", "method": "GET", "url": f"{BASE_URL}/users/"},
    {"name": "get_time_spent_by_username", "method": "GET", "url": f"{BASE_URL}/users/test_user/time-spent/"},
]

# Register and login user
def test_api():
    headers = {}
    access_token = None

    for endpoint in ENDPOINTS:
        print(f"\nTesting {endpoint['name']} endpoint...,\nurl:{endpoint['url']}\nmethod:{endpoint['method']}\nbody:{endpoint.get('body', {})}")
        url = endpoint["url"]
        method = endpoint["method"]
        body = endpoint.get("body", {})
        params = endpoint.get("params", {})

        try:
            if method == "POST":
                response = requests.post(url, json=body, headers=headers, verify=False)
            elif method == "GET":
                response = requests.get(url, params=params, headers=headers, verify=False)
            else:
                print(f"Unsupported method: {method}")
                continue

            log_response(response)

            # Update access token if logging in
            if endpoint["name"] == "login" and response.status_code == 200:
                access_token = response.json().get("access_token")
                if access_token:
                    headers["Authorization"] = f"Bearer {access_token}"
                    print(f"Access token: {access_token}")

        except Exception as e:
            print(f"[Error]: {e}")

if __name__ == "__main__":
    test_api()
