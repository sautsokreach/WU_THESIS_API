--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.1

-- Started on 2026-01-20 02:15:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 864 (class 1247 OID 16518)
-- Name: degree; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.degree AS ENUM (
    'associate',
    'bachelor',
    'master',
    'PhD'
);


ALTER TYPE public.degree OWNER TO admin;

--
-- TOC entry 870 (class 1247 OID 16538)
-- Name: gradeyear; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.gradeyear AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5'
);


ALTER TYPE public.gradeyear OWNER TO admin;

--
-- TOC entry 858 (class 1247 OID 16497)
-- Name: semester; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.semester AS ENUM (
    '1',
    '2'
);


ALTER TYPE public.semester OWNER TO admin;

--
-- TOC entry 867 (class 1247 OID 16528)
-- Name: shift; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.shift AS ENUM (
    'morning',
    'afternoon',
    'evening',
    'weekend'
);


ALTER TYPE public.shift OWNER TO admin;

--
-- TOC entry 873 (class 1247 OID 16550)
-- Name: status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.status AS ENUM (
    'available',
    'unavailable',
    'delete'
);


ALTER TYPE public.status OWNER TO admin;

--
-- TOC entry 876 (class 1247 OID 16558)
-- Name: studytime; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.studytime AS ENUM (
    '8:00-9:30',
    '9:35-11:00',
    '14:00-15:30',
    '15:35-17:00',
    '17:30-19:00',
    '19:05-20:30'
);


ALTER TYPE public.studytime OWNER TO admin;

--
-- TOC entry 861 (class 1247 OID 16502)
-- Name: weekday; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.weekday AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);


ALTER TYPE public.weekday OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 233 (class 1259 OID 16759)
-- Name: content; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.content (
    id integer NOT NULL,
    name character varying(255),
    description text
);


ALTER TABLE public.content OWNER TO admin;

--
-- TOC entry 232 (class 1259 OID 16758)
-- Name: content_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.content_id_seq OWNER TO admin;

--
-- TOC entry 4472 (class 0 OID 0)
-- Dependencies: 232
-- Name: content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.content_id_seq OWNED BY public.content.id;


--
-- TOC entry 221 (class 1259 OID 16604)
-- Name: department; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.department (
    department_id integer NOT NULL,
    department_name character varying(100) NOT NULL
);


ALTER TABLE public.department OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 16603)
-- Name: department_department_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.department_department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.department_department_id_seq OWNER TO admin;

--
-- TOC entry 4473 (class 0 OID 0)
-- Dependencies: 220
-- Name: department_department_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.department_department_id_seq OWNED BY public.department.department_id;


--
-- TOC entry 227 (class 1259 OID 16649)
-- Name: major; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.major (
    major_id integer NOT NULL,
    department_id integer,
    degree public.degree,
    major_name character varying(50)
);


ALTER TABLE public.major OWNER TO admin;

--
-- TOC entry 226 (class 1259 OID 16648)
-- Name: major_major_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.major_major_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.major_major_id_seq OWNER TO admin;

--
-- TOC entry 4474 (class 0 OID 0)
-- Dependencies: 226
-- Name: major_major_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.major_major_id_seq OWNED BY public.major.major_id;


--
-- TOC entry 229 (class 1259 OID 16661)
-- Name: professor; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.professor (
    professor_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    department_id integer,
    phone_number character varying(20),
    email character varying(50),
    degree public.degree,
    note character varying(255)
);


ALTER TABLE public.professor OWNER TO admin;

--
-- TOC entry 228 (class 1259 OID 16660)
-- Name: professor_professor_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.professor_professor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.professor_professor_id_seq OWNER TO admin;

--
-- TOC entry 4475 (class 0 OID 0)
-- Dependencies: 228
-- Name: professor_professor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.professor_professor_id_seq OWNED BY public.professor.professor_id;


