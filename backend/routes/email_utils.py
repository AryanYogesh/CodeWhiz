import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from decouple import config

EMAIL_ADDRESS = config("EMAIL_ADDRESS")
EMAIL_PASSWORD = config("EMAIL_PASSWORD")


def send_email(to_email: str, subject: str, body: str):
    """Send an email using Gmail SMTP"""
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject  
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
        
        return {"message": "Email sent successfully"}
    
    except smtplib.SMTPAuthenticationError:
        return {"error": "Authentication failed. Check your email/password or App Password settings."}

    except smtplib.SMTPConnectError:
        return {"error": "Failed to connect to SMTP server. Check your internet connection."}

    except Exception as e:
        return {"error": f"Failed to send email: {str(e)}"}
