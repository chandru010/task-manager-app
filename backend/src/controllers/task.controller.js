const pool = require("../config/db");

/* ===============================
   CREATE TASK
================================= */
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ===============================
   GET TASKS (USER-SPECIFIC)
================================= */
exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1",
      [req.user.id]
    );

    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: result.rows
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ===============================
   UPDATE TASK
================================= */
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
      [title, description, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ===============================
   DELETE TASK
================================= */
exports.deleteTask = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *",
      [req.params.id, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
      data: null
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
