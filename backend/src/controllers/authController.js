import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek input
    if (!email || !password) {
      return res.status(400).json({
        Notifikasi: "Mohon lengkapi Email dan Password!",
      });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // Cek apakah user ditemukan
    if (!user) {
      return res.status(401).json({
        Notifikasi: "Email atau password salah!",
      });
    }

    // Cek password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        Notifikasi: "Password anda salah!",
      });
    }

    // Membuat JWT
    const token = jwt.sign(
      {
        id_user: user.id_user,
        nama_user: user.nama_user,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    // Response berhasil
    return res.status(200).json({
      Notifikasi: "Login berhasil",
      token: token,
      user: {
        id_user: user.id_user,
        nama_user: user.nama_user,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      Notifikasi: "Terjadi kesalahan pada server",
    });
  }
};
