const db = require("../database/db.config");

const login = async (username) =>
  await db
    .select(
      "u.username",
      "u.password",
      "u.userId",
      "u.email",
      "u.fullname",
      "u.grupId",
      "g.grupName",
      "g.grupDescription"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .where("username", username)
    .andWhere("u.statusId", 1);

module.exports = {
  login,
};
