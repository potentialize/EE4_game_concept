// add new row in front of old rows, remove an equal amount of elem from the end
export default (newRow, oldRows) => newRow.concat(oldRows).slice(0, oldRows.length)
