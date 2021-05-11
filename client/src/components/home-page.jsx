import React, { Fragment, useEffect, useState } from 'react';
import { Container, Card } from 'semantic-ui-react';
import PageHeader from './page-header';
import Asset from './asset';
import { defaultCurrency } from './currency-selector';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [currency, setCurrency] = useState(defaultCurrency.value);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (c) => {
    setIsLoading(true);
    const response = await fetch(`/api/listings/?start=1&limit=10&convert=${c}`);
    const body = await response.json();
    setIsLoading(false);
    setData(body.data);
  };

  useEffect(() => {
    getData(currency);
  }, []);

  const renderAssets = () => data && data.map(
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
        <Card.Group>
          {renderAssets()}
        </Card.Group>
      </Container>
    </>
  );
};

export default HomePage;
