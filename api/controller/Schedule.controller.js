import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllSchedules = (req, res) => {
  db.query(
    `
  SELECT 
  s.*, 
  p.professor_id AS preparer_id,
  concat(p.first_name ,' ',p.last_name) AS preparer_name,
  p1.professor_id AS approver_id,
  concat(p1.first_name,' ' ,p1.last_name) AS approver_name,
  m.*,d.*
FROM 
  schedule s 
LEFT JOIN 
  professor p ON s.preparer = p.professor_id 
LEFT JOIN 
  professor p1 ON s.approver = p1.professor_id
LEFT JOIN 
  major m  ON  s.major_id = m.major_id
LEFT JOIN 
  department d  ON  s.department_id = d.department_id ;
  `,
    (err, data) => {
      console.log(err)
      res.json(data.rows);
    }
  );
};

const getOneSchedule = (req, res) => {
  const id = req.params.id;
  const queryGetOneSubject = "Select * from subject where subject_id = $1";

  db.query(queryGetOneSubject, [id], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data.rows);
  });
};

const createSchedule = (req, res) => {
  const universityId = req.body.university;
  const batch = req.body.batch;
  const semester = req.body.semester;
  const year = req.body.year;
  const termStart = req.body.startTerm;
  const termEnd = req.body.endTerm;
  const departmentId = req.body.department;
  const degree = req.body.major_set;
  const shift = req.body.shift;
  //const description = req.body.description;
  const academic = req.body.academic;
  const approver = req.body.approver;
  const preparer = req.body.preparer;
  const major_id = req.body.major;

  if (isEmpty(universityId)) {
    return res.json("Can't Get University");
  }
  if (isEmpty(batch)) {
    return res.json("Can't Get Batch");
  }
  if (isEmpty(semester)) {
    return res.json("Can't Get Semester");
  }
  if (isEmpty(year)) {
    return res.json("Can't Get Year");
  }
  if (isEmpty(termStart)) {
    return res.json("Can't Get Term Start");
  }
  if (isEmpty(termEnd)) {
    return res.json("Can't Get Term End");
  }
  if (isEmpty(departmentId)) {
    return res.json("Can't Get Department");
  }
  if (isEmpty(degree)) {
    return res.json("Can't Get Degree");
  }
  if (isEmpty(shift)) {
    return res.json("Can't Get Shift");
  }
  if (isEmpty(academic)) {
    return res.json("Can't Get Academic");
  }

  const querySchedule = `Insert into schedule (
       university_id, batch, semester, year, term_start, term_end, department_id,  degree, shift, academic, approver,
       preparer,
       major_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13) returning schedule_id`;

  db.query(
    querySchedule,
    [
      universityId,
      batch,
      semester,
      year,
      termStart,
      termEnd,
      departmentId,
      degree,
      shift,
      academic,
      approver,
      preparer,
      major_id
    ],
    (err, data) => {
      console.log(err,)
      if (err) return res.json(err);
      res.schedule_id = data.rows[0].schedule_id;
      return res.status(200).json( data.rows[0]);
    }
  );

  //   console.log(
  //     universityId,
  //     batch,
  //     semester,
  //     year,
  //     termStart,
  //     termEnd,
  //     departmentId,
  //     degree,
  //     shift,
  //     academic
  //   );
};

const editSchedule = (req, res) => {
  const id = req.params.id;
  const year = req.body.year;
  const batch = req.body.batch;
  const semester = req.body.semester;
  const termStart = req.body.term_start;
  const termEnd = req.body.term_end;
  const description = req.body.description;
  console.log(req.body.term_start)


  const queryEditSchedule =
    "update schedule set year=$1, batch=$2, semester=$3,term_start=$4::date, term_end=$5::date, description=$6 WHERE schedule_id = $7";

  db.query(
    queryEditSchedule,
    [year, batch, semester, termStart,termEnd,description,id],
    (err, data) => {
      if (err) {
        console.log(err)
        return res.json(err);
      }
      return res.status(200).json("Schedule Has Been Edited!");
    }
  );
};

const deleteSchedule = (req, res) => {
  const getIdSubject = req.params.id;

  db.query(
    "delete from schedule_day where schedule_id = $1",
    [getIdSubject],
    (err, data) => {
      db.query(
        "Delete from schedule where schedule_id = $1",
        [getIdSubject],
        (err, data) => {
          console.log(err)
          if (err) return res.json(err);
          return res.status(200).json("schedule Has Been Deleted!");
        }
      );
    }
  );
  

};

export {
  getAllSchedules,
  //getOneSubject,
  createSchedule,
  editSchedule,
  deleteSchedule,
};
