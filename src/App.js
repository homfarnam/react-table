import React, { useEffect, useState, useMemo, Fragment } from 'react';
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

  // useEffect(() => {
  //   const doFetch = async () => {
  //     const response = await fetch('https://api.fsn365.com/txn');
  //     const body = await response.json();
  //     const contacts = body.data.data;
  //     console.log(contacts);
  //     setData(contacts);
  //   };
  //   doFetch();
  // }, []);



  const fetchData = useEffect(() => {
    const url = 'https://api.fsn365.com/txn'
    axios.get(url)
    .then(res => {
        setData(res.data.data.data)
    })
    .then(console.log(data))
    .catch(err => {
        console.log(err)
    })


})
setInterval(fetchData, 5000)
 

  

  const columns = useMemo(
    () => [
      
      {
        Header: 'Tx hash',
        accessor: 'hash',
        // disableSortBy: true,
        // Filter: SelectColumnFilter,
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
      // {
      //   Header: 'Hemisphere',
      //   accessor: (values) => {
      //     const { latitude, longitude } = values.location.coordinates;
      //     const first = Number(latitude) > 0 ? 'N' : 'S';
      //     const second = Number(longitude) > 0 ? 'E' : 'W';
      //     return first + '/' + second;
      //   },
      //   disableSortBy: true,
      //   Filter: SelectColumnFilter,
      //   filter: 'equals',
      //   Cell: ({ cell }) => {
      //     const { value } = cell;

      //     const pickEmoji = (value) => {
      //       let first = value[0]; // N or S
      //       let second = value[2]; // E or W
      //       const options = ['⇖', '⇗', '⇙', '⇘'];
      //       let num = first === 'N' ? 0 : 2;
      //       num = second === 'E' ? num + 1 : num;
      //       return options[num];
      //     };

      //     return (
      //       <div style={{ textAlign: 'center', fontSize: 18 }}>
      //         {pickEmoji(value)}
      //       </div>
      //     );
      //   },
      // },
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
