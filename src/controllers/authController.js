import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

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
  let { idUser, nama_user, email, password, role } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const [idUserCheck] = await User.update(
      { nama_user, email, password: hashPassword, role },
      { where: { id_user: idUser } },
    );

    if (idUserCheck === 0) {
      res.status(404).json({ Notifikasi: "Akun tidak ditemukan" });
    } else {
      res.status(200).json({ Notifikasi: "Akun diperbarui !" });
    }
  } catch (error) {
    console.log({
      Notifikasi: "Akun tidak diperbarui, periksa error : ",
      error,
    });
  }
}

export async function deleteAccount(req, res) {
  let { idUser } = req.body;
  try {
    const idUserCheck = await User.destroy({ where: { id_user: idUser } });

    if (idUserCheck === 0) {
      res.status(404).json({ Notifikasi: "Akun tidak ditemukan" });
    } else {
      res.status(200).json({ Notifikasi: "Akun dihapus !" });
    }
  } catch (error) {
    console.log({ Notifikasi: "Akun tidak dihapus, periksa error : ", error });
  }
}

export async function login(req, res) {
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
// export async function loginAdmin(req, res) {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ Notifikasi: "Email dan Password tidak boleh kosong !" });
//     }

//     const emailDb = await User.findOne({ where: { email } });
//     if (!emailDb) {
//       return res
//         .status(400)
//         .json({ Notifikasi: "Email dan Password tidak terdaftar" });
//     }

//     const passwordMatch = await bcrypt.compare(password, emailDb.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ Notifikasi: "Password anda salah!" });
//     }

//     const token = jwt.sign(
//       { id_user: emailDb.id_user, email: emailDb.email },
//       JWT_SECRET,
//       { expiresIn: "1d" },
//     );
//     return res.status(200).json({
//       Notifikasi: "Login berhasil",
//       token: token,
//       user: {
//         "ID User": emailDb.id_user,
//         "Nama User": emailDb.nama_user,
//         Email: emailDb.email,
//         Role: emailDb.role,
//       },
//     });
//   } catch (error) {
//     console.error("Login error, periksa ", error);
//     return res
//       .status(500)
//       .json({ Notifikasi: "Terjadi kesalahan pada server" });
//   }
// }

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
