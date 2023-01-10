"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("normalize.css");
require("../css/main.css");
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const BaseLayout_1 = __importDefault(require("./components/BaseLayout"));
const IMAP = __importStar(require("./IMAP"));
const Contacts = __importStar(require("./Contacts"));
const state_1 = require("./state");
const baseComponent = (0, client_1.createRoot)(document.getElementById("mainContainer"));
baseComponent.render(react_1.default.createElement(BaseLayout_1.default, null));
const intervalFunction = function () {
    if ((0, state_1.getState)() === null) {
        setTimeout(intervalFunction, 100);
    }
    else {
        startupFunction();
    }
};
intervalFunction();
const startupFunction = function () {
    (0, state_1.getState)().showHidePleaseWait(true);
    function getMailboxes() {
        return __awaiter(this, void 0, void 0, function* () {
            const imapWorker = new IMAP.Worker();
            const mailboxes = yield imapWorker.listMailboxes();
            mailboxes.forEach((inMailbox) => {
                (0, state_1.getState)().addMailboxToList(inMailbox);
            });
        });
    }
    getMailboxes().then(function () {
        function getContacts() {
            return __awaiter(this, void 0, void 0, function* () {
                const contactsWorker = new Contacts.Worker();
                const contacts = yield contactsWorker.listContacts();
                contacts.forEach((inContact) => {
                    (0, state_1.getState)().addContactToList(inContact);
                });
            });
        }
        getContacts().then(() => (0, state_1.getState)().showHidePleaseWait(false));
    });
};
//# sourceMappingURL=main.js.map