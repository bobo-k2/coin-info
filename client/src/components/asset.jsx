import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import { CURRENCY, COLOR_ERROR, COLOR_OK } from '../settings';
import Periods, { periods } from './periods';

const Value = styled.span`
  color: ${(props) => props.color};
  margin-right: 10px;
`;

const Asset = ({ info }) => {
  const defaultPeriod = periods[1];
  const [currentPeriod, setCurrentPeriod] = useState(defaultPeriod);

  const displayAssetValue = (period) => {
    const periodPropertyName = `percent_change_${period}`;
    const value = info.quote[CURRENCY][periodPropertyName];
    const color = value < 0 ? COLOR_ERROR : COLOR_OK;
    const durations = period.split('_');
    const duration = durations[durations.length - 1];

    return (
      <Card.Content>
        <Value color={color}>
          {info.quote[CURRENCY][periodPropertyName]}
          %
        </Value>
        <span>
          [
          {duration}
          ]
        </span>
      </Card.Content>
    );
  };

  const getImageUrl = (assetId) => `https://s2.coinmarketcap.com/static/img/coins/64x64/${assetId}.png`;

  const handlePeriodSelected = (period) => {
    setCurrentPeriod(period);
  };

  return (
    <Card fluid>
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
      [CURRENCY]: PropTypes.shape({
        percent_change_24h: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};

export default Asset;
