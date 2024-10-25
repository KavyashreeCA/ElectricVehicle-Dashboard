import React from 'react'
import { Container } from '@mui/material'
import Header from './components/Header';
import MetricsOverview from './components/MetricsOverview';
import Filters from './components/Filters';
import Visualizations from './components/Visualizations';
import Datatable from './components/Datatable';


const App = () => {
  return (
    <Container>
      <Header/>
      <Datatable/>
    </Container>  
    )
}

export default App