import React from "react";
import { render } from "react-testing-library";
import { Provider } from "react-redux";
import { browserHistory } from "react-router-dom";

import { requestVehicles } from "../actions";
import configureStore from "../../../configureStore";
import { Home as HomePage, mapDispatchToProps } from "../index";
// import HomePage from "../index";

describe("<HomePage />", () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it("should render and match the snapshot", () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <HomePage
          onLoad={() => {}}
          onFilter={() => {}}
          onRefresh={() => {}}
          companies={[
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
          ]}
          vehicles={[
            {
              id: "YS2R4X20005399401",
              registrationNumber: "ABC123",
              createdAt: "2019-09-14T11:55:32.555Z",
              updatedAt: "2019-09-14T11:55:32.555Z",
              companyId: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
              company: {
                id: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
                name: "Kellas Grustransporter AB",
                address: "Cementvägen 8, 111 11 Södertälje",
                color: "#899aff",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "YS2R4X20005399401",
                status: "Waiting",
                lat: 49.661887,
                lng: 75.602189,
              },
            },
            {
              id: "VLUR4X20009093588",
              registrationNumber: "DEF456",
              createdAt: "2019-09-14T11:55:32.558Z",
              updatedAt: "2019-09-14T11:55:32.558Z",
              companyId: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
              company: {
                id: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
                name: "Kellas Grustransporter AB",
                address: "Cementvägen 8, 111 11 Södertälje",
                color: "#899aff",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "VLUR4X20009093588",
                status: "En Route",
                lat: 64.302521,
                lng: -86.138733,
              },
            },
            {
              id: "VLUR4X20009048066",
              registrationNumber: "GHI789",
              createdAt: "2019-09-14T11:55:32.559Z",
              updatedAt: "2019-09-14T11:55:32.559Z",
              companyId: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
              company: {
                id: "693ef834-2e77-4e62-9233-cfb53c5e9c3b",
                name: "Kellas Grustransporter AB",
                address: "Cementvägen 8, 111 11 Södertälje",
                color: "#899aff",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "VLUR4X20009048066",
                status: "En Route",
                lat: 48.297878,
                lng: 65.761122,
              },
            },
            {
              id: "YS2R4X20005388011",
              registrationNumber: "JKL012",
              createdAt: "2019-09-14T11:56:17.900Z",
              updatedAt: "2019-09-14T11:56:17.900Z",
              companyId: "abaa5e3c-6081-4a91-9c7b-43ad17065806",
              company: {
                id: "abaa5e3c-6081-4a91-9c7b-43ad17065806",
                name: "Johans Bulk AB",
                address: "Balkvägen 12, 222 22 Stockholm",
                color: "#fa8072",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "YS2R4X20005388011",
                status: "En Route",
                lat: 46.597693,
                lng: 172.294647,
              },
            },
            {
              id: "YS2R4X20005387949",
              registrationNumber: "MNO345",
              createdAt: "2019-09-14T11:56:17.902Z",
              updatedAt: "2019-09-14T11:56:17.902Z",
              companyId: "abaa5e3c-6081-4a91-9c7b-43ad17065806",
              company: {
                id: "abaa5e3c-6081-4a91-9c7b-43ad17065806",
                name: "Johans Bulk AB",
                address: "Balkvägen 12, 222 22 Stockholm",
                color: "#fa8072",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "YS2R4X20005387949",
                status: "En Route",
                lat: 68.861594,
                lng: -11.669709,
              },
            },
            {
              id: "YS2R4X20005387765",
              registrationNumber: "PQR678",
              createdAt: "2019-09-14T11:56:55.136Z",
              updatedAt: "2019-09-14T11:56:55.136Z",
              companyId: "f9f31e69-9e3d-425f-b67f-36b16d450a26",
              company: {
                id: "f9f31e69-9e3d-425f-b67f-36b16d450a26",
                name: "Haralds Värdetransporter AB",
                address: "Budgetvägen 1, 333 33 Uppsala",
                color: "#20b2aa",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "YS2R4X20005387765",
                status: "En Route",
                lat: 11.854733,
                lng: -53.228964,
              },
            },
            {
              id: "YS2R4X20005387055",
              registrationNumber: "STU901",
              createdAt: "2019-09-14T11:56:55.139Z",
              updatedAt: "2019-09-14T11:56:55.139Z",
              companyId: "f9f31e69-9e3d-425f-b67f-36b16d450a26",
              company: {
                id: "f9f31e69-9e3d-425f-b67f-36b16d450a26",
                name: "Haralds Värdetransporter AB",
                address: "Budgetvägen 1, 333 33 Uppsala",
                color: "#20b2aa",
                createdAt: "2019-09-14T11:54:25.000Z",
                updatedAt: "2019-09-14T11:54:25.000Z",
              },
              payload: {
                id: "YS2R4X20005387055",
                status: "Waiting",
                lat: 15.34895,
                lng: 10.111574,
              },
            },
          ]}
          companyId=""
          status={-1}
        />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it("should call onLoad before rendering", () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <HomePage
          onLoad={submitSpy}
          onFilter={() => {}}
          onRefresh={() => {}}
          companies={[]}
          vehicles={[]}
          companyId=""
          status={-1}
        />
      </Provider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  describe("mapDispatchToProps", () => {
    describe("onFilter", () => {
      it("should be injected", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onFilter).toBeDefined();
      });

      it("should dispatch changeUsername when called", () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onFilter();
        expect(dispatch).toHaveBeenCalledWith(requestVehicles());
      });
    });
  });
});