--
-- TOC entry 231 (class 1259 OID 16695)
-- Name: professor_schedule; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.professor_schedule (
    professor_schedule_id integer NOT NULL,
    professor_id integer,
    subject_id integer,
    semester public.semester,
    batch integer NOT NULL,
    year character varying(20),
    schedule jsonb,
    department_id integer
);


ALTER TABLE public.professor_schedule OWNER TO admin;

--
-- TOC entry 230 (class 1259 OID 16694)
-- Name: professor_schedule_professor_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.professor_schedule_professor_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.professor_schedule_professor_schedule_id_seq OWNER TO admin;

--
-- TOC entry 4476 (class 0 OID 0)
-- Dependencies: 230
-- Name: professor_schedule_professor_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.professor_schedule_professor_schedule_id_seq OWNED BY public.professor_schedule.professor_schedule_id;


--
-- TOC entry 223 (class 1259 OID 16611)
-- Name: room; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.room (
    room_id integer NOT NULL,
    room_number character varying(25),
    status public.status,
    comment character varying(255),
    floor integer,
    seat integer
);


ALTER TABLE public.room OWNER TO admin;

--
-- TOC entry 222 (class 1259 OID 16610)
-- Name: room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_room_id_seq OWNER TO admin;

--
-- TOC entry 4477 (class 0 OID 0)
-- Dependencies: 222
-- Name: room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.room_room_id_seq OWNED BY public.room.room_id;


--
-- TOC entry 219 (class 1259 OID 16591)
-- Name: schedule; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.schedule (
    schedule_id integer NOT NULL,
    create_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    description character varying(50),
    year public.gradeyear,
    university_id integer,
    batch integer NOT NULL,
    semester public.semester,
    term_start date,
    term_end date,
    academic character varying(50) NOT NULL,
    shift public.shift,
    department_id integer,
    degree public.degree,
    major_id integer,
    approver integer,
    preparer integer
);


ALTER TABLE public.schedule OWNER TO admin;

--
-- TOC entry 235 (class 1259 OID 16917)
-- Name: schedule_day; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.schedule_day (
    schedule_day_id integer NOT NULL,
    schedule_id integer,
    room_id integer,
    subject_id integer,
    professor_id integer,
    class_id integer,
    weekday public.weekday,
    studytime public.studytime
);


ALTER TABLE public.schedule_day OWNER TO admin;

--
-- TOC entry 234 (class 1259 OID 16916)
-- Name: schedule_day_schedule_day_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.schedule_day_schedule_day_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_day_schedule_day_id_seq OWNER TO admin;

--
-- TOC entry 4478 (class 0 OID 0)
-- Dependencies: 234
-- Name: schedule_day_schedule_day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.schedule_day_schedule_day_id_seq OWNED BY public.schedule_day.schedule_day_id;


--
-- TOC entry 218 (class 1259 OID 16590)
-- Name: schedule_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.schedule_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_schedule_id_seq OWNER TO admin;

--
-- TOC entry 4479 (class 0 OID 0)
-- Dependencies: 218
-- Name: schedule_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.schedule_schedule_id_seq OWNED BY public.schedule.schedule_id;


--
-- TOC entry 225 (class 1259 OID 16625)
-- Name: subject; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.subject (
    subject_id integer NOT NULL,
    subject_name character varying(100) NOT NULL,
    subject_code character varying(100) NOT NULL,
    department_id integer
);


ALTER TABLE public.subject OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 16624)
-- Name: subject_subject_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.subject_subject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subject_subject_id_seq OWNER TO admin;

--
-- TOC entry 4480 (class 0 OID 0)
-- Dependencies: 224
-- Name: subject_subject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.subject_subject_id_seq OWNED BY public.subject.subject_id;


--
-- TOC entry 217 (class 1259 OID 16582)
-- Name: university; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.university (
    university_id integer NOT NULL,
    name_en character varying(100) NOT NULL,
    name_kh character varying(100) NOT NULL,
    location character varying(100) NOT NULL,
    website character varying(255),
    logo character varying(255) NOT NULL
);


