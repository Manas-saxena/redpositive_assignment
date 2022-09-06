import * as React from 'react';
import {useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";
import axios from "axios"


export default function DataTable({setSelected , rows , setRows}) {


 
    const onClickDelete = (id) =>{
    axios.delete(`/${rows[id]._id}`)
    .then(res=>{
      let temp = rows;
      temp = temp.filter(item => item.id !== id)
      setRows( temp);
    })
    .catch(err =>{
      console.log(err);
    })
    }  
    
const columns = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone Number',width: 150 },
  {
    field: 'email',
    headerName: 'Email',
    width:250,
  },
  {
    field: 'hobbies',
    headerName: 'Hobbies',
    width: 200,
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
 
  return (
    
    <div style={{ height: 400, width: '100%', textAlign:'center' }}>
        
       { rows.length!=0?
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
      />:<div></div>}
    </div>
  );
    
}
