// test-verify.js

const bcrypt = require("bcryptjs");

(async () => {
  const plain = "SysAdmin@123";
  const hash = await bcrypt.hash(plain, 10);
  console.log("New hash for SysAdmin@123:", hash);
})();

