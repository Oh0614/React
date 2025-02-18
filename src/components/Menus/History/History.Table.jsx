import {Checkbox} from "@mui/material";
import React from "react";

const tableName = 'CalAuth/demo';
const columnName = 'CAL_INFO_ID';
const columns = [
    { field: 'CAL_INFO_ID', headerName: 'CAL_INFO_ID', width: 150, type: 'string'},
    { field: 'SOURCE', headerName: 'SOURCE', width: 150, type: 'string'},
    { field: 'PN', headerName: 'PN', width: 150, type: 'string'},
    { field: 'WUC', headerName: 'WUC', width: 150, type: 'string'},
    { field: 'CAL_INT', headerName: 'CAL_INT', width: 150, type: 'string'},
    { field: 'CHANGECODE', headerName: 'CHANGECODE', width: 150, type: 'string'},
    { field: 'CHANGEDATE', headerName: 'CHANGEDATE', width: 150, type: 'date'},
    { field: 'SICL_ID', headerName: 'SICL_ID', width: 150, type: 'string'},
    { field: 'REMARKS', headerName: 'REMARKS', width: 150, type: 'string'},
    { field: 'NOUN', headerName: 'NOUN', width: 150, type: 'string'},
    { field: 'CAGE', headerName: 'CAGE', width: 150, type: 'string'},
    { field: 'IsSICL', headerName: 'IsSICL', width: 150, type: 'boolean', renderCell: (params) => (
            <Checkbox
                checked={params.row.IsSICL}
                disabled
            />
        ),
    },
];

export {tableName, columnName, columns};