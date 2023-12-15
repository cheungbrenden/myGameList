/* eslint-disable react/prop-types */
const TableHeader = ({headingId, text, handleSortOrderChange, sortOrder}) => {


    const determineDirectionArrow = () => {
        if (sortOrder[0] == headingId) {
            return sortOrder[1] == 'decreasing' ? "▼" : "▲"
        }
        return ""
    }

    const directionArrow = determineDirectionArrow()

    return (
        <th onClick={() => handleSortOrderChange(headingId)}>{text} {directionArrow}</th>
    )
}

export default TableHeader