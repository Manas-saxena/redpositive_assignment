import React,{useState,useEffect , useRef} from 'react'
import Table from "../Components/Table"
import Button from '@mui/material/Button';
import Addmodal from "../Components/Addmodal";
import toast from "react-hot-toast"
import "./main.scss"
import axios from 'axios';
import emailjs from '@emailjs/browser';
function Main() {
    const [selected, setselected] = useState("");
     const [rows , setRows] = useState([]);
    
    useEffect(() => {
      axios.get("/api/")
      .then(res =>{
        let temp = res.data;
        for(let i=0;i<temp.length;i++)
        {
          temp[i] = {...temp[i] , id :i};
        }
        toast.success("Welcome");
        setRows(temp);
        
      })
      .catch(err=>{
         toast.error("error occured");
        console.log(err);
      })
    },[])
     const form = useRef();
     const sendEmail = (e) => {
    e.preventDefault();
      console.log(selected);
    emailjs.sendForm('service_8jct95a', 'template_j3rg1t5', form.current, 'VbK71Lbsyv_Lu6i-A')
      .then((result) => {
        toast.success("Mail sent successfully");
          console.log(result.text);
      }, (error) => {
        toast.error("error occured");
          console.log(error.text);
      });
  };
  // if(selected.length >0){
  // for(let id in selected)
  // {
  //     result.concat(JSON.stringify(rows[id]));
  // }
  // }

  return (
    <div className='main'>
        <h2>User Data</h2>
        <div className='table'>
            <Table rows = {rows} setRows ={setRows}  setSelected={setselected}></Table>
        </div>
        <div className='buttons'>
          <Addmodal rows = {rows} setRows ={setRows}></Addmodal>
        {/* <Button variant="contained">Add</Button> */}

        <form ref = {form}>
          <input type="hidden" name='message' value ={selected} />
        <Button variant="contained" onClick={sendEmail}>Send</Button>
        </form>
        </div>
    </div>
    
  )
}

export default Main