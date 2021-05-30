const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });
    }
    const varified = jwt.varify(token, `${process.env.JWT_SECRET}`);
    if (!varified) {
      return res
        .status(401)
        .jsonn({ msg: "Token verification failed, authorization denied" });
    }
    req.user = varified.id;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
