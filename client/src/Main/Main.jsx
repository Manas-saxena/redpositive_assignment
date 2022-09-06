import React,{useState} from 'react'
import Table from "../Components/Table"
import Button from '@mui/material/Button';
import Addmodal from "../Components/Addmodal";
import "./main.scss"
function Main() {
    const [Selected, setselected] = useState([]);
    
  return (
    <div className='main'>
        <h2>User Data</h2>
        <div className='table'>
            <Table setSelected={setselected}></Table>
        </div>
        <div className='buttons'>
          <Addmodal></Addmodal>
        {/* <Button variant="contained">Add</Button> */}
        <Button variant="contained">Send</Button>
        </div>
    </div>
    
  )
}

export default Main