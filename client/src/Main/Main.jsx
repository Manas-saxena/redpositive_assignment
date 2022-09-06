import React,{useState,useEffect} from 'react'
import Table from "../Components/Table"
import Button from '@mui/material/Button';
import Addmodal from "../Components/Addmodal";
import "./main.scss"
import axios from 'axios';
function Main() {
    const [Selected, setselected] = useState([]);
     const [rows , setRows] = useState([]);
    
    useEffect(() => {
      axios.get("http://localhost:8000/api/")
      .then(res =>{
        let temp = res.data;
        for(let i=0;i<temp.length;i++)
        {
          temp[i] = {...temp[i] , id :i};
        }
        console.log(temp);
        setRows(temp);
        
      })
      .catch(err=>{
        console.log(err);
      })
    },[])
  return (
    <div className='main'>
        <h2>User Data</h2>
        <div className='table'>
            <Table rows = {rows} setRows ={setRows}  setSelected={setselected}></Table>
        </div>
        <div className='buttons'>
          <Addmodal rows = {rows} setRows ={setRows}></Addmodal>
        {/* <Button variant="contained">Add</Button> */}
        <Button variant="contained">Send</Button>
        </div>
    </div>
    
  )
}

export default Main