import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export const periods = ['1h', '24h', '7d', '30d', '60d'];

const Periods = ({ selectedPeriod, onPeriodSelected }) => {
  const renderButtons = () => periods.map((period) => (
    <Button
      active={period === selectedPeriod}
      key={period}
      onClick={() => onPeriodSelected(period)}
    >
      {period}
    </Button>
  ));

  return (
    <Button.Group size="mini">
      {renderButtons()}
    </Button.Group>
  );
};

Periods.propTypes = {
  selectedPeriod: PropTypes.string.isRequired,
  onPeriodSelected: PropTypes.func.isRequired,
};

export default Periods;
