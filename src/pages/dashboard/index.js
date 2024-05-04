import { useEffect, useState } from 'react';
import 'react-chatbot-kit/build/main.css';
import './styles/override-bot.css';
import { faker } from '@faker-js/faker';
import { fetchCryptoData } from 'utils/cryptodata';
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
import IncomeAreaChart from './IncomeAreaChart';
import MainCard from 'components/MainCard';
import CryptoPrice from 'components/cards/statistics/CryptoPrice';
import Chatbot from "react-chatbot-kit";
import AppNewsUpdate from './AppNewsUpdate';

import { config, MessageParser, ActionProvider } from "../../utils/chatbot.js";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('week');
  const [cryptoPrices, setCryptoPrices] = useState(null);

  useEffect(() => {

    const loadCryptoData = async () => {
      const data = await fetchCryptoData(["bitcoin", "ethereum", "avalanche-2", "tron"]);
      setCryptoPrices(data);
    }


    loadCryptoData();

  }, [])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {cryptoPrices ? <CryptoPrice title="Bitcoin" count={cryptoPrices.data['bitcoin'].usd} percentage={59.3} /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {cryptoPrices ? <CryptoPrice title="Ethereum" count={cryptoPrices.data['ethereum'].usd} percentage={70.5} /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {cryptoPrices ? <CryptoPrice title="Avalanche" count={cryptoPrices.data['avalanche-2'].usd} percentage={27.4} isLoss color="warning" /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        {cryptoPrices ? <CryptoPrice title="Tron" count={cryptoPrices.data['tron'].usd} percentage={27.4} isLoss color="warning" /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
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
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>

      <Grid item xs={12} md={7} lg={4}>
        <AppNewsUpdate
          title="News Update"
          list={[...Array(5)].map((_, index) => ({
            id: faker.string.uuid(),
            title: faker.person.jobTitle(),
            description: faker.commerce.productDescription(),
            image: `/assets/images/covers/cover_${index + 1}.jpg`,
            postedAt: faker.date.recent(),
          }))}
        />
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
