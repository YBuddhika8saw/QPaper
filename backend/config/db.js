import mysql from "mysql";

const dbConfig = {
  host: "sql6.freesqldatabase.com",
  user: "sql6685147",
  password: "D7uNzeQ1xB",
  database: "sql6685147"
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Export the pool for use in other modules
export default pool;
