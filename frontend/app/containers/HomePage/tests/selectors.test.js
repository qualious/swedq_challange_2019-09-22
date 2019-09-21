import {
  makeSelectCompanies,
  makeSelectVehicles,
  makeSelectCompanyId,
  makeSelectPrevCompanyId,
  makeSelectStatus,
  makeSelectPrevStatus,
  makeSelectCompaniesReceivedAt,
  makeSelectVehiclesReceivedAt,
} from "containers/HomePage/selectors";

describe("makeSelectCompanies", () => {
  it("should select companies", () => {
    const companySelector = makeSelectCompanies();
    const companies = [];
    const mockedState = {
      home: {
        companies,
      },
    };
    expect(companySelector(mockedState)).toEqual(companies);
  });
});

describe("makeSelectVehicles", () => {
  it("should select vehicles", () => {
    const vehicleSelector = makeSelectVehicles();
    const vehicles = [];
    const mockedState = {
      home: {
        vehicles,
      },
    };
    expect(vehicleSelector(mockedState)).toEqual(vehicles);
  });
});

describe("makeSelectCompanyId", () => {
  it("should select companyId", () => {
    const companyIdSelector = makeSelectCompanyId();
    const companyId = "companyId";
    const mockedState = {
      home: {
        companyId,
      },
    };
    expect(companyIdSelector(mockedState)).toEqual(companyId);
  });
});

describe("makeSelectPrevCompanyId", () => {
  it("should select prevCompanyId", () => {
    const prevCompanyIdSelector = makeSelectPrevCompanyId();
    const prevCompanyId = "prevCompanyId";
    const mockedState = {
      home: {
        prevCompanyId,
      },
    };
    expect(prevCompanyIdSelector(mockedState)).toEqual(prevCompanyId);
  });
});

describe("makeSelectStatus", () => {
  it("should select status", () => {
    const statusSelector = makeSelectStatus();
    const status = "status";
    const mockedState = {
      home: {
        status,
      },
    };
    expect(statusSelector(mockedState)).toEqual(status);
  });
});

describe("makeSelectPrevStatus", () => {
  it("should select prevStatus", () => {
    const prevStatusSelector = makeSelectPrevStatus();
    const prevStatus = "prevStatus";
    const mockedState = {
      home: {
        prevStatus,
      },
    };
    expect(prevStatusSelector(mockedState)).toEqual(prevStatus);
  });
});

describe("makeSelectCompaniesReceivedAt", () => {
  it("should select companiesReceivedAt", () => {
    const companiesReceivedAtSelector = makeSelectCompaniesReceivedAt();
    const companiesReceivedAt = Date.now();
    const mockedState = {
      home: {
        companiesReceivedAt,
      },
    };
    expect(companiesReceivedAtSelector(mockedState)).toEqual(
      companiesReceivedAt,
    );
  });
});

describe("makeSelectVehiclesReceivedAt", () => {
  it("should select vehiclesReceivedAt", () => {
    const vehiclesReceivedAtSelector = makeSelectVehiclesReceivedAt();
    const vehiclesReceivedAt = Date.now();
    const mockedState = {
      home: {
        vehiclesReceivedAt,
      },
    };
    expect(vehiclesReceivedAtSelector(mockedState)).toEqual(vehiclesReceivedAt);
  });
});
