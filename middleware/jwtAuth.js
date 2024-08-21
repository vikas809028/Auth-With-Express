// this is simple middleware
// const jwtAuth = (req,res,next)=>{
//     next();
// }

const JWT = require("jsonwebtoken");
const SECRET = "SECRET";
const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "unauthorized access",
    });
  }
  try {
    const payload = JWT.verify(token, SECRET || process.env.SECRET);
    req.user = { id: payload.id, email: payload.email };
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }

  next();
};

module.exports = jwtAuth;
