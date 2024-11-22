// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({
    totalItems: 0,
    areaEngineers: {},
    districts: {},
  });

  useEffect(() => {
    fetch('/data/cel.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        // Initialize summary counts
        const areaEngineersCount = {};
        const districtsCount = {};
        let totalItems = 0;

        data.forEach((item) => {
          // Count items
          totalItems++;

          // Count Area Engineers
          areaEngineersCount[item["Store type"]] = (areaEngineersCount[item["Store type"]] || 0) + 1;

          // Count Districts
          districtsCount[item["Store type.1"]] = (districtsCount[item["Store type.1"]] || 0) + 1;
        });

        setSummary({
          totalItems,
          areaEngineers: areaEngineersCount,
          districts: districtsCount,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const areaEngineerData = Object.entries(summary.areaEngineers).map(([name, count]) => ({ name, count }));
  const districtData = Object.entries(summary.districts).map(([name, count]) => ({ name, count }));

  return (
    <Box padding={3}>
      <Typography variant="h6" gutterBottom fontWeight="bold" style={{ fontSize: '1.5rem' }} marginBottom={4}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
  {/* Card for Total Items */}
        <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#f5f5f5', padding: 1 }}> {/* Change the color here */}
        <CardContent>
            <Typography variant="h6">Total Stores</Typography>
            <Typography variant="h6" fontWeight="bold" style={{ fontSize: '1.5rem' }}>
            {summary.totalItems}
            </Typography>
        </CardContent>
        </Card>
        </Grid>

        {/* Card for Area Engineers */}
        <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#f5f5f5', padding: 1 }}> {/* Change the color here */}
        <CardContent>
            <Typography variant="h6">Store Sizes</Typography>
            <Typography variant="h6" fontWeight="bold" style={{ fontSize: '1.5rem' }}>
            50
            </Typography>
        </CardContent>
        </Card>
        </Grid>

        {/* Card for Districts */}
        <Grid item xs={12} sm={4}>
        <Card sx={{ backgroundColor: '#f5f5f5', padding: 1 }}> {/* Change the color here */}
        <CardContent>
            <Typography variant="h6">Store Types</Typography>
            <Typography variant="h6" fontWeight="bold" style={{ fontSize: '1.5rem' }}>
            8
            </Typography>
        </CardContent>
        </Card>
        </Grid>
        </Grid>


     {/* Grid for Pie Charts */}
     <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {/* Pie Chart for Area Engineers */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Store Size
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={areaEngineerData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {areaEngineerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Grid>

        {/* Pie Chart for Districts */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom >
            Store Type
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={districtData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {districtData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
