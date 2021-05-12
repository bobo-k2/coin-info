import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { COLOR_ERROR, COLOR_OK } from '../settings';
import Periods, { periods } from './periods';
import { defaultCurrency } from './currency-selector';

const Value = styled.span`
  color: ${(props) => props.color};
  margin-right: 10px;
`;

let currentCurrency;

const Asset = ({ info, currency }) => {
  const defaultPeriod = periods[1];
  const [currentPeriod, setCurrentPeriod] = useState(defaultPeriod);
  currentCurrency = currency || defaultCurrency.value;

  const displayAssetValue = (period) => {
    const periodPropertyName = `percent_change_${period}`;
    const value = info.quote[currentCurrency] && info.quote[currentCurrency][periodPropertyName];
    const color = value < 0 ? COLOR_ERROR : COLOR_OK;
    const durations = period.split('_');
    const duration = durations[durations.length - 1];

    if (value) {
      return (
        <>
          <Card.Description>
            {Math.round(info.quote[currentCurrency].price * 100) / 100}
            {' '}
            {currency}
          </Card.Description>
          <Card.Description>
            <Value color={color}>
              {Math.round(info.quote[currentCurrency][periodPropertyName] * 100) / 100}
              %
            </Value>
            <span>
              [
              {duration}
              ]
            </span>
          </Card.Description>
        </>
      );
    }

    return (
      <>
        <Card.Description>
          <span>&nbsp;</span>
        </Card.Description>
        <Card.Description>
          <span>&nbsp;</span>
        </Card.Description>
      </>
    );
  };

  const getImageUrl = (assetId) => `https://s2.coinmarketcap.com/static/img/coins/32x32/${assetId}.png`;

  const handlePeriodSelected = (period) => {
    setCurrentPeriod(period);
  };

  return (
    <Card>
      <Card.Content>
        <Image
          floated="left"
          src={getImageUrl(info.id)}
        />
        <Card.Header>{info.name}</Card.Header>
        <Card.Meta>{info.symbol}</Card.Meta>
        {displayAssetValue(currentPeriod)}
      </Card.Content>
      <Card.Content extra textAlign="right">
        <Periods selectedPeriod={currentPeriod} onPeriodSelected={handlePeriodSelected} />
      </Card.Content>
    </Card>
  );
};

Asset.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    quote: PropTypes.shape({
      [currentCurrency]: PropTypes.shape({
        percent_change_24h: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
  currency: PropTypes.string.isRequired,
};

export default Asset;
