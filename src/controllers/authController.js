import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const serverError = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: "Terjadi kesalahan pada server" });
};

const JWT_SECRET = process.env.JWT_SECRET;

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

export async function createAccount(req, res) {
  let { nama_user, email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res
        .status(401)
        .json({ Notifikasi: "Mohon lengkapi Email dan Password!" });
    }

    const emailDb = await User.findOne({ where: { email: email } });
    if (emailDb) {
      return res.status(401).json({
        Notifikasi: "Email telah terdaftar, cari atau buat email baru",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ nama_user, email, password: hashPassword, role });

    return res.status(200).json({ Notifikasi: "Akun ditambahkan !" });
  } catch (error) {
    console.log({
      Notifikasi: "Akun tidak ditambahkan, periksa error : ",
      error,
    });
    return res
      .status(500)
      .json({ Notifikasi: "Akun tidak ditambahkan, periksa error : ", error });
  }
}

export async function updateAccount(req, res) {
  // 1. Ambil id dari req.params (sesuai rute /account/:id)
  const { id } = req.params;

  // 2. Hanya ambil nama_user, email, dan role dari req.body (password diabaikan)
  const { nama_user, email, role } = req.body;

  try {
    // 3. Lakukan update ke database menggunakan Sequelize tanpa menyertakan password
    const [idUserCheck] = await User.update(
      { nama_user, email, role },
      { where: { id_user: id } },
    );

    if (idUserCheck === 0) {
      return res.status(404).json({ Notifikasi: "Akun tidak ditemukan" });
    } else {
      return res.status(200).json({ Notifikasi: "Akun diperbarui !" });
    }
  } catch (error) {
    console.error("Akun tidak diperbarui, periksa error :", error);
    // Kirim respons error ke frontend agar loading berhenti
    return res.status(500).json({
      Notifikasi: "Gagal memperbarui akun",
      error: error.message,
    });
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const account = await User.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ msg: "User Tidak ditemukan." });
    }
    await account.destroy();
    return res.status(200).json({ msg: "User berhasil dihapus." });
  } catch (error) {
    return serverError(res, error);
    // return res.status(res,req);
  }
};

export async function login(req, res) {
  const { email, password } = req.body || {};
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ Notifikasi: "Email dan Password tidak boleh kosong !" });
    }

    const emailDb = await User.findOne({ where: { email } });
    if (!emailDb) {
      return res
        .status(400)
        .json({ Notifikasi: "Email dan Password tidak terdaftar" });
    }

    const passwordMatch = await bcrypt.compare(password, emailDb.password);
    if (!passwordMatch) {
      return res.status(401).json({ Notifikasi: "Password anda salah!" });
    }

    const token = jwt.sign(
      { id_user: emailDb.id_user, email: emailDb.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      Notifikasi: "Login berhasil",
      token: token,
      user: {
        "ID User": emailDb.id_user,
        "Nama User": emailDb.nama_user,
        Email: emailDb.email,
        Role: emailDb.role,
      },
    });
  } catch (error) {
    console.error("Login error, periksa ", error);
    return res
      .status(500)
      .json({ Notifikasi: "Terjadi kesalahan pada server" });
  }
}

export async function loginAdmin(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ Notifikasi: "Email dan Password tidak boleh kosong !" });
    }

    const emailDb = await User.findOne({ where: { email } });
    if (!emailDb) {
      return res
        .status(400)
        .json({ Notifikasi: "Email dan Password tidak terdaftar" });
    }

    const passwordMatch = await bcrypt.compare(password, emailDb.password);
    if (!passwordMatch) {
      return res.status(401).json({ Notifikasi: "Password anda salah!" });
    }

    const token = jwt.sign(
      { id_user: emailDb.id_user, email: emailDb.email },
      JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      Notifikasi: "Login berhasil",
      token: token,
      user: {
        "ID User": emailDb.id_user,
        "Nama User": emailDb.nama_user,
        Email: emailDb.email,
        Role: emailDb.role,
      },
    });
  } catch (error) {
    console.error("Login error, periksa ", error);
    return res
      .status(500)
      .json({ Notifikasi: "Terjadi kesalahan pada server" });
  }
}

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
    return res
      .status(500)
      .json({ Notifikasi: "Terjadi kesalahan pada server, periksa ", error });
  }
}
