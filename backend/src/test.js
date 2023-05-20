const jwt = require('jsonwebtoken');
const secretKey = `57.wHTf.lgsM%cujXgty^%/KC2N'Jfu&>A4!Y]cg^7w.:-.vXOe"V"POj[kN(UP`;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiZW1haWwiOiJ0aGFuaHRyb2xsQGdtYWlsLmNvbSIsImlhdCI6MTY4MTY1ODQ3MywiZXhwIjoxNjg0MjUwNDczfQ.9P7bF6wSgKUOlW3NZ01vtQ_Pj-3ZrjCwr68z5yYjzwo';

try {
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded);
} catch(err) {
  console.error(err);
}
