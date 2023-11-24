import pgPromise from "pg-promise";
const pgp = pgPromise();
// const db = pgp("postgres://postgres:qwe321loi@localhost:5432/fullstack_puck_srenk");
const db = pgp("postgres://postgres:qwe321loi@localhost:5432/fullstack_puck_srenk");
export default db