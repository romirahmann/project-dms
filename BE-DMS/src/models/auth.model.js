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
      "u.tenantId",
      "u.roleId",
      "r.roleName",
      "g.grupName",
      "g.grupDescription",
      "t.tenantName"
    )
    .from("tbl_users as u")
    .join("tbl_grup_user as g", "u.grupId", "g.grupId")
    .leftJoin("tbl_tenants as t", "u.tenantId", "t.tenantId")
    .leftJoin("tbl_roles as r", "u.roleId", "r.roleId")
    .where("username", username)
    .andWhere("u.isActive", 1);

module.exports = {
  login,
};
