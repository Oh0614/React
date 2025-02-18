import React, {useEffect, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

/* TextField 를 정의하고, clear 와 change 메소드를 정의 */
const TextBoxComponent = ({ value, onChange }) => {
    const [searchText, setSearchText] = useState(value || "");

    // 텍스트박스 초기화
    const handleClear = () => {
        setSearchText("");
        onChange("");
    };

    const textBoxChange = (value) => {
        setSearchText(value || "");
        onChange(value || "");
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <TextField
                value={searchText}
                onChange={(e) => textBoxChange(e.target.value)}
                placeholder="Enter search text"
                variant="outlined"
                size="small"
                style={{ marginRight: "10px", flex: "1" }}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleClear}>
                            <ClearIcon />
                        </IconButton>
                    ),
                }}
            />

        </div>
    );
};

export default TextBoxComponent;
