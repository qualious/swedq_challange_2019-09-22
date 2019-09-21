import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectHome = state => state.home || initialState;

const makeSelectCompanies = () =>
  createSelector(
    selectHome,
    homeState => homeState.companies,
  );

const makeSelectVehicles = () =>
  createSelector(
    selectHome,
    homeState => homeState.vehicles,
  );

const makeSelectCompanyId = () =>
  createSelector(
    selectHome,
    homeState => homeState.companyId,
  );

const makeSelectPrevCompanyId = () =>
  createSelector(
    selectHome,
    homeState => homeState.prevCompanyId,
  );

const makeSelectStatus = () =>
  createSelector(
    selectHome,
    homeState => homeState.status,
  );

const makeSelectPrevStatus = () =>
  createSelector(
    selectHome,
    homeState => homeState.prevStatus,
  );

const makeSelectCompaniesReceivedAt = () =>
  createSelector(
    selectHome,
    homeState => homeState.companiesReceivedAt,
  );

const makeSelectVehiclesReceivedAt = () =>
  createSelector(
    selectHome,
    homeState => homeState.vehiclesReceivedAt,
  );

export {
  selectHome,
  makeSelectCompanies,
  makeSelectVehicles,
  makeSelectCompanyId,
  makeSelectPrevCompanyId,
  makeSelectStatus,
  makeSelectPrevStatus,
  makeSelectCompaniesReceivedAt,
  makeSelectVehiclesReceivedAt,
};
