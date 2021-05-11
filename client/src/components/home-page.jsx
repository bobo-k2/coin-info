import React, { Fragment, useEffect, useState } from 'react';
import { Container, Card } from 'semantic-ui-react';
import PageHeader from './page-header';
import Asset from './asset';

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/listings/?limit=20');
      const body = await response.json();
      setData(body.data);
    }

    getData();
  }, []);

  const renderAssets = () => data && data.map((asset) => <Asset info={asset} key={asset.symbol} />);

  return (
    <>
      <PageHeader />
      <Container>
        <Card.Group>
          {renderAssets()}
        </Card.Group>
      </Container>
    </>
  );
};

export default HomePage;
