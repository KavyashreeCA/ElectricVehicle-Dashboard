import React, { useEffect, useState } from 'react';
import Visualizations from './Visualizations';
import Filters from './Filters'; 
import MetricsOverview from './MetricsOverview'; 

const ITEMS_PER_PAGE = 100; // Number of items to display per page

const Datatable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        const parsedData = parseCSV(text);
        console.log('Parsed Data:', parsedData);
        setData(parsedData);
        setFilteredData(parsedData); // Initialize filtered data
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (text) => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      if (values.length === headers.length) {
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] || '';
          return obj;
        }, {});
      } else {
        console.warn('Skipping line due to mismatch:', line);
        return null;
      }
    }).filter(item => item !== null);
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item => item["VIN (1-10)"].toLowerCase().includes(lowerCaseTerm));
    setFilteredData(filtered); // Update the filtered data
    setCurrentPage(0); // Reset to the first page after filtering
  };

  // Calculate metrics from filtered data
  const totalEVs = filteredData.length;
  const avgRange = totalEVs > 0 ? filteredData.reduce((acc, curr) => acc + parseFloat(curr["Electric Range"] || 0), 0) / totalEVs : 0;
  const commonMake = totalEVs > 0 ? filteredData.reduce((acc, curr) => {
    acc[curr.Make] = (acc[curr.Make] || 0) + 1;
    return acc;
  }, {}) : {};

  const mostCommonMake = totalEVs > 0 ? Object.keys(commonMake).reduce((a, b) => commonMake[a] > commonMake[b] ? a : b) : '';

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <Filters onSearch={handleSearch} /> {/* Include the Filters component */}
      <MetricsOverview totalEVs={totalEVs} avgRange={avgRange} commonMake={mostCommonMake} /> {/* Metrics Overview */}
      <Visualizations data={filteredData} /> {/* Visualizations with filtered data */}

      <div style={{ overflowY: 'auto', height: '400px', border: '1px solid #ddd' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={headerRowStyle}>
              <th style={headerCellStyle}>VIN (1-10)</th>
              <th style={headerCellStyle}>County</th>
              <th style={headerCellStyle}>City</th>
              <th style={headerCellStyle}>State</th>
              <th style={headerCellStyle}>Postal Code</th>
              <th style={headerCellStyle}>Model Year</th>
              <th style={headerCellStyle}>Make</th>
              <th style={headerCellStyle}>Model</th>
              <th style={headerCellStyle}>Electric Vehicle Type</th>
              <th style={headerCellStyle}>Clean Alternative Fuel Vehicle (CAFV) Eligibility</th>
              <th style={headerCellStyle}>Electric Range</th>
              <th style={headerCellStyle}>Base MSRP</th>
              <th style={headerCellStyle}>Legislative District</th>
              <th style={headerCellStyle}>DOL Vehicle ID</th>
              <th style={headerCellStyle}>Vehicle Location</th>
              <th style={headerCellStyle}>Electric Utility</th>
              <th style={headerCellStyle}>2020 Census Tract</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} style={tableRowStyle}>
                <td style={tableCellStyle}>{item["VIN (1-10)"]}</td>
                <td style={tableCellStyle}>{item.County}</td>
                <td style={tableCellStyle}>{item.City}</td>
                <td style={tableCellStyle}>{item.State}</td>
                <td style={tableCellStyle}>{item["Postal Code"]}</td>
                <td style={tableCellStyle}>{item["Model Year"]}</td>
                <td style={tableCellStyle}>{item.Make}</td>
                <td style={tableCellStyle}>{item.Model}</td>
                <td style={tableCellStyle}>{item["Electric Vehicle Type"]}</td>
                <td style={tableCellStyle}>{item["Clean Alternative Fuel Vehicle (CAFV) Eligibility"]}</td>
                <td style={tableCellStyle}>{item["Electric Range"]}</td>
                <td style={tableCellStyle}>{item["Base MSRP"]}</td>
                <td style={tableCellStyle}>{item["Legislative District"]}</td>
                <td style={tableCellStyle}>{item["DOL Vehicle ID"]}</td>
                <td style={tableCellStyle}>{item["Vehicle Location"]}</td>
                <td style={tableCellStyle}>{item["Electric Utility"]}</td>
                <td style={tableCellStyle}>{item["2020 Census Tract"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= filteredData.length}>Next</button>
      </div>
    </div>
  );
};

// Add your styles here
const headerRowStyle = {
  backgroundColor: '#f2f2f2',
  borderBottom: '2px solid #ddd',
  height: '40px',
};

const headerCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
  height: '40px',
  backgroundColor: '#fff',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default Datatable;
