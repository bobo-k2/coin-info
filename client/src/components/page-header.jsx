import React from 'react';
import PropTypes from 'prop-types';
import { Container, Menu, Segment } from 'semantic-ui-react';
import CurrencySelector from './currency-selector';

const PageHeader = ({ onCurrencyChanged, isLoading }) => {
  const handleCurrencyChanged = (c) => {
    onCurrencyChanged(c);
  };

  return (
    <Segment inverted style={{ borderRadius: 0 }}>
      <Menu inverted size="large">
        <Container>
          <Menu.Item
            header
            as="h2"
          >
            CoinInfo
          </Menu.Item>
          <Menu.Item position="right">
            <CurrencySelector onCurrencyChanged={handleCurrencyChanged} isLoading={isLoading} />
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  );
};

PageHeader.propTypes = {
  onCurrencyChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PageHeader;
