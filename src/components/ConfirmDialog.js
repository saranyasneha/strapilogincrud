import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Button } from "react-bootstrap";

const useStyles=makeStyles(theme=>({
    dialog:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(1)
    },
    dialogContent:{
        textAlign:'center',
        marginTop:-20
     },
    dialogAction:{
justifyContent:'center'
    }
}))
export default function ConfirmDialog(props){
   const {confirmDialog, setConfirmDialog}=props;
   const classes=useStyles();
    return (
       <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
        <DialogTitle>

        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
           <Typography variant="h6">
            {confirmDialog.title}
           </Typography>
           <Typography variant="subtitle2">
            {confirmDialog.subTitle}
           </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
            <Button className="btn btn-default px-4 m-2" onClick={()=>setConfirmDialog({...confirmDialog, isOpen:false})}>No</Button>
            <Button className="btn btn-danger px-4 m-2 " onClick={confirmDialog.onConfirm}>Yes</Button>
        </DialogActions>
       </Dialog>
    )
}