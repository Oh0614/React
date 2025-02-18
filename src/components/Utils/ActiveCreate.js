import React, {useEffect, useState} from 'react';
import TextBoxComponent from './TextboxComponents';
import DatePickerComponent from './DatePickerComponents';
import CheckButtonComponents from "./CheckButtonComponents";
import dayjs from "dayjs";

const ActiveCreate = ({ columns, rowValues, onChange }) => {
    const [row, setRow] = useState([]); //입력된 값을 관리하는 상태 (부모 컴포넌트에 넘겨지는값)

    /**
     필드에 값이 추가되면 상태에 데이터가 추가된다
     추가된 key, value 값을 validate 한다 ( 입력되지 않은 value check )

     insert api 호출해준다
     return 값에 따라 , state 로 부모 component 에 전달한다
     부모 컴포넌트에서는 성공 or 실패 alert 표시해주고 portal 닫아준다

    */
    const handleChange = (field, value) => {

        setRow((prevRow) => ({
            ...prevRow,
            [field]: value,
        }));

    };

    useEffect(() => {
        onChange(row);  /*부모 component CreateObject 에 값을 넘긴다*/
    }, [row]);

    return (
        <div>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px', overflowY: 'scroll'}}>
                {columns.map((column) => {
                    const {field, headerName, type} = column;


                    // 동적 컴포넌트 생성
                    return (
                        <div
                            key={field}
                            style={{
                                flex: '1 1 calc(50% - 16px)', // 한 줄에 두 개 배치
                                minWidth: '300px', // 최소 너비 설정
                            }}
                        >

                            <label style={{display: 'block', marginBottom: '4px'}}>
                                {headerName}
                            </label>
                            {type === 'string' && (
                                <TextBoxComponent
                                    value={rowValues[field] || ""}
                                    onChange={(value) => handleChange(field, value)}
                                />
                            )}
                            {type === 'date' && (
                                <DatePickerComponent
                                    value={dayjs(rowValues[field]) || dayjs()}
                                    onChange={(value) => handleChange(field, value)}
                                />
                            )}
                            {type === 'boolean' && (
                                <CheckButtonComponents
                                    value={rowValues[field] || false}
                                    onChange={(value) => handleChange(field, value)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};
export default ActiveCreate;
