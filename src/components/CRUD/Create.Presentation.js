import ActiveCreate from "../Utils/ActiveCreate";
import {Button} from "@mui/material";
import React from "react";
import './CreateObject.css';

function CreatePresentation({columns, setChangeValue, handleOnClick, onClose}) {
    return (
        <div className={"overlay"}>
            <div className={"modal"}>
                {/** Component 구성 요소
                 *   title(columns.headerName + component(type 별로 구분하여 생성) 로 구성
                 *   component 는 textbox/dropdown/checkbox 로 구성될 수 있음
                 *   handleOnChange 에서는 값을 api 에 넘기기 위해 각 다른 status 로 관리 되어야 함
                 *   insert api 를 호출 할 때는 props 에 전달 된 테이블에 insert 되어야 함
                 */}
                <ActiveCreate columns={columns} rowValues={columns} onChange={ (value)=> setChangeValue(value) }/>

                <Button variant="contained"
                        onClick={handleOnClick}
                        style={{marginRight: "4px"}}>Create</Button>
                <Button variant="outlined" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
}

export default CreatePresentation;