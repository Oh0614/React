import {Button} from "@mui/material";
import {createPortal} from "react-dom";
import ReadTableContainer from "../../CRUD/Read.Table.Container";
import React, {useState} from "react";
import {columnName, columns, tableName} from "./History.Table";
import CreateContainer from "../../CRUD/Create.Container";

function HistoryPresentation({filteredData, handleDataFromTable, handleDelete}) {

    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div style={{marginBottom: "4px", border: "1px", borderBlock: "gray"}}>
                <Button variant="contained" onClick={() => setShowModal(true)} style={{ marginRight: "10px" }}>Create</Button>

                {showModal && createPortal(
                    <CreateContainer columns={columns} tableName={tableName} onClose={() => setShowModal(false)} />,
                    document.body
                )}

            </div>

            <ReadTableContainer tableName={tableName} columns={columns}
                                id={columnName}
                                filteredData={filteredData} // 필터링된 데이터
                                onTableDataFetch={handleDataFromTable}/>
        </div>
    )
}

export default HistoryPresentation;