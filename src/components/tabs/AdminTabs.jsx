import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const AdminTabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export const AdminTabs = () => {
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          <Tab label="Main Slider" id="0"/>
          <Tab label="All Movies" id="1"/>
          <Tab label="Web3 Projects" id="2"/>
          <Tab label="Calendar" id="3"/>
        </Tabs>
      </Box>
      <AdminTabPanel value={value} index={0}>
        Item One
      </AdminTabPanel>
      <AdminTabPanel value={value} index={1}>
        Item Two
      </AdminTabPanel>
      <AdminTabPanel value={value} index={2}>
        Item Three
      </AdminTabPanel>
      <AdminTabPanel value={value} index={3}>
        Item Three
      </AdminTabPanel>
    </Box>
  );
};
