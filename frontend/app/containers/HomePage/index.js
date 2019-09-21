import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";

import { adjustStatusColor } from "../../utils/status";
import { MAP_STYLES, ONE_MIN } from "./constants";
import {
  requestClearCache,
  requestCompanies,
  requestVehicles,
} from "./actions";
import {
  makeSelectCompanies,
  makeSelectVehicles,
  makeSelectCompanyId,
  makeSelectStatus,
} from "./selectors";

import reducer from "./reducer";
import saga from "./saga";

import { HamburgerMenu, Map } from "../../components";

const key = "home";
let interval = 0;

export const Home = ({
  onLoad,
  onFilter,
  onRefresh,
  companies,
  vehicles,
  companyId,
  status,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (!interval || companies.length === 0) {
      onLoad();
    }

    // Vehicles ping every 1 minute
    interval = setInterval(() => onFilter(companyId, status), ONE_MIN);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [companyId, status]);

  const selectedCompany = companies.find(company => company.id === companyId);
  return (
    <>
      <div>
        <Helmet>
          <title>Vehicle Tracker</title>
          <meta name="description" content="SwedQ project" />
        </Helmet>
      </div>
      <HamburgerMenu
        onRefreshClicked={onRefresh}
        companyOptions={companies.map(({ id, name, color }) => ({
          value: id,
          label: name,
          color,
        }))}
        companyId={companyId}
        onCompanyChanged={selected =>
          onFilter(selected ? selected.value : "", status)
        }
        statusId={status}
        statusOptions={adjustStatusColor(selectedCompany)}
        onStatusChanged={selected =>
          onFilter(companyId, selected ? selected.value : -1)
        }
      />
      <Map vehicles={vehicles} styles={MAP_STYLES} />
    </>
  );
};

Home.propTypes = {
  onLoad: PropTypes.func,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func,
  companies: PropTypes.array,
  vehicles: PropTypes.array,
  companyId: PropTypes.string,
  status: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  companies: makeSelectCompanies(),
  vehicles: makeSelectVehicles(),
  companyId: makeSelectCompanyId(),
  status: makeSelectStatus(),
});

export const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(requestCompanies());
    dispatch(requestVehicles());
  },
  onFilter: (companyId, status) => dispatch(requestVehicles(companyId, status)),
  onRefresh: () => dispatch(requestClearCache()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
