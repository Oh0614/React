import DeletePresentation from "./Delete.Presentation";
import Delete from "../../apis/services/Delete";

function DeleteContainer({showDialog, tableName, setShowDialog, rowSelectionModel, onClose}) {

    console.log(rowSelectionModel);

    const handleClose = () => {
        setShowDialog(false);
    };

    const handleDelete = async() => {

        if(!rowSelectionModel.length){
            alert('삭제할 요소를 선택해주세요.');
            setShowDialog(false);
        }

        await Delete(tableName, rowSelectionModel, (returnCode) => {
            try{
                if (returnCode === 200) {
                    alert('성공적으로 저장되었습니다');
                    onClose();
                }
            }catch (e) {

            }
        })
    }

    return <DeletePresentation showDialog={showDialog} handleClose={handleClose} handleDelete={handleDelete}/>;
}

export default DeleteContainer;