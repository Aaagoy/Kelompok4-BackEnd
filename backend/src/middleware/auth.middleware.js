import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                Notifikasi: "Token tidak ditemukan"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                Notifikasi: "Token tidak ditemukan"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT verification error:", error);

        return res.status(401).json({
            Notifikasi: "Token tidak valid atau sudah kadaluarsa"
        });
    }
};