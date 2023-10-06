create DATABASE fullstack_puck_srenk;
/* Drop Tables */

DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS users;




/* Create Tables */

CREATE TABLE notes
(
	id serial NOT NULL,
	first_date date,
	last_date date,
	text text,
	imporatance boolean,
	active boolean,
	photo varchar,
	type int,
	name_user varchar NOT NULL UNIQUE,
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
	ON DELETE RESTRICT
;



