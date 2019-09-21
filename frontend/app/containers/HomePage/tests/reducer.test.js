import produce from "immer";

import homeReducer, { initialState } from "../reducer";
import {
  requestCompanies,
  receivedCompanies,
  requestVehicles,
  receivedVehicles,
  requestClearCache,
  receivedClearCache,
} from "../actions";

/* eslint-disable default-case, no-param-reassign */
describe("homeReducer", () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it("should return the initial state", () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it("should handle the requestCompanies action correctly", () => {
    const expectedResult = produce(state, draft => {
      draft.companies = [];
      draft.loading = true;
    });

    expect(homeReducer(state, requestCompanies())).toEqual(expectedResult);
  });

  it("should handle the receivedCompanies action correctly", () => {
    const now = Date.now();
    const expectedResult = produce(state, draft => {
      draft.companies = [];
      draft.loading = false;
      draft.companiesReceivedAt = now;
    });

    expect(homeReducer(state, receivedCompanies([], now))).toEqual(
      expectedResult,
    );
  });

  it("should handle the requestVehicles action correctly", () => {
    const expectedResult = produce(state, draft => {
      draft.companyId = "companyId";
      draft.status = 5;
      draft.loading = true;
    });

    expect(homeReducer(state, requestVehicles("companyId", 5))).toEqual(
      expectedResult,
    );
  });

  it("should handle the receivedVehicles action correctly", () => {
    const now = Date.now();
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.prevCompanyId = "companyId";
      draft.prevStatus = 5;
      draft.vehicles = [];
      draft.vehiclesReceivedAt = now;
    });

    expect(
      homeReducer(state, receivedVehicles("companyId", 5, [], now)),
    ).toEqual(expectedResult);
  });

  it("should handle the requestClearCache action correctly", () => {
    const expectedResult = produce(state, draft => {
      draft.cacheLoading = true;
    });

    expect(homeReducer(state, requestClearCache())).toEqual(expectedResult);
  });

  it("should handle the receivedClearCache action correctly", () => {
    const expectedResult = produce(state, draft => {
      draft.cacheLoading = false;
    });
    expect(homeReducer(state, receivedClearCache())).toEqual(expectedResult);
  });
});
