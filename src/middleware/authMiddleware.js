import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
<<<<<<< HEAD
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ Notifikasi: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(401)
      .json({ Notifikasi: "Token tidak valid atau sudah kadaluarsa" });
  }
};
=======
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({Notifikasi: "Token tidak ditemukan"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.error("JWT verification error:", error);
        return res.status(401).json({Notifikasi: "Token tidak valid atau sudah kadaluarsa"});
    }
        
};
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
