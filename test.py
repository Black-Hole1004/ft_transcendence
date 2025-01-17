# import requests
# def send_simple_message(email, otp):
#   	return requests.post(
#   		"https://api.mailgun.net/v3/starserve.me/messages",
#   		auth=("api", "efed5d6cf984ef404c3f373718c9ace0-191fb7b6-a0d6b9f6"),
#   		data={"from": "Excited User <StarServeTeam@starserve.me>",
#   			"to": [f"{email}", "YOU@starserve.me"],
#   			"subject": "Hello",
#   			"text": "this is your otp:  " + otp})

# import smtplib
# import ssl
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText


# email = "blackhoole1@proton.me"
# otp = "123456"
# # print(send_simple_message(email, otp).text)

# # Gmail credentials
# receiver_email = "blackhoole1@proton.me"  # Receiver's email address
# sender_email = "tabi3aa22@gmail.com"  # Your Gmail address
# password = "hssain.132@ait"  # Use your Gmail app password (if you have 2FA enabled)

# # Email subject and body
# subject = "You otp"
# body = "Your OTP is: " + otp

# # Create a MIME object to structure the email
# msg = MIMEMultipart()
# msg["From"] = sender_email
# msg["To"] = receiver_email
# msg["Subject"] = subject

# # Add body to the email
# msg.attach(MIMEText(body, "plain"))

# # Set up the secure SSL context
# # msg.attach(MIMEText(body, "plain"))

# # Send email via Gmail's SMTP server using STARTTLS
# try:
#     with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
#         # Start the TLS encryption
#         server.starttls()  # Upgrades the connection to a secure encrypted SSL/TLS connection
#         server.login(sender_email, password)  # Log in to the server
#         server.sendmail(sender_email, receiver_email, msg.as_string())  # Send the email
#         print("Email sent successfully!")
# except Exception as e:
#     print(f"Error occurred: {e}")
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from email.mime.text import MIMEText
import base64
import pickle
from google.auth.transport.requests import Request


# If modifying these SCOPES, delete the token.json file.
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

def gmail_authenticate():
    creds = None

    # Check if token.pickle exists (saved credentials)
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    # If no valid credentials, perform the OAuth flow
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())  # Refresh expired token
        else:
            flow = InstalledAppFlow.from_client_secrets_file('client_secret.json', SCOPES)
            creds = flow.run_local_server(port=10000, access_type='offline', prompt='consent')

        # Save the new credentials for next time
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    # Build the Gmail service
    return build('gmail', 'v1', credentials=creds)

def send_email(service, recipient, subject, body):
    message = MIMEText(body)
    message['to'] = recipient
    message['subject'] = subject
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    message = {'raw': raw_message}
    service.users().messages().send(userId='me', body=message).execute()
    print("Email sent successfully!")

# Authenticate and send
service = gmail_authenticate()
send_email(service, 'use1337ai@gmail.com', 'StarServe 2fa Verification', 'StarServe OTP: 123456')

