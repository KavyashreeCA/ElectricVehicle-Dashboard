const MetricsOverview = ({ totalEVs, avgRange, commonMake }) => {
    return (
      <div>
        <h2>Metrics Overview</h2>
        <p>Total Electric Vehicles: {totalEVs}</p>
        <p>Average Electric Range: {avgRange ? avgRange.toFixed(2) : 'N/A'} miles</p>
        <p>Most Common Make: {commonMake || 'N/A'}</p>
      </div>
    );
  };
export default MetricsOverview;  