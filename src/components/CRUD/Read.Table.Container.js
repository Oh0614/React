import React, {useEffect, useState} from 'react';
import Get from "../../apis/services/Read";
import ReadTablePresentation from "./Read.Table.Presentation";

/**
 * 역할 명시
 * nodejs 를 사용하여, 서버 5000에 연결 후, 해당 테이블 네임에 일치하는 쿼리를 호출한다
 * 해당 쿼리의 응답 결과를 row로 나누어 datagrid table로 그려준다
 *
 * API 호출하는 컴포넌트와, TABLE 그리는 컴포넌트를 쪼개야 할 것 같다
 */

function ReadTableContainer ({tableName, columns, id, filteredData, onTableDataFetch}) {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const [row, setRow] = useState([]);

    const fetchData = async () => {
        await Get(tableName, (data) => {
            onTableDataFetch(data);
            setLoading(false);
        });
    };

    const handleDoubleClick = (item) => {
        setShowModal(true);

        setRow(item);
        setRow((prevRow)=> ({
            ...prevRow,
            id : id
        }));
    }

    const handleOnClose = () => {
        setShowModal(false)
        setShowDialog(false);

        fetchData();
    }

    const ReadTableProps = {
        loading: loading,
        filteredData: filteredData,
        showModal: showModal,
        setShowModal: setShowModal,
        showDialog: showDialog,
        setShowDialog: setShowDialog,
        columns: columns,
        id: id,
        handleDoubleClick: handleDoubleClick,
        row: row,
        tableName: tableName,
        handleOnClose: handleOnClose
    }

    useEffect(() => {
        fetchData();
    }, [tableName]); // tableName이 변경될 때마다 데이터 다시 가져오기


    return <ReadTablePresentation ReadTableProps={ReadTableProps}/>;

}

export default ReadTableContainer;
