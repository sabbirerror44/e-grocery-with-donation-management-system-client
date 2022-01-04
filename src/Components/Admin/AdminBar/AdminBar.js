import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { ListItem } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../../../App';
import AddJob from '../AddJob/AddJob';
import AddProduct from '../AddProduct/AddProduct';
import Dashboard from '../Dashboard/Dashboard';
import DeleteProduct from '../DeleteProduct/DeleteProduct';
import DeliveredDonation from '../DeliveredDonation/DeliveredDonation';
import DeliveredOrder from '../DeliveredOrder/DeliveredOrder';
import JobPost from '../InterestedCandidate/JobPost';
import ManageOrg from '../ManageOrg/ManageOrg';
import PendingDonation from '../PendingDonation/PendingDonation';
import ProcessingOrder from '../ProcessingOrder/ProcessingOrder';
import ProductQuery from '../ProductQuery/ProductQuery';
import UpdateProduct from '../UpdateProduct/UpdateProduct';


const drawerWidth = 230;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminBar() {
  const theme = useTheme();
  const linkList = [ {name: 'Home' , link: '/admin'},
    {name: 'Add new job', link: '/admin/add/job'},
  {name: 'Add Product', link: '/admin/add/product'},
  {name: 'Processing Order', link: '/admin/processing/order'},
  {name: 'Delivered Order', link: '/admin/delivered/order'},
  {name: 'Pending Donation', link: '/admin/pending/donation'},
  {name: 'Delivered Donation', link: '/admin/delivered/donation'},
  {name: 'Product Query', link: '/admin/query'},
  {name: 'Update Product', link: '/admin/updateProduct'},
  {name: 'Delete Product', link: '/admin/deleteProduct'},
  {name: 'Interested Candidate', link: '/admin/previousJob'},
  {name: 'Manage Organization', link: '/admin/organization/manage'}
  ];
  const [open, setOpen] = React.useState(true);

  const [loggedInAdmin, setLoggedInAdmin] = useContext(AdminContext);

  const [trigger, setTrigger] = React.useState(false);

  React.useEffect(() => {
      
  },[trigger])


  const handleTrigger = () => {

      setTimeout(() => {
          setTrigger(!trigger);
      }, 300);

  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogOut = ()=>{
    localStorage.clear();
    setLoggedInAdmin('');
    // setTimeout(function(){ window.location.reload();}, 400);
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{marginBottom: '80px'}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" className="font-weight-bold mx-auto">
           Admin Panel
          </Typography>
          <NavLink to="/">
                <button onClick={handleLogOut} className="btn btn-danger float-right mr-3">
                        Log out
                </button>
            </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            minHeight: '2000px',
            boxSizing: 'border-box',
            background: '#006d85'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          { linkList.map((item) => (
             <ListItem button>
                 {/* <ListItemText primary={item.name}> */}
                <NavLink style={{textDecoration: 'none', color: 'white'}} to={item.link} onClick={handleTrigger} >{item.name}</NavLink>
                {/* </ListItemText> */}
               
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {
            window.location.pathname === "/admin" ?
            <Dashboard />:
            <></>
        }
       {
           window.location.pathname === "/admin/add/product" ?
           <AddProduct/> :
           <></>
       }
       {
           window.location.pathname === "/admin/add/job" ?
           <AddJob /> :
           <></>
       }
       {
              window.location.pathname ===  "/admin/processing/order" ?
            <ProcessingOrder /> :
            <></>

       }
        {
              window.location.pathname ===  "/admin/delivered/order" ?
            <DeliveredOrder /> :
            <></>

       }
        {
              window.location.pathname === "/admin/pending/donation" ?
            <PendingDonation /> :
            <></>

       }
        
        {
            window.location.pathname ===  "/admin/delivered/donation" ?
            <DeliveredDonation /> :
            <></>

       }
        {
            window.location.pathname ===  "/admin/query" ?
            <ProductQuery /> :
            <></>

       }
       {
            window.location.pathname ===  "/admin/updateProduct" ?
            <UpdateProduct /> :
            <></>

       }
       {
            window.location.pathname ===  "/admin/deleteProduct" ?
            <DeleteProduct /> :
            <></>

       }
       {
            window.location.pathname ===  "/admin/previousJob" ?
            <JobPost /> :
            <></>

       }
       {
            window.location.pathname ===  "/admin/organization/manage" ?
            <ManageOrg /> :
            <></>

       }
      </Main>
    </Box>
  );
}