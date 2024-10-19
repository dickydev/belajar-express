import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT * FROM users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
};

export const getAllUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (user.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({
      error: "Faild to fetch user by id",
    });
  }
};

export const createUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    await db.execute("INSERT INTO users(username, email) VALUES(?,?)", [
      username,
      email,
    ]);
    res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create user",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE users SET username = ?, email = ? WHERE id = ?",
      [username, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    res.status(200).json({
      message: "User Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to Update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete user",
    });
  }
};
