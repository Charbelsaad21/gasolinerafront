import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkIcon from '@mui/icons-material/Work';
import InventoryIcon from '@mui/icons-material/Inventory';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ApprovalIcon from '@mui/icons-material/Approval';
import CommuteIcon from '@mui/icons-material/Commute';
import AlbumIcon from '@mui/icons-material/Album';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>

      <ListItem disablePadding>
            <Link to="/"  style={{ textDecoration: 'none', color: '#000', width: "100%"}} >
              <ListItemButton selected={props.title=== "Conductores" }>
                    <ListItemIcon>
                      <AirlineSeatReclineNormalIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"Conductores"} />
              </ListItemButton>
            </Link>  
          </ListItem>

          <ListItem disablePadding>
            <Link to="/tankerTrucks" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Camion de Cisterna" }>
                  <ListItemIcon>
                      <LocalShippingIcon/>
                  </ListItemIcon>
                <ListItemText primary={"camiones cisterna"} />
              </ListItemButton>
            </Link>  
          </ListItem>

          <ListItem disablePadding>
            <Link to="/modalities" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Modalidades" }>
                  <ListItemIcon>
                      <PanToolIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Modalidades"} />
              </ListItemButton>
            </Link>  
          </ListItem>

          <ListItem disablePadding>
            <Link to="/cities" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>  
              <ListItemButton selected={props.title=== "Ciudades" }>
                <ListItemIcon>
                  <LocationOnIcon/>
                </ListItemIcon>
                <ListItemText primary={"Ciudades"} />
              </ListItemButton>
            </Link>   
          </ListItem>

          <ListItem disablePadding>
              <Link to="/states" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Estado" }>
                  <ListItemIcon>
                    <LocationOnIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Estado"} />
              </ListItemButton>
            </Link> 
          </ListItem>  

          <ListItem disablePadding>
            <Link to="/servicestations" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Estacion de servicio"}>
                  <ListItemIcon>
                    <LocalGasStationIcon/>
                  </ListItemIcon>
                  <ListItemText primary={"Estacion de Servicio"} />
                </ListItemButton>
              </Link> 
          </ListItem>

          <ListItem disablePadding>
            <Link to="/employees" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Empleados" }>
                    <ListItemIcon>
                      <PeopleIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"Empleados"} />
                </ListItemButton>
              </Link> 
          </ListItem>

          <ListItem disablePadding>
            <Link to="/vehicles" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Vehiculos" }>
                    <ListItemIcon>
                      <DirectionsCarIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"Vehiculos"} />
                </ListItemButton>
              </Link> 
          </ListItem>

          <ListItem disablePadding>
            <Link to="/owners" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Propietario" }>
                    <ListItemIcon>
                      <CarRentalIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"propietario"} />
                </ListItemButton>
              </Link> 
          </ListItem>

          <ListItem disablePadding>
            <Link to="/payments" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
                <ListItemButton selected={props.title=== "Pago" }>
                    <ListItemIcon>
                      <PaymentsIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"Pagos"} />
                </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/rates" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Tasa" }>
                  <ListItemIcon>
                    <AttachMoneyIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Tasa"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/getsdispatched" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Despacho" }>
                  <ListItemIcon>
                    <LocalShippingIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Despacho"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            < Link to="/worksIn" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Trabaja en" }>
                  <ListItemIcon>
                    <WorkIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Trabaja en"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/supplies" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Suministra" }>
                  <ListItemIcon>
                    <InventoryIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Suministros"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/applies" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Aplica" }>
                  <ListItemIcon>
                    <ApprovalIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Aplica"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/drives" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Conduce" }>
                  <ListItemIcon>
                    <AlbumIcon/>
                  </ListItemIcon>
                <ListItemText primary={"conduce"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/employeesphones" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Telefono de Empleados" }>
                  <ListItemIcon>
                    <PhoneIphoneIcon/>
                  </ListItemIcon>
                <ListItemText primary={"telefono de Empleados"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/ownersphones" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton  selected={props.title=== "Telefono de Propietario" }>
                  <ListItemIcon>
                    <PhoneIphoneIcon/>
                  </ListItemIcon>
                <ListItemText primary={"Telefono de propietario"} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/models" style={{ textDecoration: 'none', color: '#000', width: "100%"}}>
              <ListItemButton selected={props.title=== "Modelo" }>
                    <ListItemIcon>
                      <CommuteIcon/>
                    </ListItemIcon>
                  <ListItemText primary={"Modelos"} />
              </ListItemButton>
            </Link>
          </ListItem>

      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#D36135",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
              {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
