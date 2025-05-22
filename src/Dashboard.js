import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Add, Settings, Notifications, SaveAlt } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const pieData = [
  { name: 'Facebook', value: 40 },
  { name: 'Google', value: 60 },
];

const COLORS = ['#FF6384', '#36A2EB'];

const salesData = [
  { name: 'Day 1', online: 4000, store: 2400 },
  { name: 'Day 2', online: 3000, store: 1398 },
  { name: 'Day 3', online: 2000, store: 9800 },
  { name: 'Day 4', online: 2780, store: 3908 },
  { name: 'Day 5', online: 1890, store: 4800 },
];


const Dashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [counts, setCounts] = useState({
    productCount: 0,
    testimonialCount: 0,
    faqCount: 0,
    awardCount: 0,
  });

  // Fetch counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [products, testimonials, faqs, awards] = await Promise.all([
          axios.get('https://api.aruhealths.com/api/api/products/count'),
          axios.get('https://api.aruhealths.com/api/api/testimonials/count'),
          axios.get('https://api.aruhealths.com/api/api/faqs/count'),
          axios.get('https://api.aruhealths.com/api/api/awards/count'),
        ]);

        setCounts({
          productCount: products.data.count,
          testimonialCount: testimonials.data.count,
          faqCount: faqs.data.count,
          awardCount: awards.data.count,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  // Fetch enquiries from API
  useEffect(() => {
    axios.get('https://api.aruhealths.com/api/api/allenquiries')
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching enquiries:', error);
      });
  }, []);

  // Download enquiries as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Name', 'Email', 'Subject', 'Message'];
    const tableRows = [];

    enquiries.forEach((enquiry) => {
      const enquiryData = [enquiry.name, enquiry.email, enquiry.subject, enquiry.message];
      tableRows.push(enquiryData);
    });

    doc.text('Enquiries Report', 14, 15);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('enquiries.pdf');
  };

  return (
    <Container maxWidth="xl" sx={{ padding: '40px' }}>
      {/* Top Metrics Cards */}
      <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
        {[
          { title: 'Total Products', count: counts.productCount, color: '#F76C6C' },
          { title: 'Total Testimonials', count: counts.testimonialCount, color: '#FFB74D' },
          { title: 'Total FAQs', count: counts.faqCount, color: '#42A5F5' },
          { title: 'Total Awards', count: counts.awardCount, color: '#AB47BC' },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: card.color,
                color: '#fff',
                borderRadius: '10px',
              }}
            >
              <Typography variant="h6" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="h4">{card.count}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Sales Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom>
              Daily Sales
            </Typography>
            <LineChart width={500} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="online" stroke="#8884d8" />
              <Line type="monotone" dataKey="store" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Pie Chart - Traffic */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h6" gutterBottom>
              Traffic
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <Box textAlign="center">
              <Typography variant="h6">Traffic for the Day</Typography>
              <Typography variant="body2">40% Facebook, 60% Google</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Enquiries Table */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: '10px' }}>
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Button variant="contained" startIcon={<Add />} color="primary">
                Add
              </Button>
              <Box>
                <IconButton onClick={handleDownloadPDF}>
                  <SaveAlt />
                </IconButton>
                <IconButton>
                  <Settings />
                </IconButton>
                <IconButton>
                  <Notifications />
                </IconButton>
              </Box>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Message</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enquiries.map((enquiry, index) => (
                    <TableRow key={index}>
                      <TableCell>{enquiry.name}</TableCell>
                      <TableCell>{enquiry.email}</TableCell>
                      <TableCell>{enquiry.subject}</TableCell>
                      <TableCell>{enquiry.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

    </Container>
  );
};

export default Dashboard;
