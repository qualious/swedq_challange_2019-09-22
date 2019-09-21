import db from "../models";

const list = (req, res) => {
  return (
    db.company
      // Should clear cache when companies are modified.
      // Since this is beyond the scope of the project and we are not
      // adding/modifying anything, leaving it like this won't hurt.
      .cache("company-cache")
      .findAll()
      .then(companies => res.status(200).send(companies))
      .catch(
        error =>
          !console.log("Company :: List :: Error:", error) &&
          res.status(400).send({ error, message: "Can't list companies." })
      )
  );
};

const detail = (req, res) => {
  return db.company
    .findByPk(req.params.id, { include: [db.vehicle] })
    .then(company => res.status(200).send(company))
    .catch(
      error =>
        !console.log("Company :: Detail :: Error:", error) &&
        res.status(400).send({
          error,
          message: `Can't get detail of company identified by: ${req.params.id}.`
        })
    );
};

export default { list, detail };
