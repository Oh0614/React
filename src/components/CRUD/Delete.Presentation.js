import {Fragment} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

function DeletePresentation({showDialog, handleClose, handleDelete}) {
    return (
        <Fragment>
            <Dialog
                open={showDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"정말로 삭제하겠습니까?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        삭제하면 되돌릴수 없습니다
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={handleDelete} autoFocus>
                        수락
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeletePresentation;