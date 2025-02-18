import {useEffect, useState} from "react";
import Update from "../../apis/services/Update";
import UpdatePresentation from "./Update.Presentation";

function UpdateContainer({columns, rowValues, tableName, onClose}) {
    const [changeValue, setChangeValue] = useState({});

    useEffect(() => {
        setChangeValue((prevRow)=>({
            ...prevRow,
            [rowValues.id] : rowValues.row[rowValues.id],
            key : rowValues.id
        }));
    }, []);

    const handleOnClick = async () => {

        await Update(tableName, changeValue, (returnCode) => {
            try{
                if (returnCode === 200) {
                    alert('성공적으로 저장되었습니다');
                    onClose();
                }
            }catch (e) {

            }
        });
    };

    return <UpdatePresentation columns={columns} rowValues={rowValues} setChangeValue={setChangeValue}
                               handleOnClick={handleOnClick} onClose={onClose} />;
}

export default UpdateContainer;