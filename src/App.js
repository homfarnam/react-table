import React, {useEffect, useState, useMemo} from 'react'
import {useTable} from 'react-table'
import axios from 'axios'



function App() {

    const [posts, setPosts] = useState([])

    const fetchData = useEffect(() => {
        const url = 'https://api.fsn365.com/txn'
        axios.get(url)
        .then(res => {
            setPosts(res.data.data.data)
        })
        // .then(console.log(posts))
        .catch(err => {
            console.log(err)
        })

    

    })
    setInterval(fetchData, 6000)
    
    

    

    const columns = useMemo(() => [
        {
            Header: 'Tx Hash',
            accessor: 'hash', // accessor is the "key" in the data
        }, {
            Header: 'Block',
            accessor: 'bk'
        }, {
            Header: 'from',
            accessor: 'from'
        }, 
        {
            Header: 'Time Stamp',
            accessor: 'timestamp',
            Cell: ({cell:{value}})=>{
                console.log(value);
                const date = new Intl.DateTimeFormat('en-US').format(value*1000);
                return <span>{date}</span>
            }
        },
        {
            Header: 'to',
            accessor: 'to'
        }
    ], [])

   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({columns, data:posts})

    if (posts.length === 0) {
        return null;
     } 

    return (
      
        <div>
         
         
        
            <table {...getTableProps()}
                style={
                    {border: 'solid 1px blue'}
            }>
                <thead> {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}
                                    style={
                                        {
                                            borderBottom: 'solid 3px red',
                                            background: 'aliceblue',
                                            color: 'black',
                                            fontWeight: 'bold'
                                        }
                                }>
                                    {
                                    column.render('Header')
                                } </th>
                            ))
                        } </tr>
                    ))
                } </thead>
                <tbody {...getTableBodyProps()}>
                    {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}
                                            style={
                                                {
                                                    padding: '10px',
                                                    border: 'solid 1px gray',
                                                    background: 'papayawhip'
                                                }
                                        }>
                                            {
                                            cell.render('Cell')
                                        } </td>
                                    )
                                })
                            } </tr>
                        )
                    })
                } </tbody>
            </table>
           
        </div>


    )
}

export default App
