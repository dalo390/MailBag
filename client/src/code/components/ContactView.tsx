import React from "react";

import Button from "@mui/material/Button";
import { TextField } from "@mui/material";


const ContactView = ({ state }): JSX.Element => (

    <form>

        <TextField margin="dense" id="contactName" label="Name" value={ state.contactName } variant="outlined"
        InputProps={{ style : { color : "#000000" } }} disabled={ state.currentView === "contact" } style={{ width:260 }}
        onChange={ state.fieldChangeHandler } />
        <br />
        <TextField margin="dense" id="contactEmail" label="Email" value={ state.contactEmail } variant="outlined"
        InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "contact" } style={{ width:520 }}
        onChange={ state.fieldChangeHandler } />
        <br />
        <TextField margin="dense" id="contactAddress" label="Address" value={ state.contactAddress } variant="outlined"
        InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "contact" } style={{ width:520, marginRight:10 }}
        onChange={ state.fieldChangeHandler } />
        <TextField margin="dense" id="contactCity" label="City" value={ state.contactCity } variant="outlined"
        InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "contact" } style={{ width:260, marginRight:10 }}
        onChange={ state.fieldChangeHandler } />
        <TextField margin="dense" id="contactState" label="State" value={ state.contactState } variant="outlined"
        InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "contact" } style={{ width:260, marginRight:10 }}
        onChange={ state.fieldChangeHandler } />
        <br />
        <TextField margin="dense" id="contactNotes" label="Contact Notes" value={ state.contactNotes } variant="outlined"
        InputProps={{ style : { color:"#000000" } }} disabled={ state.currentView === "contact" } style={{ width:1040 }}
        onChange={ state.fieldChangeHandler } />
        <br />

        { state.currentView === "contactAdd" &&
        <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
            onClick={ state.saveContact }>
            Save
        </Button>
        }
        { state.currentView === "contact" &&
        <Button variant="contained" color="primary" size="small" style={{ marginTop:10, marginRight:10 }}
            onClick={ state.deleteContact }>
            Delete
        </Button>
        }
        { state.currentView === "contact" &&
        <Button variant="contained" color="primary" size="small" style={{ marginTop:10 }}
        onClick={ () => state.showComposeMessage("contact") }>Send Email</Button>
        }

    </form>

); 


export default ContactView;
