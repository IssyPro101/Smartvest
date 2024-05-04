import { useEffect, useState } from 'react';
import 'react-chatbot-kit/build/main.css';
import './styles/override-bot.css';
import { faker } from '@faker-js/faker';
import { fetchCryptoData, fetchCryptoChartData, fetchCryptoNews } from 'utils/cryptodata';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

// material-ui
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import PriceChart from './PriceChart';
import MainCard from 'components/MainCard';
import CryptoPrice from 'components/cards/statistics/CryptoPrice';
import Chatbot from "react-chatbot-kit";
import AppNewsUpdate from './AppNewsUpdate';

import { config, MessageParser, ActionProvider } from "../../utils/chatbot.js";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('week');
  const [cryptoPrices, setCryptoPrices] = useState(null);
  const [cryptoChartPrices, setCryptoChartPrices] = useState(null);
  const [cryptoNews, setCryptoNews] = useState(null);

  useEffect(() => {

    const loadCryptoData = async () => {
      const data = await fetchCryptoData(["bitcoin", "ethereum", "avalanche-2", "dogecoin"]);
      setCryptoPrices(data);
    }

    const loadCryptoChartData = async () => {
      const data = await fetchCryptoChartData(["bitcoin", "ethereum", "avalanche-2", "dogecoin"]);
      setCryptoChartPrices(data);
    }

    const loadCryptoNews = async () => {
      const data = await fetchCryptoNews();
      setCryptoNews(data);

    }

    loadCryptoData();
    loadCryptoChartData();
    loadCryptoNews();

  }, [])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      {
        cryptoPrices ?
          cryptoPrices.map((cryptoPrice, key) => {
            console.log(cryptoPrice.market_data.current_price.usd);
            console.log(cryptoPrice.price_change_percentage_24h);
            return (<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
              <CryptoPrice title={cryptoPrice.name} count={cryptoPrice.market_data.current_price.usd} percentage={cryptoPrice.market_data.price_change_percentage_24h} isLoss={cryptoPrice.market_data.price_change_percentage_24h < 0} color={cryptoPrice.market_data.price_change_percentage_24h < 0 ? "error" : "success"}/>
            </Grid>);
          }) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
     }

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Bitcoin Chart</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            {cryptoChartPrices ? <PriceChart slot={slot} series={cryptoChartPrices}/> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
          </Box>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={7} lg={4}>
        {cryptoNews ? <AppNewsUpdate
          title="News Update"
          list={cryptoNews.map((data) => ({
            id: faker.string.uuid(),
            title: data.title,
            description: data.text,
            image: data.image_url,
            postedAt: data.date,
            link: data.news_url
          }))}
        /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>



      {/* row 4 */}
      <Grid item xs={12} md={5} lg={4}>
        <MainCard sx={{ mt: 2 }}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
