import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const currencies = [
  {
    key: 'USD',
    text: 'USD',
    value: 'USD',
    icon: 'usd',
  },
  {
    key: 'EUR',
    text: 'EUR',
    value: 'EUR',
    icon: 'euro',
  },
  {
    key: 'HRK',
    text: 'HRK',
    value: 'HRK',
  },
];

export const defaultCurrency = currencies[0];

const CurrencySelector = ({ onCurrencyChanged, isLoading }) => (
  <Dropdown
    placeholder="Select currency"
    selection
    loading={isLoading}
    options={currencies}
    defaultValue={defaultCurrency.value}
    onChange={(e, { value }) => onCurrencyChanged(value)}
  />
);

CurrencySelector.propTypes = {
  onCurrencyChanged: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CurrencySelector;
