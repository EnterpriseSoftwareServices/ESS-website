# -*- coding: UTF-8 -*-import sys
import sys
reload(sys)
sys.setdefaultencoding('utf8')

import settings
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email.Utils import COMMASPACE, formatdate
from email import Encoders
import re
import datetime
import threading

# Simply establishes a connectoin to the mailserver and
# based on input args will send the email.
# Should not do any constructing or formatting.
def sendMail(fro, subject, body, name):
  sets = settings.EMAIL
  username = sets["email"]#.split("@")[0]
  email_pwd = sets["password"]
  smtpserver = smtplib.SMTP("smtp.gmail.com",587)
  to = sets["to"]


  msg = MIMEMultipart('alternative')

  msg['From'] = fro
  msg['To'] = to
  msg['Subject'] = subject
  print msg.as_string()

  body = """
Email from: %s
Name: %s


Body: %s""" % (fro, name, body)

  msg.attach( MIMEText(body, "text", "utf-8"))

  smtpserver.ehlo()
  smtpserver.starttls()
  smtpserver.login(username, email_pwd)    
  smtpserver.sendmail(fro, to, msg.as_string() )
  smtpserver.close()