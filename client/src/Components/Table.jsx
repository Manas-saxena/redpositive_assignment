import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";
import axios from "axios"
import Editmodal from "../Components/Editmodal"


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
             <div width='100%' style={{display:"flex"}}>
             <DeleteOutline color='red' style={{margin:'0 10px 0 0'}} onClick ={()=>onClickDelete(param.row.id)}></DeleteOutline>
              <Editmodal id = {param.row.id} rows= {rows} setRows = {setRows}></Editmodal>
             </div>
             </>
             
         )
      }

  }

];
 
  return (
    
    <div style={{ height: 400, width: '100%', textAlign:'center' }}>
        
       { rows.length!==0?
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
          let result="";
     
          for(let id in ids)
          {
            result += `data ${rows[id].id} \n`
              result = result.concat(JSON.stringify(rows[id]));
              result+='\n\n'
          }

            setSelected(result);
        }}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        checkboxSelection
      />:<div></div>}
    </div>
  );
    
}
