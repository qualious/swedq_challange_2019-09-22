import produce from "immer";
import * as Constants from "./constants";

export const initialState = {
  companies: [],
  vehicles: [],
  loading: false,
  cacheLoading: false,
  companyId: "",
  prevCompanyId: "-",
  status: -1,
  prevStatus: -2,
  companiesReceivedAt: null,
  vehiclesReceivedAt: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.REQUEST_COMPANIES:
        draft.loading = true;
        break;
      case Constants.RECEIVED_COMPANIES:
        draft.loading = false;
        draft.companies = action.companies;
        draft.companiesReceivedAt = action.receivedAt;
        break;
      case Constants.REQUEST_VEHICLES: {
        draft.loading = true;
        draft.companyId = action.companyId || "";
        draft.status = action.status || -1;
        break;
      }
      case Constants.RECEIVED_VEHICLES:
        draft.loading = false;
        draft.prevStatus = action.status;
        draft.prevCompanyId = action.companyId;
        draft.vehicles = action.vehicles;
        draft.vehiclesReceivedAt = action.receivedAt;
        break;
      case Constants.REQUEST_CLEAR_CACHE:
        draft.cacheLoading = true;
        break;
      case Constants.RECEIVED_CLEAR_CACHE:
        draft.cacheLoading = false;
        draft.vehiclesReceivedAt = null;
        break;
    }
  });

export default homeReducer;
