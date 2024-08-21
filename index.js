require("dotenv").config();
const PORT = 5000;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
