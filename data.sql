CREATE TYPE semester AS ENUM ('1', '2');
CREATE TYPE weekDay AS ENUM ('monday', 'tuesday','wednesday','thursday','friday','saturday','sunday');
CREATE TYPE degree AS ENUM ('associate', 'bachelor','master','PhD');
CREATE TYPE shift AS ENUM ('morning', 'afternoon','evening','weekend');
CREATE TYPE gradeYear AS ENUM ('1', '2','3','4','5');
CREATE TYPE status AS ENUM ('available', 'unavailable','delete');
CREATE TYPE studyTime AS ENUM ('8:00-9:30', '9:35-11:00', '14:00-15:30','15:35-17:00', '17:30-19:00','19:05-20:30');


CREATE TABLE user_login (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE university (
  university_id SERIAL PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_kh VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  website VARCHAR(255),
  logo VARCHAR(255) NOT NULL
);

CREATE TABLE schedule (
  schedule_id SERIAL PRIMARY KEY,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description VARCHAR(50) NOT NULL,
  year gradeYear,  -- custom type?
  university_id INT REFERENCES university(university_id),
  department_id INT REFERENCES department(department_id),
  degree degree,
  batch INT NOT NULL,
  semester semester,  -- custom type?
  term_start DATE,
  shift shift,
  term_end DATE,
  academic VARCHAR(50) NOT NULL,
  approver INT REFERENCES professor(professor_id),
  preparer INT REFERENCES professor(professor_id),
    major_id INT REFERENCES major(major_id),
);


CREATE TABLE department (
  department_id SERIAL PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);


CREATE TABLE room (
  room_id SERIAL PRIMARY KEY,
  room_number VARCHAR(25),
  status status,
  comment VARCHAR(255),
  floor INT,
  seat INT
);

CREATE TABLE subject (
  subject_id SERIAL PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL,
  subject_code VARCHAR(100) NOT NULL,
  department_id INT REFERENCES department(department_id)
);

CREATE TABLE major (
  major_id SERIAL PRIMARY KEY,
  department_id INT REFERENCES department(department_id),
  degree degree,
  major_name VARCHAR(50)
);

CREATE TABLE professor (
  professor_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  department_id INT REFERENCES department(department_id),
  phone_number VARCHAR(20),
  email VARCHAR(50),
  degree degree,
  note VARCHAR(255)
);

CREATE TABLE professor_schedule (
  professor_schedule_id SERIAL PRIMARY KEY,
  professor_id INT REFERENCES professor(professor_id),
  subject_id INT REFERENCES subject(subject_id),
  semester semester,
  batch INT NOT NULL,
  year VARCHAR(20),
  schedule JSONB  
);


CREATE TABLE schedule_detail (
  schedule_detail_id SERIAL PRIMARY KEY,
  schedule_id INT REFERENCES schedule(schedule_id),
  degree degree,
  department_id INT REFERENCES department(department_id),
  shift shift,
  modify_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedule_day (
  schedule_day_id SERIAL PRIMARY KEY,
  schedule_id INT REFERENCES schedule(schedule_id),
  room_id INT REFERENCES room(room_id),
  schedule_detail_id INT REFERENCES schedule_detail(schedule_detail_id),
  subject_id INT REFERENCES subject(subject_id),
  professor_id INT REFERENCES professor(professor_id),
  class_id INT REFERENCES class(class_id),
  weekday weekday,
  studyTime studyTime
);
