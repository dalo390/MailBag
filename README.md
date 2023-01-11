# MailBag

This is an email application designed to allow users to send, receive, and manipulate their emails. Users have the option to save and delete contacts, as well as add notes about each contact.

## Setup

Clone this project

```
git clone https://github.com/dalo390/MailBag.git
```

### Frontend

Go to project directory. Then go to the client folder. Run the command:

```
npm run build
```

### Running the server

Go to project directory. Then go to the server folder. 

Open the serverInfo.json file. Replace the appropriate information in order for the web app to connect to your email. (Outlook emails work the easiest https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040)
Save the changes.

Run the command:

```
npm install
```

and then run:

```
npm run dev
```

Open `http://127.0.0.1/` and you're all set with MailBag!
