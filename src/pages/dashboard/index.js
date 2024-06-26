import { useEffect, useState } from 'react';
import 'react-chatbot-kit/build/main.css';
import './styles/override-bot.css';
import { faker } from '@faker-js/faker';
import { fetchCryptoData, fetchCryptoChartData, fetchCryptoNews, fetchYieldRates } from 'utils/cryptodata';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import OrdersTable from "../dashboard/OrdersTable";
import { Popover } from 'antd';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Fab from '@mui/material/Fab';
import Parser from "html-react-parser";

// material-ui
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography
} from '@mui/material';

// project import
import PriceChart from './PriceChart';
import MainCard from 'components/MainCard';
import CryptoPrice from 'components/cards/statistics/CryptoPrice';
import Chatbot from "react-chatbot-kit";
import AppNewsUpdate from './AppNewsUpdate';

import { MessageParser, ActionProvider } from "../../utils/chatbot.js";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('BTC');
  const [cryptoPrices, setCryptoPrices] = useState(null);
  const [cryptoChartPrices, setCryptoChartPrices] = useState(null);
  const [cryptoNews, setCryptoNews] = useState(null);
  const [cryptoYields, setCryptoYields] = useState(null);
  const [coins, setCoins] = useState(["bitcoin", "ethereum", "avalanche-2", "dogecoin"]);

  setCoins;

  const [open, setOpen] = useState(false);

  // const hide = () => {
  //   setOpen(false);
  // };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {

    const loadCryptoData = async () => {
      const data = await fetchCryptoData(coins);

      setCryptoPrices(data);
    }

    const loadCryptoChartData = async () => {
      const data = await fetchCryptoChartData(coins);

      setCryptoChartPrices(data);

      console.log(data);

    }

    const loadCryptoNews = async () => {
      const data = await fetchCryptoNews();
      setCryptoNews(data);

    }

    const loadCryptoYields = async () => {
      const data = await fetchYieldRates();
      setCryptoYields(data);

    }

    loadCryptoData();
    loadCryptoChartData();
    loadCryptoNews();
    loadCryptoYields();

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
            return (<Grid key={key} item xs={12} sm={6} md={4} lg={3}>
              <CryptoPrice image={cryptoPrice.image.large} title={cryptoPrice.name} count={cryptoPrice.market_data.current_price.usd} percentage={cryptoPrice.market_data.price_change_percentage_24h} isLoss={cryptoPrice.market_data.price_change_percentage_24h < 0} color={cryptoPrice.market_data.price_change_percentage_24h < 0 ? "error" : "success"} />
            </Grid>);
          }) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      }

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Charts</Typography>
          </Grid>
          {cryptoPrices && <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              {
                cryptoPrices.map((price, key) => {
                  console.log(price);
                  return (<Button
                    size="small"
                    onClick={() => setSlot(price.symbol.toUpperCase())}
                    color={slot === price.symbol.toUpperCase() ? 'primary' : 'secondary'}
                    variant={slot === price.symbol.toUpperCase() ? 'outlined' : 'text'}
                    key={key}
                  >
                    {price.symbol.toUpperCase()}
                  </Button>);
                })
              }
            </Stack>
          </Grid>}
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Typography variant="h5" sx={{ ml: 1.5 }}>{slot}</Typography>
            {cryptoChartPrices ? <PriceChart slot={slot} series={cryptoChartPrices} /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
          </Box>
        </MainCard>
      </Grid>


      {/* row 3 */}


      {/* row 4 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">USDC Yield Rates</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {cryptoYields ? <OrdersTable yields={cryptoYields} /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
        </MainCard>
      </Grid>

      <Grid item md={12}>
        {cryptoNews ? <AppNewsUpdate
          title="Latest News"
          list={cryptoNews.map((data) => ({
            id: faker.string.uuid(),
            title: data.title,
            description: Parser(data.metadata.description),
            image: data.metadata.image,
            postedAt: data.createdAt,
            link: data.url
          }))}
        /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
      </Grid>

      <Popover
        content={
          <MainCard sx={{ mt: 2, width: "60vh"}} lg={15}>
            {cryptoChartPrices && cryptoNews && cryptoYields ? <Chatbot
              config={{
                initialMessages: [],
                state: {
                  context: {
                    bitcoinPrice: cryptoChartPrices["bitcoin"],
                    ethereumPrice: cryptoChartPrices["ethereum"],
                    avaxPrice: cryptoChartPrices["avalanche-2"],
                    dogePrice: cryptoChartPrices["dogecoin"],
                    news: cryptoNews,
                    yields: cryptoYields
                  }
                }
              }}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="Chat with Smartvest's Copilot"
            /> : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
          </MainCard>}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
        style={{width: "1000px"}}
      >

        <Fab color="primary" aria-label="add" sx={{ position: "fixed", bottom: "0%", right: "0%", mb: "4px", mr: "4px" }}>
          <SmartToyIcon />
        </Fab>
      </Popover>
    </Grid>
  );
};

export default DashboardDefault;
