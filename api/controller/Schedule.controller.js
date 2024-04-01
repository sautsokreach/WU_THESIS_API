import db from "../config/db.config.js";
import { isEmpty } from "../config/hepler.js";

const getAllSchedules = (req, res) => {
  db.query(`
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
  `, (err, data) => {
    res.json(data.rows);
  });
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
    const universityId = req.body.university_id;
    const batch = req.body.batch;
    const semester = req.body.semester;
    const year = req.body.year;
    const termStart = req.body.term_start;
    const termEnd = req.body.term_end;
    const departmentId = req.body.department_id;
    const degree = req.body.degree;
    const shift = req.body.shift;
    const description = req.body.description;
    const academic = req.body.academic;
  
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
       university_id, batch, semester, year, term_start, term_end, department_id,  degree, shift, academic)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
  
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
      ],
      (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Schedule Created!");
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
  const getIdSubject = req.params.id;
  const getSubjectName = req.body.subject_name;
  const getSubjectCode = req.body.subject_code;
  const getDepartmentId = 1;

  if (isEmpty(getSubjectName)) {
    return res.json("Please Fill Subject Name");
  }
  if (isEmpty(getSubjectCode)) {
    return res.json("Please Fill Subject Code");
  }
  if (isEmpty(getDepartmentId)) {
    return res.json("Department ID Not Found!");
  }

  const queryEditSubject =
    "update subject set subject_name=$1, subject_code=$2, department_id=$3 WHERE subject_id = $4";

  db.query(
    queryEditSubject,
    [getSubjectName, getSubjectCode, getDepartmentId, getIdSubject],
    (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("Subject Has Been Edited!");
    }
  );
};

const deleteSchedule = (req, res) => {
  const getIdSubject = req.params.id;

  db.query(
    "Delete from subject where subject_id = $1",
    [getIdSubject],
    (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Subject Has Been Deleted!");
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
