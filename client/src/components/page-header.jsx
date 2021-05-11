import React from 'react';
import { Header, Container } from 'semantic-ui-react';

const PageHeader = () => (
  <Header
    as="h2"
    inverted
    style={{
      padding: 20,
      backgroundColor: '#282c34',
    }}
  >
    <Container>
      CoinInfo
    </Container>
  </Header>
);

export default PageHeader;
