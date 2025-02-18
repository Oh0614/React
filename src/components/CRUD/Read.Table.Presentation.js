import Box from "@mui/material/Box";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {createPortal} from "react-dom";
import UpdateContainer from "../CRUD/Update.Container";
import React, {useState} from "react";
import {Button} from "@mui/material";
import DeleteContainer from "./Delete.Container";

function ReadTablePresentation({ReadTableProps}) {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    return (
        <div>
            <Button variant="outlined" onClick={() => ReadTableProps.setShowDialog(true)} style={{marginBottom: '4px'}}>Delete</Button>

            <Box style={{height: 800, width: '100%'}}>
                {ReadTableProps.loading ? (
                    <p>Loading...</p>
                ) : (
                    <DataGrid
                        rows={ReadTableProps.filteredData}
                        columns={ReadTableProps.columns}
                        getRowId={(row) => row[ReadTableProps.id]} // 고유 ID를 동적으로 선택
                        pageSize={5}
                        onRowDoubleClick={(item) => ReadTableProps.handleDoubleClick(item)}
                        onRowSelectionModelChange={(item) => {
                            setRowSelectionModel(item);
                        }}
                        checkboxSelection
                        disableRowSelectionOnClick
                        slots={{toolbar: GridToolbar}}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                            },
                        }}
                    />
                )}

                {ReadTableProps.showModal && createPortal(
                    <UpdateContainer columns={ReadTableProps.columns} rowValues={ReadTableProps.row} tableName={ReadTableProps.tableName} onClose={ReadTableProps.handleOnClose} />,
                    document.body
                )}

                {ReadTableProps.showDialog && (
                    <DeleteContainer showDialog={ReadTableProps.showDialog} setShowDialog={ReadTableProps.setShowDialog} tableName={ReadTableProps.tableName} rowSelectionModel={rowSelectionModel}
                                     onClose={ReadTableProps.handleOnClose}/>
                )}
            </Box>
        </div>
    );
}

export default ReadTablePresentation;