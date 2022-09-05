import * as React from 'react';
import {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";

const onClickDelete = (id) =>{
    console.log('deleted row' + id);
} 
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number',width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    width:300,
  },
  {
    field: 'hobbies',
    headerName: 'Hobbies',
    width: 300,
  },
  {
      field:"Delete",
      headerName:"Delete",
      width:200,
      renderCell:(param)=>{
         return (
             <>
             <div width='100%'>
             <DeleteOutline color='red' className='productListDelete' onClick ={()=>onClickDelete(param.row.id)}></DeleteOutline>
             </div>
             </>
             
         )
      }

  }

];

const rows = [
  { id: 1, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com' ,hobbies:'cricket , music' },
  { id: 2, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com' ,hobbies:'cricket , music'},
   { id: 3, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com' ,hobbies:'cricket , music'},
    { id: 4, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com' ,hobbies:'cricket , music'},
     { id: 5, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com',hobbies:'cricket , music' },
      { id: 6, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com',hobbies:'cricket , music'},
       { id: 7, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com',hobbies:'cricket , music' },
        { id: 8, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com',hobbies:'cricket , music' },
         { id: 9, name: 'Snow', phoneNumber: '991725980', email: 'manassaxena23234@gmail.com',hobbies:'cricket , music' },
];

export default function DataTable({setSelected}) {
 
    
  return (
    
    <div style={{ height: 400, width: '100%', textAlign:'center' }}>
        
      <DataGrid
      sx={{color:'white' ,
    '& .MuiTablePagination-displayedRows': {
      color: 'white',
    },
    '& .MuiButtonBase-root':{
        color: 'white',
    },
    '& .MuiSvgIcon-colorRed':{
        color:'red'
    }
}}
        rows={rows}
        columns={columns}
        pageSize={5}
        onSelectionModelChange = {(ids)=>{
            setSelected(ids);
        }}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  );
    
}
