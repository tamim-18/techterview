/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://tamim_owner:lpN90eHQhsZn@ep-snowy-recipe-a1bp4zaf.ap-southeast-1.aws.neon.tech/techterview?sslmode=require",
  },
};
