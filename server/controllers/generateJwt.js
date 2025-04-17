import jwt from "jsonwebtoken";
const generateJwt = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});

  return token;
};
export default generateJwt;
