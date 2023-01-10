"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const List_1 = __importDefault(require("@mui/material/List"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemAvatar_1 = __importDefault(require("@mui/material/ListItemAvatar"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const Person_1 = __importDefault(require("@mui/icons-material/Person"));
const material_1 = require("@mui/material");
const ContactList = ({ state }) => (react_1.default.createElement(List_1.default, null, state.contacts.map(value => {
    return (react_1.default.createElement(ListItem_1.default, null,
        react_1.default.createElement(material_1.ListItemButton, { key: value, onClick: () => state.showContact(value._id, value.name, value.email) },
            react_1.default.createElement(ListItemAvatar_1.default, null,
                react_1.default.createElement(Avatar_1.default, null,
                    react_1.default.createElement(Person_1.default, null))),
            react_1.default.createElement(ListItemText_1.default, { primary: `${value.name}` }))));
})));
exports.default = ContactList;
//# sourceMappingURL=ContactList.js.map