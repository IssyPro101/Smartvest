import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

const slotMap = {
  "AVAX": "avalanche-2",
  "BTC": "bitcoin",
  "DOGE": "dogecoin",
  "ETH": "ethereum"
}

function formatDate(epochTimestamp) {
  // Convert epoch timestamp to milliseconds
  var date = new Date(epochTimestamp * 1000);
  
  // Get the day of the month
  var dayOfMonth = date.getDate();

  // Get the month name
  var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var monthName = monthNames[date.getMonth()];

  // Return the formatted date
  return dayOfMonth + " " + monthName;
}

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

const PriceChart = ({ slot, series }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: series[slotMap[slot]].map((dp) => formatDate(parseInt(dp[0]) / 1000)),
        axisBorder: {
          show: true,
          color: line
        },
        labels: {
          rotate: 360
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  console.log(slot);
  console.log(slotMap[slot])
  console.log(series[slotMap[slot]]);

  return <ReactApexChart options={options} series={ [{name: "Price", data: series[slotMap[slot]].map((dp) => dp[1])}] } type="line" height={450} />;
};

PriceChart.propTypes = {
  slot: PropTypes.string
};

export default PriceChart;
