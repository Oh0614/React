import ComboBoxComponents from "../../Utils/ComboBoxComponents";
import TextBoxComponent from "../../Utils/TextboxComponents";
import DatePickerComponents from "../../Utils/DatePickerComponents";
import CheckButtonComponents from "../../Utils/CheckButtonComponents";
import {Box, Button} from "@mui/material";
import {createPortal} from "react-dom";
import {columnName, columns, tableName} from "./CalAuth.Table";
import ReadTableContainer from "../../CRUD/Read.Table.Container";
import React, {useState} from "react";
import CreateContainer from "../../CRUD/Create.Container";

function CalAuthPresentation ({options, handleOnChange, handleSearch, filteredData, handleDataFromTable}) {

    /**
     * 모달창을 열고 닫는 상탭관리
     * */
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <h1>Dashboard</h1>
            </Box>

            <div style={{marginBottom: "4px", border: "1px", borderBlock: "gray"}}>

                <ComboBoxComponents options={options} onChange={(value) => handleOnChange(value)} />
                <TextBoxComponent onChange={(value) => handleOnChange(value)} />
                <TextBoxComponent onChange={(value) => handleOnChange(value)} />
                <DatePickerComponents onChange={(value) => handleOnChange(value)}/>
                <CheckButtonComponents onChange={(value) => handleOnChange(value)} />
                <Button variant="contained" onClick={handleSearch} style={{ marginRight: "10px" }}>
                    Search
                </Button>
                <Button variant="outlined" onClick={() => setShowModal(true)}>Create</Button>
                {showModal && createPortal(
                    <CreateContainer columns={columns} tableName={tableName} onClose={() => setShowModal(false)} />,
                    document.body
                )}
            </div>

            <ReadTableContainer tableName={tableName} columns={columns}
                            id={columnName}
                            filteredData={filteredData} // 필터링된 데이터
                            onTableDataFetch={handleDataFromTable} />
        </div>
    );
}

export default CalAuthPresentation;