ALTER TABLE public.university OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 16581)
-- Name: university_university_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.university_university_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.university_university_id_seq OWNER TO admin;

--
-- TOC entry 4481 (class 0 OID 0)
-- Dependencies: 216
-- Name: university_university_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.university_university_id_seq OWNED BY public.university.university_id;


--
-- TOC entry 215 (class 1259 OID 16572)
-- Name: user_login; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_login (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    reg_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    title character varying(100),
    place character varying(100),
    about character varying(100)
);


ALTER TABLE public.user_login OWNER TO admin;

--
-- TOC entry 214 (class 1259 OID 16571)
-- Name: user_login_user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_login_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_login_user_id_seq OWNER TO admin;

--
-- TOC entry 4482 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_login_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_login_user_id_seq OWNED BY public.user_login.user_id;


--
-- TOC entry 4261 (class 2604 OID 16762)
-- Name: content id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.content ALTER COLUMN id SET DEFAULT nextval('public.content_id_seq'::regclass);


--
-- TOC entry 4255 (class 2604 OID 16607)
-- Name: department department_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.department ALTER COLUMN department_id SET DEFAULT nextval('public.department_department_id_seq'::regclass);


--
-- TOC entry 4258 (class 2604 OID 16652)
-- Name: major major_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.major ALTER COLUMN major_id SET DEFAULT nextval('public.major_major_id_seq'::regclass);


--
-- TOC entry 4259 (class 2604 OID 16664)
-- Name: professor professor_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor ALTER COLUMN professor_id SET DEFAULT nextval('public.professor_professor_id_seq'::regclass);


--
-- TOC entry 4260 (class 2604 OID 16698)
-- Name: professor_schedule professor_schedule_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor_schedule ALTER COLUMN professor_schedule_id SET DEFAULT nextval('public.professor_schedule_professor_schedule_id_seq'::regclass);


--
-- TOC entry 4256 (class 2604 OID 16614)
-- Name: room room_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room ALTER COLUMN room_id SET DEFAULT nextval('public.room_room_id_seq'::regclass);


--
-- TOC entry 4253 (class 2604 OID 16594)
-- Name: schedule schedule_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule ALTER COLUMN schedule_id SET DEFAULT nextval('public.schedule_schedule_id_seq'::regclass);


--
-- TOC entry 4262 (class 2604 OID 16920)
-- Name: schedule_day schedule_day_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day ALTER COLUMN schedule_day_id SET DEFAULT nextval('public.schedule_day_schedule_day_id_seq'::regclass);


--
-- TOC entry 4257 (class 2604 OID 16628)
-- Name: subject subject_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.subject ALTER COLUMN subject_id SET DEFAULT nextval('public.subject_subject_id_seq'::regclass);


--
-- TOC entry 4252 (class 2604 OID 16585)
-- Name: university university_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.university ALTER COLUMN university_id SET DEFAULT nextval('public.university_university_id_seq'::regclass);


--
-- TOC entry 4250 (class 2604 OID 16575)
-- Name: user_login user_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_login ALTER COLUMN user_id SET DEFAULT nextval('public.user_login_user_id_seq'::regclass);


--
-- TOC entry 4463 (class 0 OID 16759)
-- Dependencies: 233
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.content (id, name, description) FROM stdin;
1	test	test
\.


--
-- TOC entry 4451 (class 0 OID 16604)
-- Dependencies: 221
-- Data for Name: department; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.department (department_id, department_name) FROM stdin;
6	International Bachelors
1	Computer Science And Technology
2	Management and Hotel Tourism
3	Arts, Humanities and Languages
4	Social Sciences
5	Architecture, Engineering and Construction
\.


