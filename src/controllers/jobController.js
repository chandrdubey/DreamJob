const pool = require("../config/connection");

module.exports = {
  allJobs: async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM jobs ORDER BY created_at DESC"
      );
      res.json({ status: 200, data: result.rows });
    } catch (err) {
      res.json({ status: 500, message: err });
    }
  },
  newJob: async (req, res) => {
    try {
      const { title, description, company_name, city, recruiter_id } = req.body;
      const result = await pool.query(
        "INSERT INTO jobs (title, description, company_name, city, recruiter_id) VALUES ($1, $2 ,$3, $4, $5) RETURNING*",
        [title, description, company_name, city, recruiter_id]
      );

      res.json({ status: 200, message: "new job added successfully" });
    } catch (err) {
      res.json({ status: 500, message: err });
    }
  },
  searchJobs: async (req, res) => {
    try {
      const { query } = req.params;

      const search_query = "%" + query + "%";

      const results = await pool.query(
        "SELECT * FROM jobs WHERE title LIKE $1 OR description LIKE $1 OR company_name LIKE $1",
        [search_query]
      );

      res.json({ status: 200, data: results.rows });
    } catch (err) {
      res.json({ status: 404, message: err });
    }
  },
};
