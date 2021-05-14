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
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const nextPageStart = () => pagesLoaded * PAGE_SIZE;

  const getData = async () => {
    setIsLoading(true);
    setLastError(null);

    try {
      const url = `/api/listings/?start=${nextPageStart()}&limit=${PAGE_SIZE}&convert=${currency}`;
      const response = await fetch(url);
      const body = await response.json();

      setData(data.concat(body.data));
    } catch (err) {
      setLastError(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [pagesLoaded, currency]);

  useEffect(() => {
    getData();
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
    setData([]);
    setPagesLoaded(1);
  };

  const handleLoadMoreAssets = async () => {
    setPagesLoaded(pagesLoaded + 1);
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
          <Button basic loading={isLoading} onClick={handleLoadMoreAssets}>Load more</Button>
        </Card.Group>
      </Container>
    </>
  );
};

export default HomePage;
