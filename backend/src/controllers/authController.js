import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Cek apakah email terdaftar
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    // 2. Verifikasi password (membandingkan plain text dengan hash bcrypt)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password salah" });
    }

    // 3. Buat JWT Token
    const token = jwt.sign(
      { id_user: user.id_user, role: user.role },
      process.env.JWT_SECRET || "rahasia_super_aman",
      { expiresIn: "1d" },
    );

    // 4. Kirim respon sukses
    return res.status(200).json({
      message: "Login berhasil",
      user: {
        id_user: user.id_user,
        nama_user: user.nama_user,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function getMe(req, res) {
  try {
    const emailDb = await User.findByPk(req.user.id_user, {
      attributes: ["id_user", "nama_user", "email"],
    });

    if (!emailDb) {
      return res.status(404).json({
        Notifikasi: "User tidak ditemukan",
      });
    } else {
      return res.status(200).json({ data: emailDb });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Notifikasi: "Terjadi kesalahan pada server",
    });
  }
}
