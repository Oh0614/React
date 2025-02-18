import dayjs from "dayjs";

export default function search (option, originalData, filteredData) {
    /**
     * 현재 로직 : row -> value item을 각각 type에 따라 조회함 (매우 비효율적이다)
     *
     * 바뀔 수 있는 방향 : search option 에 따라 column의 데이터를 listup 하고 조회하는 방법 으로 바꾸면 어떨까 ..
     *  column의 각 데이터를 listup 하고 , searchOptionValue 를 like 조건으로 찾는 ?
     *
     *
     * */
    // grid search
    if (option === "") {
        return originalData;
    } else {

        return filteredData.filter((row) =>

            Object.values(row).some((value) => {

                if (value == null) return false;

                if (value instanceof Date) {
                    return dayjs(value).format('YYYY. MM. DD').toLowerCase().includes(option);
                }

                if (typeof value === 'boolean') {
                    return value.toString().toLowerCase() === option.toString().toLowerCase();
                }

                if (typeof value === 'string') {
                    return value.toString().toLowerCase().includes(option);
                }

                return false;

            })
        );
    }
}
