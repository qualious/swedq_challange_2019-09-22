/* eslint-disable no-console */
import { select, put, fork, takeEvery, all } from "redux-saga/effects";
import request from "../../utils/request";
import {
  receivedCompanies,
  receivedVehicles,
  receivedClearCache,
  requestVehicles,
} from "./actions";
import {
  makeSelectCompanies,
  makeSelectCompaniesReceivedAt,
  makeSelectCompanyId,
  makeSelectStatus,
  makeSelectVehiclesReceivedAt,
  makeSelectPrevCompanyId,
  makeSelectPrevStatus,
} from "./selectors";

import * as Constants from "./constants";

export function* fetchCompanies() {
  const companies = yield select(makeSelectCompanies());
  const receivedAt = yield select(makeSelectCompaniesReceivedAt());
  const isOld = (new Date() - receivedAt) / 60000 > 5;

  if (
    !companies ||
    (companies && companies.size === 0) ||
    !receivedAt ||
    isOld
  ) {
    const json = yield request("GET", "company")
      .then(res => res.json())
      .catch(err => !console.log("error", err) && {});
    yield put(receivedCompanies(json));
  } else {
    yield put(receivedCompanies(companies));
  }
}

export function* fetchVehicles() {
  const companyId = yield select(makeSelectCompanyId());
  const status = yield select(makeSelectStatus());
  const prevCompanyId = yield select(makeSelectPrevCompanyId());
  const prevStatus = yield select(makeSelectPrevStatus());
  const vehiclesReceivedAt = yield select(makeSelectVehiclesReceivedAt());
  const now = Date.now();
  if (
    prevCompanyId === companyId &&
    prevStatus === status &&
    (vehiclesReceivedAt && now - vehiclesReceivedAt < Constants.ONE_MIN - 1000)
  ) {
    console.log("Already have...");
    return;
  }

  const json = yield request(
    "GET",
    `vehicle?companyId=${companyId}&status=${status !== -1 ? status - 1 : ""}`,
  )
    .then(res => res.json())
    .catch(err => !console.log("error", err) && err);
  yield put(receivedVehicles(companyId, status, json, now));
}

export function* clearCache() {
  const response = yield request("DELETE", "vehicle");
  if (response.status === 204) {
    yield put(receivedClearCache());
    const prevCompanyId = yield select(makeSelectPrevCompanyId());
    const prevStatus = yield select(makeSelectPrevStatus());
    yield put(requestVehicles(prevCompanyId, prevStatus));
  }
}

function* watchCompanies() {
  yield takeEvery(Constants.REQUEST_COMPANIES, fetchCompanies);
}

function* watchVehicles() {
  yield takeEvery(Constants.REQUEST_VEHICLES, fetchVehicles);
}

function* watchCache() {
  yield takeEvery(Constants.REQUEST_CLEAR_CACHE, clearCache);
}

export default function* rootSaga() {
  yield all([fork(watchCompanies), fork(watchVehicles), fork(watchCache)]);
}