--
-- TOC entry 4457 (class 0 OID 16649)
-- Dependencies: 227
-- Data for Name: major; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.major (major_id, department_id, degree, major_name) FROM stdin;
1	1	bachelor	Program
2	1	bachelor	Network
3	1	bachelor	Design
5	6	bachelor	Law
\.


--
-- TOC entry 4459 (class 0 OID 16661)
-- Dependencies: 229
-- Data for Name: professor; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.professor (professor_id, first_name, last_name, department_id, phone_number, email, degree, note) FROM stdin;
1	John	Doe	1	555-123-4567	jdoe@example.com	PhD	Specializes in AI research
2	Jane	Smith	2	555-987-6543	jsmith@example.com	master	Focus on undergraduate teaching
3	Alan	Turing	1	555-555-0000	aturing@example.com	PhD	Pioneer in computer science
4	Grace	Hopper	3	555-111-2222	ghopper@example.com	PhD	Expert in programming languages
5	Ada	Lovelace	2	555-333-4444	alovelace@example.com	bachelor	First computer programmer
6	Isaac	Newton	4	555-777-8888	inewton@example.com	PhD	Head of the physics department
7	Marie	Curie	4	555-666-9999	mcurie@example.com	PhD	Research in radiation and chemistry
8	Albert	Einstein	4	555-000-1111	aeinstein@example.com	PhD	Lectures on theoretical physics
9	Rosalind	Franklin	3	555-222-3333	rfranklin@example.com	master	prepare
10	Niels	Bohr	4	555-444-5555	nbohr@example.com	PhD	approve
\.


