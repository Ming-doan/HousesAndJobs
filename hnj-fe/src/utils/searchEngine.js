const targetField = 'title'

export default function seach(searchArray, searchValue) {
    return searchArray.filter((item) => {
        return item[targetField]
            .toLowerCase()
            .includes(searchValue.toLowerCase())
    })
}
