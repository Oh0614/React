import {useState} from "react";
import HistoryPresentation from "./History.Presentation";

function HistoryContainer (){
    const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터

    const handleDataFromTable = (data) => {

        const formattedData = data.map(item => ({
            ...item,
            CHANGEDATE: new Date(item.CHANGEDATE),
        }));

        setFilteredData(formattedData);

    };

    return <HistoryPresentation filteredData={filteredData} handleDataFromTable={handleDataFromTable}/>;

}
export default HistoryContainer;