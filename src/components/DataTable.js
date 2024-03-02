import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

const DataTable = ({ columns, rows, page, pageSizeOptions }) => {

    let defaultPageSizeOptions = [5, 10, 25];
    if (pageSizeOptions) {
        defaultPageSizeOptions = pageSizeOptions;
    }

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            initialState={{
                pagination: {
                    paginationModel: { page: page? page: 0, pageSize: defaultPageSizeOptions[0] },
                },
            }}
            pageSizeOptions={defaultPageSizeOptions}
        />
    )
}

export default DataTable