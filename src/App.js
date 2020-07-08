import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import { SelectColumnFilter,DefaultColumnFilter } from './filters';
import axios from 'axios'
import UTCTime from "./components/UTCTime/index";


const App = () => {
  const [data, setData] = useState([]);

  const [total,setTotal] = useState(0)
  

  const fetchData = useEffect(() => {
    const url = 'https://api.fsn365.com/txn'

    const params =  {
      // page: total*10,
      // order: 'asc', // 'asc'
      // size: total,

      page: 100,
      size: 1000
    }

    axios.get(url,{params})
    // .then(console.log(total))
    .then(res => {
        setData(res.data.data.data)
        setTotal(res.data.data.total)
    })
    // .then(console.log(total))
    .then(console.log(data))
    .catch(err => {
        console.log(err)
    })

    

})
// setInterval(fetchData, 1000)
setTimeout(fetchData, 1000);
 

  

  const columns = useMemo(
    () => [
      
      {
        Header: 'Tx hash',
        accessor: 'hash',
        // disableSortBy: true,
        Filter: DefaultColumnFilter,
        filter: 'equals',
        
        
      },
      {
        Header: 'Time',
        accessor: 'timestamp',
        Cell:
         ( {cell: {value}} ) => {
          // const date = new Intl.DateTimeFormat('en-US').format(value * 1000);
          return <UTCTime time={value} />
           }
      },
      {
        Header: 'Block',
        accessor: 'bk',
      },
      
      {
        Header: 'From',
        accessor: 'from',
      },
      {
        Header: 'Direction',
        accessor: '',
        sortable: false,
        filterable: false,
        Cell: () => {
         
          return <span className='right-emoji'> {'=>'} </span>
           }
      },
      {
        Header: 'To',
        accessor: 'to',
      },
      {
        Header: 'Tx Type',
        accessor: 'type',
      },
      {
        Header: 'Info',
        // accessor: 'info.symbol info.value',
        accessor: 'info',
        Cell: ( {cell: {value}} ) => {
         
          return <span>{value.value} {value.symbol}</span>
           }
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100, position: 'relative',right:190 }}>
      <TableContainer
        columns={columns}
        data={data}
      />
    </Container>
  );
};

export default App;