--
-- TOC entry 4461 (class 0 OID 16695)
-- Dependencies: 231
-- Data for Name: professor_schedule; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.professor_schedule (professor_schedule_id, professor_id, subject_id, semester, batch, year, schedule, department_id) FROM stdin;
1	1	1	2	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": false, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	1
2	2	2	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	1
3	3	3	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	1
4	5	4	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	1
5	10	5	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": false}, "morning": {"friday": true, "monday": false, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": false, "saturday": true, "thursday": true, "wednesday": true}}	1
6	7	4	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": false}, "morning": {"friday": true, "monday": false, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": false, "saturday": true, "thursday": true, "wednesday": true}}	1
7	7	3	1	18	2024 - 2025	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	1
8	2	7	2	18	2024 - 2025	{"evening": {"friday": false, "monday": true, "sunday": false, "tuesday": false, "saturday": false, "thursday": false, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": false, "tuesday": false, "saturday": false, "thursday": false, "wednesday": true}, "afternoon": {"friday": false, "monday": false, "sunday": false, "tuesday": true, "saturday": false, "thursday": true, "wednesday": false}}	3
9	5	4	2	18	2025 - 2026	{"evening": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "morning": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}, "afternoon": {"friday": true, "monday": true, "sunday": true, "tuesday": true, "saturday": true, "thursday": true, "wednesday": true}}	6
\.


--
-- TOC entry 4453 (class 0 OID 16611)
-- Dependencies: 223
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.room (room_id, room_number, status, comment, floor, seat) FROM stdin;
1	101	available		1	25
2	102	available		1	25
3	103	available		1	25
4	201	available		2	25
5	301	available		3	25
6	302	delete		3	38
7	302	unavailable		3	12
8	303	available		3	25
\.


--
-- TOC entry 4449 (class 0 OID 16591)
-- Dependencies: 219
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.schedule (schedule_id, create_date, description, year, university_id, batch, semester, term_start, term_end, academic, shift, department_id, degree, major_id, approver, preparer) FROM stdin;
5	2025-06-23 04:32:02.666643	\N	5	1	16	1	2025-06-23	2025-06-23	2024 - 2025	morning	1	bachelor	1	9	10
6	2025-08-08 07:25:13.84459	\N	4	1	18	2	2025-08-08	2025-08-08	2024 - 2025	morning	1	bachelor	1	9	10
\.


--
-- TOC entry 4465 (class 0 OID 16917)
-- Dependencies: 235
-- Data for Name: schedule_day; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.schedule_day (schedule_day_id, schedule_id, room_id, subject_id, professor_id, class_id, weekday, studytime) FROM stdin;
2	5	1	1	1	\N	monday	\N
3	6	3	1	1	\N	monday	\N
\.


--
-- TOC entry 4455 (class 0 OID 16625)
-- Dependencies: 225
-- Data for Name: subject; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.subject (subject_id, subject_name, subject_code, department_id) FROM stdin;
1	C#	00001	\N
2	Python	00002	\N
3	Web development	00003	\N
4	Java 	00004	\N
5	C++	00005	\N
7	Linux	00007	\N
6	MikroTik	00006	\N
8	C#	00008	\N
\.


--
-- TOC entry 4447 (class 0 OID 16582)
-- Dependencies: 217
-- Data for Name: university; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.university (university_id, name_en, name_kh, location, website, logo) FROM stdin;
1	Western University	សាកលវិទ្យាល័យ​ វេស្ទើន	ទួលគោក	https://westernuniversity.edu.kh/	https://www.westernuniversity.edu.kh/themesimglogo_wu_1.png
\.


--
-- TOC entry 4445 (class 0 OID 16572)
-- Dependencies: 215
-- Data for Name: user_login; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.user_login (user_id, username, password, email, reg_date, title, place, about) FROM stdin;
5	user@example.com	$2b$10$bxuuj9ZuJveTNNjD1S3PDec3AGqt0/fVC8L3qyVNqBAnb15JJYFn6	password	2025-06-20 07:45:46.414229	\N	\N	\N
1	admin	$2b$10$bxuuj9ZuJveTNNjD1S3PDec3AGqt0/fVC8L3qyVNqBAnb15JJYFn6	admin@gmail.com	2025-06-20 13:57:37.554499	1	2	3
\.


--
-- TOC entry 4483 (class 0 OID 0)
-- Dependencies: 232
-- Name: content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.content_id_seq', 1, true);


--
-- TOC entry 4484 (class 0 OID 0)
-- Dependencies: 220
-- Name: department_department_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.department_department_id_seq', 6, true);


--
-- TOC entry 4485 (class 0 OID 0)
-- Dependencies: 226
-- Name: major_major_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.major_major_id_seq', 5, true);


--
-- TOC entry 4486 (class 0 OID 0)
-- Dependencies: 228
-- Name: professor_professor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.professor_professor_id_seq', 10, true);


--
-- TOC entry 4487 (class 0 OID 0)
-- Dependencies: 230
-- Name: professor_schedule_professor_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.professor_schedule_professor_schedule_id_seq', 9, true);


--
-- TOC entry 4488 (class 0 OID 0)
-- Dependencies: 222
-- Name: room_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.room_room_id_seq', 8, true);


--
-- TOC entry 4489 (class 0 OID 0)
-- Dependencies: 234
-- Name: schedule_day_schedule_day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.schedule_day_schedule_day_id_seq', 3, true);


--
-- TOC entry 4490 (class 0 OID 0)
-- Dependencies: 218
-- Name: schedule_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.schedule_schedule_id_seq', 6, true);


--
-- TOC entry 4491 (class 0 OID 0)
-- Dependencies: 224
-- Name: subject_subject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.subject_subject_id_seq', 8, true);


--
-- TOC entry 4492 (class 0 OID 0)
-- Dependencies: 216
-- Name: university_university_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.university_university_id_seq', 1, true);


--
-- TOC entry 4493 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_login_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_login_user_id_seq', 5, true);


--
-- TOC entry 4284 (class 2606 OID 16766)
-- Name: content content_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (id);


--
-- TOC entry 4272 (class 2606 OID 16609)
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (department_id);


--
-- TOC entry 4278 (class 2606 OID 16654)
-- Name: major major_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.major
    ADD CONSTRAINT major_pkey PRIMARY KEY (major_id);


--
-- TOC entry 4280 (class 2606 OID 16666)
-- Name: professor professor_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (professor_id);


--
-- TOC entry 4282 (class 2606 OID 16702)
-- Name: professor_schedule professor_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor_schedule
    ADD CONSTRAINT professor_schedule_pkey PRIMARY KEY (professor_schedule_id);


--
-- TOC entry 4274 (class 2606 OID 16616)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (room_id);


--
-- TOC entry 4286 (class 2606 OID 16922)
-- Name: schedule_day schedule_day_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day
    ADD CONSTRAINT schedule_day_pkey PRIMARY KEY (schedule_day_id);


--
-- TOC entry 4270 (class 2606 OID 16597)
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (schedule_id);


--
-- TOC entry 4276 (class 2606 OID 16630)
-- Name: subject subject_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (subject_id);


--
-- TOC entry 4268 (class 2606 OID 16589)
-- Name: university university_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.university
    ADD CONSTRAINT university_pkey PRIMARY KEY (university_id);


--
-- TOC entry 4264 (class 2606 OID 16580)
-- Name: user_login user_login_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT user_login_email_key UNIQUE (email);


--
-- TOC entry 4266 (class 2606 OID 16578)
-- Name: user_login user_login_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT user_login_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4293 (class 2606 OID 16655)
-- Name: major major_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.major
    ADD CONSTRAINT major_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- TOC entry 4294 (class 2606 OID 16667)
-- Name: professor professor_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- TOC entry 4295 (class 2606 OID 16980)
-- Name: professor_schedule professor_schedule_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor_schedule
    ADD CONSTRAINT professor_schedule_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- TOC entry 4296 (class 2606 OID 16703)
-- Name: professor_schedule professor_schedule_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor_schedule
    ADD CONSTRAINT professor_schedule_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professor(professor_id);


--
-- TOC entry 4297 (class 2606 OID 16708)
-- Name: professor_schedule professor_schedule_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.professor_schedule
    ADD CONSTRAINT professor_schedule_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(subject_id);


--
-- TOC entry 4287 (class 2606 OID 16963)
-- Name: schedule schedule_approver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_approver_fkey FOREIGN KEY (approver) REFERENCES public.professor(professor_id);


--
-- TOC entry 4298 (class 2606 OID 16943)
-- Name: schedule_day schedule_day_professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day
    ADD CONSTRAINT schedule_day_professor_id_fkey FOREIGN KEY (professor_id) REFERENCES public.professor(professor_id);


--
-- TOC entry 4299 (class 2606 OID 16928)
-- Name: schedule_day schedule_day_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day
    ADD CONSTRAINT schedule_day_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room(room_id);


--
-- TOC entry 4300 (class 2606 OID 16923)
-- Name: schedule_day schedule_day_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day
    ADD CONSTRAINT schedule_day_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES public.schedule(schedule_id);


--
-- TOC entry 4301 (class 2606 OID 16938)
-- Name: schedule_day schedule_day_subject_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule_day
    ADD CONSTRAINT schedule_day_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject(subject_id);


--
-- TOC entry 4288 (class 2606 OID 16953)
-- Name: schedule schedule_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- TOC entry 4289 (class 2606 OID 16958)
-- Name: schedule schedule_major_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_major_id_fkey FOREIGN KEY (major_id) REFERENCES public.major(major_id);


--
-- TOC entry 4290 (class 2606 OID 16968)
-- Name: schedule schedule_preparer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_preparer_fkey FOREIGN KEY (preparer) REFERENCES public.professor(professor_id);


--
-- TOC entry 4291 (class 2606 OID 16598)
-- Name: schedule schedule_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.university(university_id);


--
-- TOC entry 4292 (class 2606 OID 16631)
-- Name: subject subject_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- TOC entry 4471 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO admin;


-- Completed on 2026-01-20 02:15:46

--
-- PostgreSQL database dump complete
--

