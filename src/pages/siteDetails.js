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
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import Link from 'next/link';
import MapIcon from '@mui/icons-material/Map';

const TrackingStatusTable = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    phase: '',
    district: '',
    areaEngineer: '',
    milestone: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      "itemNo": 1,
      "phase": "Phase 01",
      "areaEngineer": "Dhanushka",
      "district": "Trincomalee PS",
      "locationDetails": "Gomarangadawela",
      "subLocation": "Head Office",
      "delayDays": 0,
      "estimatedCompletionDate": "2024-11-11",
    },
    {
        "itemNo": 2,
        "phase": "Phase 01",
        "areaEngineer": "Gayan",
        "district": "Trincomalee PS",
        "locationDetails": "Gomarangadawela",
        "subLocation": "Head Office",
        "delayDays": 0,
        "estimatedCompletionDate": "2024-11-11",
      },
      {
        "itemNo": 3,
        "phase": "Phase 02",
        "areaEngineer": "Gihan",
        "district": "Trincomalee PS",
        "locationDetails": "Gomarangadawela",
        "subLocation": "Head Office",
        "delayDays": 0,
        "estimatedCompletionDate": "2024-11-11",
      },
      {
        "itemNo": 4,
        "phase": "Phase 02",
        "areaEngineer": "Dhanushka",
        "district": "Trincomalee PS",
        "locationDetails": "Gomarangadawela",
        "subLocation": "Head Office",
        "delayDays": 0,
        "estimatedCompletionDate": "2024-11-11",
      },
      {
        "itemNo": 5,
        "phase": "Phase 03",
        "areaEngineer": "Gayan",
        "district": "Trincomalee PS",
        "locationDetails": "Gomarangadawela",
        "subLocation": "Head Office",
        "delayDays": 0,
        "estimatedCompletionDate": "2024-11-11",
      },

    // Add more objects as necessary
  ];

  useEffect(() => {
    // Filter data based on selected filters
    const newData = data.filter((item) => {
      return (
        (filters.phase === '' || item.phase === filters.phase) &&
        (filters.district === '' || item.district === filters.district) &&
        (filters.areaEngineer === '' || item.areaEngineer === filters.areaEngineer) &&
        (filters.milestone === '' || item.milestone === filters.milestone)
      );
    });
    setFilteredData(newData);
    setPage(0); // Reset to first page when filters change
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
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
        District Summery
      </Typography>
      {/* Card for District Information */}
      <Card sx={{ marginBottom: 4 }}>
        <CardHeader
          avatar={<MapIcon></MapIcon>} // Replace with the actual site icon you want
          title={<Typography variant="h6">{filteredData.length > 0 ? filteredData[0].district : 'District Name'}</Typography>}
          action={
            <Box>
              <Typography variant="body1" fontWeight="bold">Area Engineer : {filteredData.length > 0 ? filteredData[0].areaEngineer : 'Area Engineer'}</Typography>
              <Typography variant="body2">District : {filteredData.length > 0 ? filteredData[0].phase : 'Phase'}</Typography>
            </Box>
          }
        />
        <CardContent>
          {/* You can add any additional content here if needed */}
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="space-between" mb={6}>
        <TextField
          select
          label="Project Phase"
          name="phase"
          value={filters.phase}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Phase 01">Phase 01</MenuItem>
          <MenuItem value="Phase 02">Phase 02</MenuItem>
          <MenuItem value="Phase 03">Phase 03</MenuItem>
        </TextField>
        
        <TextField
          select
          label="District"
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Trincomalee PS">Trincomalee</MenuItem>
          <MenuItem value="Batticaloa PS">Batticaloa</MenuItem>
          <MenuItem value="Ampara PS">Ampara</MenuItem>
        </TextField>
        
        <TextField
          select
          label="Area Engineer"
          name="areaEngineer"
          value={filters.areaEngineer}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Dhanushka">Dhanushka</MenuItem>
          <MenuItem value="Gayan">Gayan</MenuItem>
          <MenuItem value="Gehan">Gehan</MenuItem>
        </TextField>

        <TextField
          select
          label="Milestone"
          name="milestone"
          value={filters.milestone}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ maxWidth: '340px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Main Agreement">Main Agreement</MenuItem>
          <MenuItem value="Pre-approvals">Pre-approvals</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Procurement">Procurement</MenuItem>
          <MenuItem value="Implementation">Implementation</MenuItem>
          <MenuItem value="Commissioning">Commissioning</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Item No</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell>Area Engineer</TableCell>
              <TableCell>District</TableCell>
              <TableCell>Location Details</TableCell>
              <TableCell>Sub Location</TableCell>
              <TableCell>Delay Days</TableCell>
              <TableCell>Estimated Completion Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.itemNo}</TableCell>
                <TableCell>{row.phase}</TableCell>
                <TableCell>{row.areaEngineer}</TableCell>
                <TableCell>{row.district}</TableCell>
                <TableCell>{row.locationDetails}</TableCell>
                <TableCell>{row.subLocation}</TableCell>
                <TableCell>{row.delayDays}</TableCell>
                <TableCell>{row.estimatedCompletionDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
