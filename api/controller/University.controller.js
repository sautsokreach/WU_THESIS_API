import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllUniversity = (req, res) => {
  db.query("SELECT * FROM university", (err, data) => {
    res.json(data.rows);
  });
};

const getOneUniversity = (req, res) => {
  const id = req.params.id;
  const queryGetOneDepartment =
    "Select * from university where university_id = $1";

  db.query(queryGetOneDepartment, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("University Not Found!");
    }
  });
};

const createUniversity = (req, res) => {
  const getUniversityNameEN = req.body.name_en;
  const getUniversityNameKH = req.body.name_kh;
  const getUniversityLocation = req.body.location;
  const getUniversityWebsite = req.body.website;
  const getUniversityLogo = req.body.logo;

  if (isEmpty(getUniversityNameKH)) {
    return res.json("Please Fill University Khmer Name");
  }
  if (isEmpty(getUniversityNameEN)) {
    return res.json("Please Fill University English Name");
  }
  if (isEmpty(getUniversityLocation)) {
    return res.json("Please Input University Location");
  }
  if (isEmpty(getUniversityWebsite)) {
    return res.json("Please Input University Website");
  }
  if (isEmpty(getUniversityLogo)) {
    return res.json("Please Input University Logo");
  }

  const queryCreateUniversity =
    "INSERT INTO university (name_en , name_kh,location,website,logo) VALUES ($1,$2,$3,$4,$5)";

  db.query(
    queryCreateUniversity,
    [
      getUniversityNameEN,
      getUniversityNameKH,
      getUniversityLocation,
      getUniversityWebsite,
      getUniversityLogo,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("University Has Been Created!");
    }
  );
};

const editUniversity = (req, res) => {
  const getIdUniversity = req.params.id;
  const getUniversityNameEN = req.body.name_en;
  const getUniversityNameKH = req.body.name_kh;
  const getUniversityLocation = req.body.location;
  const getUniversityWebsite = req.body.website;
  const getUniversityLogo = req.body.logo;

  if (isEmpty(getUniversityNameKH)) {
    return res.json("Please Fill University Khmer Name");
  }
  if (isEmpty(getUniversityNameEN)) {
    return res.json("Please Fill University English Name");
  }
  if (isEmpty(getUniversityLocation)) {
    return res.json("Please Input University Location");
  }
  if (isEmpty(getUniversityWebsite)) {
    return res.json("Please Input University Website");
  }
  if (isEmpty(getUniversityLogo)) {
    return res.json("Please Input University Logo");
  }

  const queryEditUniversity =
    "update university set name_en = $1, name_kh = $2 ,location = $3 ,website = $4 ,logo =$5 WHERE university_id = $6";

  db.query(
    queryEditUniversity,
    [
      getUniversityNameEN,
      getUniversityNameKH,
      getUniversityLocation,
      getUniversityWebsite,
      getUniversityLogo,
      getIdUniversity,
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("University Has Been Edited!");
    }
  );
};

const deleteUniversity = (req, res) => {
  const getIdUniversity = req.params.id;

  db.query(
    "Delete from university where university_id = $1",
    [getIdUniversity],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("University Has Been Deleted!");
    }
  );
};
export {
  getAllUniversity,
  getOneUniversity,
  createUniversity,
  editUniversity,
  deleteUniversity,
};
