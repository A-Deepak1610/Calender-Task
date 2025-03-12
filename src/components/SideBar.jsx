import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import icon from '../assets/icon.png';
import './SideBarStyles.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button, colors, Popover } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState } from 'react';
import DateDetails from '../store/Store';
import dayjs from 'dayjs';
import Tasks from '../pages/Tasks';

function ToolbarActionsSearch() {
  const theme = useTheme(); 
  const [anchorEl, setAnchorEl] =useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverId = open ? "settings-popover" : undefined;
  const {mode,handleMode,} = DateDetails();
  function Themswitcher() {
    if (theme.palette.mode === "light") {
      handleMode("dark")
      console.log(mode)
      
    } else if(theme.palette.mode==="dark") {
      handleMode("light")
      console.log(mode)
    }
  }
    return (
    <Stack direction="row" alignItems="center" >
     <Tooltip title="Search" enterDelay={1000} sx={{cursor:"pointer"}}>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr:3 }}
      />
      <Button variant="outlined" sx={{ mr: 2 ,borderColor:"#6d6e6f", color:mode=="light"?"rgb(44, 44, 44)":"white"}}  >New Task</Button>
      <IconButton
        onClick={handleOpen}
        sx={{ color: "blue", mr: {lg:3,md:2} }}
        aria-describedby={popoverId}
      >
        <SettingsIcon sx={{fontSize:{xs:"18.1px",md:"25px",lg:"25px"}}} />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 1 }} 
      >
        <Box
          sx={{
            p: 2,
            minWidth: 180,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Theme Settings
          </Typography>
          <IconButton onClick={Themswitcher} >
            <ThemeSwitcher />
          </IconButton>
        </Box>
      </Popover>
      <img src="{user.photoURL}" alt="ICON" className='gicon' />
    </Stack>
  );
}
function SidebarFooter({ mini }) {
  const {selectedDate,handleDate,mode} = DateDetails();    
  const [date, setDate] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState("");
  React.useEffect(() => {
    if (date) {
      handleDate(date.format("MMMM D, YYYY"));
    }
  }, [date]);
  return (
    <div className="sidebarcontent">
       <LocalizationProvider dateAdapter={AdapterDayjs} >
        {mini ? '' : <DateCalendar showDaysOutsideCurrentMonth fixedWeekNumber={6}  sx={{marginTop:-85,color:mode=="light"?"black":"white",width:"100%"}} value={date}   onChange={(newValue) => setDate(newValue)}/>}
    </LocalizationProvider>
    </div>
  );
}
SidebarFooter.propTypes = {
  mini: PropTypes.bool.isRequired,
};
function CustomAppTitle() {
  const {selectedDate,handleDate,mode} = DateDetails();    
  const handlePreviousDay = () => {
    handleDate(dayjs(selectedDate, "MMMM D, YYYY").subtract(1, "day").format("MMMM D, YYYY"));
  };
  const handleNextDay = () => {
    handleDate(dayjs(selectedDate, "MMMM D, YYYY").add(1, "day").format("MMMM D, YYYY"));
  };
  const handleToday = () => {
    handleDate(dayjs().format("MMMM D, YYYY"));
  };
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2} >
        <p className='date'>{new Date().getDate(    )}</p>
        <img src={icon} alt="icon" className='icon' />
      <Typography variant="h5">Scheduler</Typography>
    </Stack>
    <Stack direction="row" alignItems="center"  sx={{ml:6}} >
      <Typography className='toady' onClick={handleToday} >Today</Typography>
      <Tooltip title="Previous Day" >
        <IconButton sx={{color:mode=="light"?"black":"white",ml:2}} onClick={handlePreviousDay} >
      <KeyboardArrowLeftIcon/>
      </IconButton>
      </Tooltip>
      <Tooltip title="Next Day" >
      <IconButton sx={{color:mode=="light"?"black":"white",}} onClick={handleNextDay} >
      <KeyboardArrowRightIcon/>
      </IconButton>
        </Tooltip>
      <Typography className='currentdate' >{selectedDate}</Typography>
      </Stack>
      </>

  );
}
function SideBar() {
  const {mode,handleMode,} = DateDetails();   
  const demoTheme = createTheme({  
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    palette: {
      primary: {
        main: "#4285f4", 
      },
      secondary: {
        main: "#1e1e1e", 
      },
    },
    components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor:mode=="light"?"rgb(234, 240, 248)" :"#1b1b1b",
              height:"60px"
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor:mode=="light"?"rgb(234, 240, 248)" :"#1b1b1b",
              // color: "#ffffff",
            },
          },
        },
      },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const router = useDemoRouter('/dashboard');
  return (
    <div className="sidebar">
      <AppProvider router={router} theme={demoTheme}>
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooter, 
          }}
        >
          <Tasks/>
        </DashboardLayout>
      </AppProvider>
    </div>
  );
}

export default SideBar;
