import React from "react";
import {Box,Button,IconButton, TextField, Tooltip, Typography } from "@mui/material";
import "./TasksStyles.css";
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import DateDetails from "../store/Store";
export default function Tasks() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [fromTime, setFromTime] = useState(dayjs);
  const [toTime, setToTime] = useState(dayjs().add(1, 'hour'));
  const [taskName, setTaskName] = useState();
  const [fromTime2, setFromTime2] = useState(dayjs);
  const [toTime2, setToTime2] = useState(dayjs().add(1, 'hour'));
  const [taskName2, setTaskName2] = useState();
  const {selectedDate,mode} = DateDetails();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);setTaskName("");setFromTime(dayjs());setToTime(dayjs().add(1, 'hour'))};
  const handleClose2 = () => {setOpen2(false);setTaskName("");};
  const [tasks, setTasks] = useState([]);
  function addTask(){
    if(taskName!=""){
      setOpen(false);
      setTasks([...tasks,{id: Date.now(),fromTime,toTime,taskName}]);
    }
    setFromTime(dayjs());
    setToTime(dayjs().add(1, 'hour'));
  }
  function handleDelete(id){
    setTasks(tasks.filter((task) => task.id !== id));
  }
  const [editId, setEditId] = useState();
  function handleEdit(id){
    setOpen2(true);
    setEditId(id);
    setFromTime2(tasks.find((task) => task.id === id).fromTime);
    setToTime2(tasks.find((task) => task.id === id).toTime);
    setTaskName2(tasks.find((task) => task.id === id).taskName);
  }
  function editTask(){

    if(taskName2!=""){
      setOpen2(false);
      setTasks(tasks.map((task) =>
        task.id === editId
          ? { ...task, fromTime: fromTime2, toTime: toTime2, taskName: taskName2 }
          : task
      ));
    }
  }
  return (
    <>
    {/*Dialog for editing task */}
      <Dialog onClose={handleClose2} open={open2} >
      <Box sx={{width:"500px",height:"320px",padding:"20px",paddingTop:"10px"}}>
       <div className="addtask">
        <h3>Add Task</h3>
        <div className="intime">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['TimeField', 'TimeField']}>
        <TimeField
          label="From"
          sx={{width:"1000px !important"}}
          value={fromTime2}
          onChange={(newValue) => setFromTime2(newValue)}
        />
        <TimeField
          label="To"
          sx={{width:"1000px !important"}}
          value={toTime2}
          onChange={(newValue) => setToTime2(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <TextField id="outlined-basic" sx={{mt:3}} label="Task Name" variant="outlined" value={taskName2} onChange={(e) => setTaskName2(e.target.value)}/>
        <div className="buttonsc" >
        <Button variant="contained" color="primary" onClick={handleClose2} sx={{marginRight:"10px"}}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={editTask}>
          Edit Task 
        </Button>
       </div>
       </div>
       </Box>
    </Dialog>
    <Dialog onClose={handleClose} open={open } >
      <Box sx={{width:"500px",height:"320px",padding:"20px",paddingTop:"10px"}}>
       <div className="addtask">
        <h3>Add Task</h3>
        <div className="intime">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer  components={['TimeField', 'TimeField']}>
        <TimeField
          label="From"
          sx={{width:"1000px !important"}}
          value={fromTime}
          onChange={(newValue) => setFromTime(newValue)}
        />
        <TimeField
          label="To"
          sx={{width:"1000px !important"}}
          value={toTime}
          onChange={(newValue) => setToTime(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        </div>
        <TextField id="outlined-basic" sx={{mt:3}} label="Task Name" variant="outlined" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>
        <div className="buttonsc" >
        <Button variant="contained" color="primary" onClick={handleClose} sx={{marginRight:"10px"}}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task 
        </Button>
       </div>
       </div>
       </Box>
    </Dialog>
      <div className="taskcointainer">
      <div className="tasks">
      {tasks.map((task,index) =>
        (<Paper  elevation={2} className="task" sx={{borderRadius:"25px",backgroundColor:mode=="light"?"rgb(240, 244, 249)":"gray"}}>
          <div className="time">
            <div className="timeft">
            <Typography variant="h10" className="timeft" sx={{width:"80px" ,backgroundColor:"rgb(66, 133, 244)",}}>{task.fromTime.format("hh:mm A")}</Typography>
            <Typography variant="h10" className="timeft" sx={{width:"80px" ,backgroundColor:"rgb(66, 133, 244)",ml:1}} >{task.toTime.format("hh:mm A")}</Typography>
            </div>
           <div className="buttons">
            <Tooltip title="Edit" >
            <IconButton type="button" aria-label="search" size="small" onClick={()=>handleEdit(task.id)} >
            <span className="material-symbols-outlined">edit</span>
            </IconButton>
            </Tooltip>
            <Tooltip title="Delete" >
            <IconButton type="button" aria-label="search" size="small" onClick={()=>handleDelete(task.id)} >
            <span className="material-symbols-outlined">delete</span>
            </IconButton>
            </Tooltip>
             </div>
          </div>
          <div className="taskname">
            <h3>{task.taskName}</h3>
          </div>
          <div className="markcompleted" style={{backgroundColor:mode=="light"?"rgb(240, 244, 249)":"gray"}}>
            <IconButton >
            <p>Mark Completed</p>
            </IconButton>
          </div>
        </Paper>))}
      </div>
      <Fab onClick={handleOpen}
          color="primary"
          sx={(theme) => ({
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          })}
        >
          <AddIcon sx={{color:"white",fontSize:"30px"}}/>
        </Fab>
      </div>
    </>
  );
}
