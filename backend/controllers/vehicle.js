import db from "../models";
import { externalApiRequest } from "../utils/externalApi";
import { clear as clearLocationData } from "../utils/random";
import { STATUSES } from "../constants";

const list = (req, res) => {
  const { companyId, status, europe } = req.query;
  const query = {
    include: [db.company]
  };
  if (companyId) {
    query.where = { companyId };
  }

  return (
    db.vehicle
      // Should clear cache when vehicles are modified.
      // Since this is beyond the scope of the project and we are not
      // adding/modifying anything, leaving it like this won't hurt.
      .cache(JSON.stringify(query))
      .findAll(query)
      .then(async vehicles => {
        vehicles = vehicles.map(async vehicle => {
          const { id } = vehicle.dataValues;
          vehicle.dataValues.payload = await externalApiRequest(id, europe);
          return vehicle;
        });

        vehicles = await Promise.all(vehicles);

        if (status) {
          // Since we don't have vehicles' status in db,
          // we need to manually filter it according to response from
          // vehicle "external api" system.
          vehicles = vehicles.filter(
            vehicle => vehicle.dataValues.payload.status === STATUSES[status]
          );
        }

        return res.status(200).send(vehicles);
      })
      .catch(
        error =>
          !console.log("Vehicle :: List :: Error:", error) &&
          res.status(400).send({ error, message: "Can't list vehicles." })
      )
  );
};

const detail = (req, res) => {
  const { europe } = req.query;
  return db.vehicle
    .findByPk(req.params.id, { include: [db.company] })
    .then(async vehicle => {
      if (!vehicle) {
        return res.status(400).send({
          message: `Can't found vehicle identified by id: ${req.params.id}`
        });
      }
      vehicle.dataValues.payload = await externalApiRequest(
        req.params.id,
        europe
      );
      return res.status(200).send(vehicle);
    })
    .catch(
      error =>
        !console.log("Vehicle :: Detail :: Error:", error) &&
        res.status(400).send({
          error,
          message: `Can't get detail of vehicle identified by: ${req.params.id}.`
        })
    );
};

const clear = (req, res) => {
  const { vehicleId: id } = req.query;
  try {
    clearLocationData(id);
    return res.status(204).send();
  } catch (error) {
    console.log("Vehicle :: Clear :: Error:", error);
    return res.status(400).send({
      error,
      message: `Can't clear cache of vehicle ${
        id ? `identified by ${id}` : "locations"
      }`
    });
  }
};

export default { list, detail, clear };
