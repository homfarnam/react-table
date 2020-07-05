import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://api.fsn365.com/txn');
      const body = await response.json();
      const contacts = body.data.data;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);


 

  

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
        Cell: ( {cell: {value}} ) => {
          const date = new Intl.DateTimeFormat('en-US').format(value * 1000);
          return <span>{date}</span>
           }
      },
      {
        Header: 'Block',
        accessor: 'bk',
        show:false
      },
      
      {
        Header: 'From',
        accessor: 'from',
      },
      {
        Header: 'To',
        accessor: 'to',
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
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}
      />
    </Container>
  );
};

export default App;
