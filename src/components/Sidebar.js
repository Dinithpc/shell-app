// components/Sidebar.js

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <List>
      <ListItem button onClick={() => handleNavigation('/')}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/map')}>
        <ListItemIcon><MapIcon /></ListItemIcon>
        <ListItemText primary="Site Map" />
      </ListItem>
      <ListItem button onClick={() => handleNavigation('/siteTable')}>
        <ListItemIcon><TableChartIcon /></ListItemIcon>
        <ListItemText primary="Site Table" />
      </ListItem>
      {/* Add more items here */}
    </List>
  );
};

export default Sidebar;

