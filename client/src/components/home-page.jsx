import React, { Fragment, useEffect, useState } from 'react';
import {
  Container, Card, Message, Button,
} from 'semantic-ui-react';
import PageHeader from './page-header';
import Asset from './asset';
import { defaultCurrency } from './currency-selector';

const PAGE_SIZE = 12;

const HomePage = () => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState(defaultCurrency.value);
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState(null);
  const [pagesLoaded] = useState(1);

  const getData = async (c) => {
    setIsLoading(true);
    setLastError(null);

    try {
      const response = await fetch(`/api/listings/?start=${pagesLoaded * PAGE_SIZE}&limit=${PAGE_SIZE}&convert=${c}`);
      const body = await response.json();
      setData(body.data);
    } catch (err) {
      setLastError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData(currency);
  }, []);

  const renderAssets = () => data.map(
    (asset) => (
      <Asset
        info={asset}
        key={asset.symbol}
        currency={currency}
      />
    ),
  );

  const handleCurrencyChanged = async (c) => {
    setCurrency(c);
    await getData(c);
  };

  return (
    <>
      <PageHeader onCurrencyChanged={handleCurrencyChanged} isLoading={isLoading} />
      <Container>
        <Message negative hidden={lastError === null}>
          <Message.Header>An error occured while fetching data from the server.</Message.Header>
          <p>{lastError && lastError.message}</p>
        </Message>
        <Card.Group centered>
          {renderAssets()}
        </Card.Group>
        <Card.Group centered>
          <Button basic loading={isLoading}>Load more</Button>
        </Card.Group>
      </Container>
    </>
  );
};

export default HomePage;
