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
            style={{
              textAlign: 'left',
              paddingLeft: 0,
            }}
          >
            CoinInfo
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <CurrencySelector onCurrencyChanged={handleCurrencyChanged} isLoading={isLoading} />
            </Menu.Item>
          </Menu.Menu>
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
