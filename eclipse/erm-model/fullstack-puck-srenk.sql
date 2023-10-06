create DATABASE fullstack_puck_srenk;
/* Drop Tables */

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;




/* Create Tables */

CREATE TABLE notes
(
	id serial NOT NULL,
	name VARCHAR NOT NULL,
	first_date date DEFAULT now(),
	last_date date DEFAULT NULL,
	txt text,
	imporatance boolean DEFAULT FALSE,
	active boolean DEFAULT TRUE,
	photo varchar DEFAULT NULL,
	name_user varchar NOT NULL,
	PRIMARY KEY (id)
) WITHOUT OIDS;


CREATE TABLE users
(
	name varchar NOT NULL UNIQUE,
	pswhash text UNIQUE,
	PRIMARY KEY (name)
) WITHOUT OIDS;



/* Create Foreign Keys */

ALTER TABLE notes
	ADD FOREIGN KEY (name_user)
	REFERENCES users (name)
	ON UPDATE RESTRICT
	ON DELETE CASCADE
;


CREATE EXTENSION IF NOT EXISTS pgcrypto
WITH SCHEMA public
CASCADE


