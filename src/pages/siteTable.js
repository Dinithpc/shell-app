import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  TablePagination,
  Box,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TrackingStatusTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    phase: '',
    district: '',
    areaEngineer: '',
    shopName: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetch('/data/cel.json')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          caseId: item['Case ID'],
          email: item['Email'] || 'No Email Provided',
          phone: item['Phone'] || 'No Phone Provided',
          lastConnectionDate: item['Last connection date'] || 'No Connection Date',
          connectionDuration: item['Duration of connection in minutes'] || 0,
          connections: item['Number of connections'] || 0,
          shopName: item[' - Name of the shop (Address):'] || 'Unknown Shop Name',
          shopAddress: item[' - Shop number (Address):'] || 'No Shop Address Provided',
          streetName: item[' - Street Name\u00a0(Address):'] || 'No Street Name',
          locality: item[' - Area / Locality:'] || 'No Locality',
          town: item[' - Town :'] || 'No Town',
          landmark: item[' - Landmark:'] || 'No Landmark',
          geoLocation: item['Geo Location'] || 'No Geo Location',
          googleCoordinate: item['Google_Coordinate'] || { latitude: null, longitude: null },
          areaEngineer: item['Area Engineer'] || 'Unknown Engineer',
          district: item['District'] || 'Unknown District',
          phase: item['Phase'] || 'Unknown Phase',
          connectionDetails: {
            disposition: item['Disposition'] || 'No Disposition',
            deviceOS: item['Device OS'] || 'Unknown OS',
            osVersion: item['Version OS'] || 'Unknown Version',
          },
          shopDetails: {
            areaInSqFoot: item['Area of the shop in sq foot.'] || 0,
            storeType: item['Store type'] || 'Unknown Store Type',
            storeType1: item['Store type.1'] || 'Unknown Store Type',
          },
          color: item['Color Code'] || '#FF0000',
        }));

        setData(formattedData);
        setFilteredData(formattedData); // Initialize filtered data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Apply filters and search
    const newData = data.filter((item) => {
      // Ensure caseId, shopName, email, and shopAddress are treated as strings
      const matchesSearchQuery =
        String(item.caseId).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.shopName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.email).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.shopAddress).toLowerCase().includes(searchQuery.toLowerCase());
  
      const matchesFilters =
        (filters.phase === '' || item.shopDetails.storeType === filters.phase) &&
        (filters.district === '' || item.shopDetails.storeType1 === filters.district) &&
        (filters.areaEngineer === '' || item.locality === filters.areaEngineer) &&
        (filters.shopName === '' || item.shopName === filters.shopName);
  
      return matchesSearchQuery && matchesFilters;
    });
  
    setFilteredData(newData);
    setPage(0); // Reset page to 0 on filter or search change
  }, [filters, data, searchQuery]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold" style={{ fontSize: '1.5rem' }} marginBottom={4}>
        Tracking Status Table
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={6} ml={7} sx={{ width: '90%' }}>
      {/* Search Input */}
        <TextField
          fullWidth // This still makes the input take up the full width of its parent container
          variant="outlined"
          placeholder="Search..." // Placeholder text
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={6}>
        {/* Filters for Phase, District, Area Engineer, Shop Name */}
        <TextField
          select
          label="Store Size"
          name="phase"
          value={filters.phase}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          {filteredData
            .map((item) => item.shopDetails.storeType) // Get store types from filtered data
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .map((storeType, index) => (
              <MenuItem key={index} value={storeType}>
                {storeType}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Store Type"
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          {filteredData
            .map((item) => item.shopDetails.storeType1) // Get store types from filtered data
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .map((storeType, index) => (
              <MenuItem key={index} value={storeType}>
                {storeType}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Area"
          name="areaEngineer"
          value={filters.areaEngineer}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          {filteredData
            .map((item) => item.locality) // Get areas from filtered data
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .map((locality, index) => (
              <MenuItem key={index} value={locality}>
                {locality}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Shop Name"
          name="shopName"
          value={filters.shopName}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          {filteredData
            .map((item) => item.shopName) // Get shop names from filtered data
            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
            .map((shopName, index) => (
              <MenuItem key={index} value={shopName}>
                {shopName}
              </MenuItem>
            ))}
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Case ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Last Connection Date</TableCell>
              <TableCell>Connection Duration</TableCell>
              <TableCell>Connections</TableCell>
              <TableCell>Shop Name</TableCell>
              <TableCell>Shop Address</TableCell>
              <TableCell>Shop Locality</TableCell>
              <TableCell>Town</TableCell>
              <TableCell>Disposition</TableCell>
              <TableCell>Device OS</TableCell>
              <TableCell>OS Version</TableCell>
              <TableCell>Area (sq ft)</TableCell>
              <TableCell>Store Type</TableCell>
              {/* <TableCell>Phase</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.caseId}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.lastConnectionDate}</TableCell>
                  <TableCell>{item.connectionDuration}</TableCell>
                  <TableCell>{item.connections}</TableCell>
                  <TableCell>{item.shopName}</TableCell>
                  <TableCell>{item.shopAddress}</TableCell>
                  <TableCell>{item.locality}</TableCell>
                  <TableCell>{item.town}</TableCell>
                  <TableCell>{item.connectionDetails.disposition}</TableCell>
                  <TableCell>{item.connectionDetails.deviceOS}</TableCell>
                  <TableCell>{item.connectionDetails.osVersion}</TableCell>
                  <TableCell>{item.shopDetails.areaInSqFoot}</TableCell>
                  <TableCell>{item.shopDetails.storeType}</TableCell>
                  {/* <TableCell>{item.phase}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TrackingStatusTable;
