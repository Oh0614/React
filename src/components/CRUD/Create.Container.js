import {useState} from "react";
import Create from "../../apis/services/Create";
import CreatePresentation from "./Create.Presentation";

function CreateContainer({columns, tableName, onClose}) {
    const [changeValue, setChangeValue] = useState({});

    const handleOnClick = async () => {

        await Create(tableName, changeValue, (returnCode) => {
            try{
                if (returnCode === 200) {
                    alert('성공적으로 저장되었습니다');
                    onClose();
                }
            }catch (e) {

            }

        });
    };

    return <CreatePresentation columns={columns} setChangeValue={setChangeValue} handleOnClick={handleOnClick}
                               onClose={onClose} />
}

export default CreateContainer;