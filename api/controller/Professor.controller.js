import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllProfessor = (req, res) => {
  db.query("SELECT * FROM professor", (err, data) => {
    console.log(data)
    res.json(data.rows);
  });
};
const getApproverPreparer = (req, res) => {
  db.query("SELECT * FROM professor where note ilike '%approve%' or note ilike '%prepare%'", (err, data) => {
    console.log(data)
    res.json(data.rows);
  });
};

const getOneProfessor = (req, res) => {
  const id = req.params.id;
  const queryGetOneProfessor =
    "Select * from professor where professor_id = $1";

  db.query(queryGetOneProfessor, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.rowCount > 0) {
      return res.json(data.rows);
    } else {
      return res.json("Professor Not Found!");
    }
  });
};

const getAvailableProfessor = (req, res) => {
  console.log(req);
  const subject_id = req.body.subject_id;
  const shift = req.body.shift;
  const weekDay = req.body.weekDay;
  const batch = req.body.batch;
  const semester = req.body.semester;
  const startTerm = req.body.startTerm;
  const departmentId = req.body.department_id;
  const queryGetOneProfessor = `select * from professor_schedule ps left join professor p on p.professor_id = ps.professor_id 
    where subject_id= $1
    and schedule->$2->$3 ='true'
    and batch = $4
    and semester = $5
    and deparment_id = $9
    and not exists (select 1 from schedule_day sd
    join schedule s on s.schedule_id = sd.schedule_id where sd.weekday = $6 and s.shift =$7
    and CAST($8 AS DATE) between term_start and term_end
    and sd.professor_id = ps.professor_id
    )`;
  const finalQueryString = queryGetOneProfessor.replace(
    /\$(\d+)/g,
    (_, index) => {
      return `'${
        [
          subject_id,
          shift,
          weekDay,
          batch,
          semester,
          weekDay,
          shift,
          startTerm,
          departmentId
        ][index - 1]
      }'`; // Replace parameter with corresponding value
    }
  );

  // Log the final query string
  console.log("Final query:", finalQueryString);

  // Log the final query string

  db.query(
    queryGetOneProfessor,
    [subject_id, shift, weekDay, batch, semester, weekDay, shift, startTerm],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data.rows);
    }
  );
};

const createProfessor = (req, res) => {
  const getFirstNameProfessor = req.body.first_name;
  const getLastNameProfessor = req.body.last_name;
  const getPhoneNumberProfessor = req.body.phone_number;
  const email = req.body.email;
  const degree = req.body.degree;
  const note = req.body.note;

  if (isEmpty(getFirstNameProfessor)) {
    return res.json("Please Fill Professor First Name");
  }
  if (isEmpty(getLastNameProfessor)) {
    return res.json("Please Fill Professor Last Name");
  }
  if (isEmpty(getPhoneNumberProfessor)) {
    return res.json("Please Input Professor Phone Number");
  }

  const queryCreateProfessor =
    "INSERT INTO professor (first_name, last_name, phone_number,email,degree,note) VALUES ($1,$2,$3,$4,$5,$6)";

  db.query(
    queryCreateProfessor,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getPhoneNumberProfessor,
      email,
      degree,
      note
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Created!");
    }
  );
};

const deleteProfessor = (req, res) => {
  const getIdProfessor = req.params.id;

  if (isEmpty(getIdProfessor)) {
    return res.json("Can't Get ID Professor");
  }

  db.query(
    "Delete from professor where professor_id =$1",
    [getIdProfessor],
    (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json("Professor Has Been Deleted!");
    }
  );
};

const editProfessor = (req, res) => {
  const getIdProfessor = req.params.id;
  const getFirstNameProfessor = req.body.first_name;
  const getLastNameProfessor = req.body.last_name;
  const getPhoneNumberProfessor = req.body.phone_number;
  const email = req.body.email;
  const degree = req.body.degree;
  const note = req.body.note;
  if (isEmpty(getFirstNameProfessor)) {
    return res.json("Please Fill Professor First Name");
  }
  if (isEmpty(getLastNameProfessor)) {
    return res.json("Please Fill Professor Last Name");
  }
  if (isEmpty(getPhoneNumberProfessor)) {
    return res.json("Please Input Professor Phone Number");8
  }

  const queryEditUniversity =
    "update professor set first_name=$1, last_name=$2, phone_number=$3,email=$4, degree=$5 , note = $6 WHERE professor_id = $7";

  db.query(
    queryEditUniversity,
    [
      getFirstNameProfessor,
      getLastNameProfessor,
      getPhoneNumberProfessor,
      email,
      degree,
      note,
      getIdProfessor,
      
    ],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Professor Has Been Edited!");
    }
  );
};
export {
  getAllProfessor,
  getApproverPreparer,
  getAvailableProfessor,
  getOneProfessor,
  createProfessor,
  editProfessor,
  deleteProfessor,
};
