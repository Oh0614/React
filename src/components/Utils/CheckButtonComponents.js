import React, {useEffect, useState} from "react";
import {Checkbox} from "@mui/material";

const CheckButtonComponents = ({value, onChange}) => {

    const [checkButton, setCheckButton] = useState(value);

    const handleChange = (event) => {

        const isChecked = event.target.checked;

        setCheckButton(isChecked);
        onChange(isChecked);

    };

    return (
        <div style={{display: "flex", alignItems: "center", marginBottom: "20px"}}>
            <Checkbox
                checked={checkButton}
                onChange={handleChange}
            />
        </div>

    );
};

export default CheckButtonComponents;