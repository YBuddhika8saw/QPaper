import mysql from "mysql";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Password",
  database: "quizad"
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Export the pool for use in other modules
export default pool;
