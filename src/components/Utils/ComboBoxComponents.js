import react, {useEffect, useState} from "react";
import {Autocomplete, Button, TextField} from "@mui/material";
import React from "react";

const ComboBoxComponents = ({options, onChange}) => {
    const [searchItem, setSearchItem] = useState("");

    const handleClear = () => {
        setSearchItem("");
        onChange("");
    }

    const comboBoxChange = (event, newValue) => {
        setSearchItem(newValue || "")
        onChange(newValue.value || "");
    }

    return (
        <div style={{display: "flex", alignItems: "center", marginBottom: "20px"}}>
            <Autocomplete
                options={options} // 콤보박스에서 선택할 옵션
                value={searchItem} // 선택된 값
                onChange={(event, newValue) => (comboBoxChange(event, newValue? newValue: ""))} // 값 변경
                renderInput={(params) => (
                    <TextField {...params} label="Select an item" variant="outlined" size="small" />
                )}
                style={{ width: "300px", marginRight: "10px" }}
            />
            <Button variant="outlined" onClick={handleClear}>
                Clear
            </Button>
        </div>

    )
};

export default ComboBoxComponents;