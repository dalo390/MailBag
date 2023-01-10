import React from "react";

import * as Contacts from "./Contacts";
import { config } from "./config";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";


let stateSingleton: any = null;


export function createState(inParentComponent: React.Component): any {

    if (stateSingleton === null) {

        stateSingleton = {

        pleaseWaitVisible : false,
        contacts : [ ],
        mailboxes : [ ],
        messages : [ ],
        currentView : "welcome",
        currentMailbox : null,

        messageID : null,
        messageDate : null,
        messageFrom : null,
        messageTo : null,
        messageSubject : null,
        messageBody : null,

        contactID : null,
        contactName : null,
        contactEmail : null,
        contactAddress: null,
        contactCity: null,
        contactState: null,
        contactNotes : null,


        showHidePleaseWait : function(inVisible: boolean): void {

            this.setState(() => ({ pleaseWaitVisible : inVisible }));

        }.bind(inParentComponent), 


        
        showContact : function(inID: string, inName: string, inEmail: string, inAddress: string, inCity:string, inState: string, inNotes: string): void {

            this.setState(() => ({
            currentView : "contact", contactID : inID, contactName : inName, contactEmail : inEmail, contactAddress : inAddress, contactCity : inCity, contactState: inState, contactNotes : inNotes
            }));

        }.bind(inParentComponent), 


        showAddContact : function(): void {


            this.setState(() => ({
            currentView : "contactAdd", contactID : null, contactName : "", contactEmail : "", contactAddress: "", contactCity : "", contactState : "", contactNotes: ""
            }));

        }.bind(inParentComponent), 


        showMessage : async function(inMessage: IMAP.IMessage): Promise<void> {

            this.state.showHidePleaseWait(true);
            const imapWorker: IMAP.Worker = new IMAP.Worker();
            const mb: String = await imapWorker.getMessageBody(inMessage.id, this.state.currentMailbox);
            this.state.showHidePleaseWait(false);

            this.setState(() => ({
            currentView : "message", messageID : inMessage.id, messageDate : inMessage.date, messageFrom : inMessage.from,
            messageTo : "", messageSubject : inMessage.subject, messageBody : mb
            }));

        }.bind(inParentComponent), 


        showComposeMessage : function(inType: string): void {

            switch (inType) {
            case "new":
                this.setState(() => ({
                currentView : "compose", messageTo : "", messageSubject : "", messageBody : "",
                messageFrom : config.userEmail
                }));
            break;
            case "reply":
                this.setState(() => ({
                currentView : "compose", messageTo : this.state.messageFrom,
                messageSubject : `Re: ${this.state.messageSubject}`,
                }));
            break;
            case "contact":
                this.setState(() => ({
                currentView : "compose", messageTo : this.state.contactEmail, messageSubject : "", messageBody : "",
                messageFrom : config.userEmail
                }));
            break;

            }

        }.bind(inParentComponent),


        addMailboxToList : function(inMailbox: IMAP.IMailbox): void {

            this.setState(prevState => ({ mailboxes : [ ...prevState.mailboxes, inMailbox ] }));

        }.bind(inParentComponent), 


        addContactToList : function(inContact: Contacts.IContact): void {

            this.setState(prevState => ({ contacts : [ ...prevState.contacts, inContact ] }));

        }.bind(inParentComponent), 


        
        addMessageToList : function(inMessage: IMAP.IMessage): void {

            this.setState(prevState => ({ messages : [ ...prevState.messages, inMessage ] }));

        }.bind(inParentComponent), 


        clearMessages : function(): void {

            this.setState(() => ({ messages : [ ] }));

        }.bind(inParentComponent), 


        setCurrentMailbox : function(inPath: String): void {

            this.setState(() => ({ currentView : "welcome", currentMailbox : inPath }));

            this.state.getMessages(inPath);

        }.bind(inParentComponent), 


        getMessages : async function(inPath: string): Promise<void> {

            this.state.showHidePleaseWait(true);
            const imapWorker: IMAP.Worker = new IMAP.Worker();
            const messages: IMAP.IMessage[] = await imapWorker.listMessages(inPath);
            this.state.showHidePleaseWait(false);

            this.state.clearMessages();
            messages.forEach((inMessage: IMAP.IMessage) => {
            this.state.addMessageToList(inMessage);
            });

        }.bind(inParentComponent), 


        fieldChangeHandler : function(inEvent: any): void {

            if (inEvent.target.id === "contactName" && inEvent.target.value.length > 16) { return; }

            this.setState(() => ({ [inEvent.target.id] : inEvent.target.value }));

        }.bind(inParentComponent), 


        saveContact : async function(): Promise<void> {

            const cl = this.state.contacts.slice(0);

            this.state.showHidePleaseWait(true);
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            const contact: Contacts.IContact =
            await contactsWorker.addContact({ name : this.state.contactName, email : this.state.contactEmail , address : this.state.contactAddress, city : this.state.contactState, contactState : this.state.contactState, contactNotes : this.state.contactNotes});
            this.state.showHidePleaseWait(false);

            cl.push(contact);

            this.setState(() => ({ contacts : cl, contactID : null, contactName : "", contactEmail : "", contactAddress : "", contactCity : "", contactState: "", contactNotes : "" }));

        }.bind(inParentComponent), 


        deleteContact : async function(): Promise<void> {

            this.state.showHidePleaseWait(true);
            const contactsWorker: Contacts.Worker = new Contacts.Worker();
            await contactsWorker.deleteContact(this.state.contactID);
            this.state.showHidePleaseWait(false);

            const cl = this.state.contacts.filter((inElement) => inElement._id != this.state.contactID);

            this.setState(() => ({ contacts : cl, contactID : null, contactName : "", contactEmail : "" , contactAddress : "", contactCity : "", contactState: "", contactNotes : ""}));

        }.bind(inParentComponent), 


        deleteMessage : async function(): Promise<void> {

            this.state.showHidePleaseWait(true);
            const imapWorker: IMAP.Worker = new IMAP.Worker();
            await imapWorker.deleteMessage(this.state.messageID, this.state.currentMailbox);
            this.state.showHidePleaseWait(false);

            const cl = this.state.messages.filter((inElement) => inElement.id != this.state.messageID);

            this.setState(() => ({ messages : cl, currentView : "welcome" }));

        }.bind(inParentComponent), 


        sendMessage : async function(): Promise<void> {

            this.state.showHidePleaseWait(true);
            const smtpWorker: SMTP.Worker = new SMTP.Worker();
            await smtpWorker.sendMessage(this.state.messageTo, this.state.messageFrom, this.state.messageSubject,
            this.state.messageBody
            );
            this.state.showHidePleaseWait(false);

            this.setState(() => ({ currentView : "welcome" }));

        }.bind(inParentComponent)

        };

    }

    return stateSingleton;

}


export function getState(): any {
    return stateSingleton;
} 
