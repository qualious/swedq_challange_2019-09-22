import { put, select } from "redux-saga/effects";

import {
  makeSelectCompanies,
  makeSelectCompaniesReceivedAt,
} from "../selectors";

import { receivedCompanies } from "../actions";

import rootSaga, { fetchCompanies } from "../saga";

/* eslint-disable redux-saga/yield-effects */
describe("fetchCompanies Saga", () => {
  const companies = [
    {
      id: "abaa5e3c-6081-4a91-9c7b-43ad17065806",
      name: "Johans Bulk AB",
      address: "Balkvägen 12, 222 22 Stockholm",
      color: "#fa8072",
      updatedAt: "2019-09-14T11:54:25.000Z",
      createdAt: "2019-09-14T11:54:25.000Z",
    },
    {
      id: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
      name: "Kellas Grustransporter AB",
      address: "Cementvägen 8, 111 11 Södertälje",
      color: "#899aff",
      updatedAt: "2019-09-14T11:54:25.000Z",
      createdAt: "2019-09-14T11:54:25.000Z",
    },
    {
      id: "f9f31e69-9e3d-425f-b67f-36b16d450a26",
      name: "Haralds Värdetransporter AB",
      address: "Budgetvägen 1, 333 33 Uppsala",
      color: "#20b2aa",
      updatedAt: "2019-09-14T11:54:25.000Z",
      createdAt: "2019-09-14T11:54:25.000Z",
    },
  ];
  let fetchCompaniesGenerator;

  beforeEach(() => {
    fetchCompaniesGenerator = fetchCompanies();

    const yieldedCompanies = fetchCompaniesGenerator.next().value;
    expect(JSON.stringify(yieldedCompanies)).toEqual(
      JSON.stringify(select(makeSelectCompanies())),
    );

    const receivedAt = fetchCompaniesGenerator.next().value;
    expect(JSON.stringify(receivedAt)).toEqual(
      JSON.stringify(select(makeSelectCompaniesReceivedAt())),
    );
  });

  it("should dispatch the receivedCompanies action if it requests the data successfully", () => {
    const json = fetchCompaniesGenerator.next().value;
    expect(JSON.stringify(json)).toEqual(JSON.stringify({}));

    const now = Date.now();
    const putDescriptor = fetchCompaniesGenerator.next(companies, now).value;
    // putDescriptor.receivedAt = null;
    expect(putDescriptor).toEqual(put(receivedCompanies(companies, now)));
  });
});

describe("root Saga", () => {
  const root = rootSaga();

  it("should start task to watch for REQUEST_COMPANIES, REQUEST_VEHICLES, REQUEST_CLEAR_CACHE action", () => {
    const takeEveryDescriptor = root.next().value;
    expect(JSON.stringify(takeEveryDescriptor)).toEqual(
      '{"@@redux-saga/IO":true,"combinator":true,"type":"ALL","payload":[{"@@redux-saga/IO":true,"combinator":false,"type":"FORK","payload":{"context":null,"args":[]}},{"@@redux-saga/IO":true,"combinator":false,"type":"FORK","payload":{"context":null,"args":[]}},{"@@redux-saga/IO":true,"combinator":false,"type":"FORK","payload":{"context":null,"args":[]}}]}',
    );
  });
});
