import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import validator from 'validator';
import axios from "axios"
// import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width:'600px',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
};

const modalcss={
    margin:'20px',

}

export default function BasicModal({rows , setRows}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
     setOpen(false);
     setData({
        name:'',
        phoneNumber:'',
        email:'',
        hobbies:''
    })};
  const [err , setErr] = useState({
    name:false,
    phoneNumber:false,
    email:false,
    hobbies:false
});
    const [data, setData] =useState({
        name:'',
        phoneNumber:'',
        email:'',
        hobbies:''
    });
    const change = (e)=>{

        const key = e.target.name;
        const value = e.target.value; 
        setData({...data , [key] : value });
        setErr({  name:false,
    phoneNumber:false,
    email:false,
    hobbies:false});

    }
    const onSubmit = (e) =>{
        e.preventDefault();
        let error = err; 
        if( !validator.isEmail(data.email))
        {
            error = {...error,email:true};
        }
        if(data.name.length ===0)
        {
            error = {...error,name:true};

        }
        if(data.hobbies.length ===0)
        {
            error = {...error,hobbies:true};
        }
        if(data.phoneNumber.length!==10 && !validator.isMobilePhone(data.phoneNumber)){
            error ={...error,phoneNumber:true};
        }
        if(err == error)
        {
          axios.post("/" ,data)
          .then((res)=>{
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
            console.log("success");

          })
          .catch((err)=>{
            console.log(err);
          })
         handleClose();

        }
        setErr(error);
    }
    
  return (
    <div>
      <Button  variant="contained" onClick={handleOpen}>Add Data</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align='center' color='rgb(24,13,205)' marginBottom='20px' variant="h6" component="h2">
            Add Data 
          </Typography>
          <form align='center'>
           <TextField label="Name" name='name' error={err.name ?true:false}  helperText={err.name?"Incorrect entry.":""} value={data.name} onChange={change} sx={modalcss} variant="outlined" />
           <TextField label="Phone Number" name='phoneNumber'  helperText={err.phoneNumber?"Incorrect entry.":""} error={err.phoneNumber?true:false} value={data.phoneNumber} onChange={change} sx={modalcss} variant="outlined" />
           <TextField label="Email"  name='email' error={err.email?true:false} helperText={err.email?"Incorrect entry.":""} value={data.email} onChange={change} sx={modalcss}variant="outlined" />
           <TextField label="Hobbies" name='hobbies'  error={err.hobbies?true:false} helperText={err.hobbies?"Incorrect entry.":""} value={data.hobbies} onChange={change} sx={modalcss}variant="outlined" />
           <br></br>
           <Button  variant="contained" onClick={onSubmit}>Submit </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
