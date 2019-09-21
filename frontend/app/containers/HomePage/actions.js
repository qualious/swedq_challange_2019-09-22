import * as Constants from "./constants";

export const requestCompanies = () => ({
  type: Constants.REQUEST_COMPANIES,
  loading: true,
});

export const receivedCompanies = (companies, receivedAt = Date.now()) => ({
  type: Constants.RECEIVED_COMPANIES,
  loading: false,
  receivedAt,
  companies,
});

export const requestVehicles = (companyId, status) => ({
  type: Constants.REQUEST_VEHICLES,
  loading: true,
  companyId,
  status,
});

export const receivedVehicles = (companyId, status, vehicles, receivedAt) => ({
  type: Constants.RECEIVED_VEHICLES,
  loading: false,
  receivedAt,
  companyId,
  status,
  vehicles,
});

export const requestClearCache = () => ({
  type: Constants.REQUEST_CLEAR_CACHE,
});

export const receivedClearCache = () => ({
  type: Constants.RECEIVED_CLEAR_CACHE,
});
