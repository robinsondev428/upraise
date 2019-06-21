/**
 *
 * Savings
 *
 */

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/DashboardPage/saga';
import reducer from 'containers/DashboardPage/reducer';
import { FormattedMessage } from 'react-intl';
import {
  getRechartsColorsAction,
  getRechartsDataAction,
  getSavingsAction,
} from 'containers/DashboardPage/actions';
import {
  makeRechartsColorsSelector,
  makeRechartsDataSelector,
  makeSavingsSelector,
} from 'containers/DashboardPage/selectors';

// Import Components
import { PieChart, Pie, Cell } from 'recharts';
import LoadingCircular from 'components/App/LoadingCircular';
import HeavyWidgetWrapper from 'components/App/HeavyWidget/HeavyWidgetWrapper';
import HeavyWidgetLeftSide from 'components/App/HeavyWidget/HeavyWidgetLeftSide';
import HeavyWidgetRightSide from 'components/App/HeavyWidget/HeavyWidgetRightSide';
import HeavyWidgetJoin from 'components/App/HeavyWidget/HeavyWidgetJoin';
import HeavyWidgetHeader from 'components/App/HeavyWidget/HeavyWidgetHeader';
import HeavyWidgetMain from 'components/App/HeavyWidget/HeavyWidgetMain';
import HeavyWidgetUnit from 'components/App/HeavyWidget/HeavyWidgetUnit';
import LoadingWrapper from './LoadingWrapper';
import messages from './messages';

function Savings({
  savings,
  rechartsColors,
  rechartsData,
  getSavings,
  getRechartsColors,
  getRechartsData,
  getRechartsProcent,
}) {
  useInjectSaga({ key: 'dashboardPage', saga });
  useInjectReducer({ key: 'dashboardPage', reducer });
  useEffect(() => {
    getSavings(),
    getRechartsColors();
    getRechartsData();
  }, []);

  return (
    <HeavyWidgetWrapper>
      {rechartsData &&
      rechartsColors &&
      (savings || savings === 0) ? (
          <Fragment>
            <HeavyWidgetLeftSide pie>
              <HeavyWidgetHeader>
                <FormattedMessage {...messages.savings} />
              </HeavyWidgetHeader>
              <HeavyWidgetJoin>
                <HeavyWidgetMain>{savings}</HeavyWidgetMain>{' '}
                <HeavyWidgetUnit>%</HeavyWidgetUnit>
              </HeavyWidgetJoin>
            </HeavyWidgetLeftSide>
            <HeavyWidgetRightSide pie>
              <PieChart width={200} height={200}>
                <Pie
                  data={rechartsData}
                  dataKey="value"
                  cx={100}
                  cy={100}
                  innerRadius={70}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                >
                  {rechartsData.map((entry, index, id) => (
                    <Cell
                      key={id++}
                      fill={rechartsColors[index % rechartsColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </HeavyWidgetRightSide>
          </Fragment>
        ) : (
          <LoadingWrapper>
            <LoadingCircular />
          </LoadingWrapper>
        )}
    </HeavyWidgetWrapper>
  );
}

Savings.propTypes = {
  getSavings: PropTypes.func,
  getRechartsColors: PropTypes.func,
  getRechartsData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  savings: makeSavingsSelector(),
  rechartsColors: makeRechartsColorsSelector(),
  rechartsData: makeRechartsDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSavings: () => dispatch(getSavingsAction()),
    getRechartsColors: () => dispatch(getRechartsColorsAction()),
    getRechartsData: () => dispatch(getRechartsDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Savings);
