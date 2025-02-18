import react, {useEffect, useState} from "react";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import {Button} from "@mui/material";
import React from "react";

const DatePickerComponents = ({value, onChange}) => {
    //화면에 보이는 값과 실제 조회 데이터가 다르기 때문에 두개로 구성하엿다
    const [datePicker, setDatePicker] = useState(value);  //데이터 피커 실제 데이터 state
    const [dateValue, setDateValue] = useState(value);    //화면에 보이는 text 데이터 state


    const handleClear = () => {
        setDatePicker('');
        setDateValue(dayjs());
    }

    const datePickerChange = (value) => {
        const dateValue = dayjs(value).format('YYYY. MM. DD');
        setDatePicker(dateValue);
    }

    useEffect(() => {
        onChange(datePicker);
    }, [datePicker]);

    // useEffect(() => {
    //     setDatePicker(value);
    //     setDateValue(value);
    // }, [value]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{display: "flex", marginBottom: "20px"}}>
                    <DatePicker
                        value={dateValue}
                        format={'YYYY. MM. DD'}
                        label={'input changeDate'}
                        onChange={datePickerChange}
                        sx={{ width: "300px", marginRight: "10px"}}
                        defaultValue={datePicker}
                    />
                    <Button variant="outlined" onClick={handleClear}>
                        Clear
                    </Button>
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default DatePickerComponents;