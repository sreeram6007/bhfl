import express from 'express';
const app = express();
app.use(express.json());

const USER_ID = "john_doe_17091999";     // <-- change to yours
const EMAIL   = "john@xyz.com";          // <-- change to yours
const ROLL    = "ABCD123";               // <-- change to yours

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) return res.status(400).json({ is_success: false });

    const even = [], odd = [], alphas = [], specials = [];
    let sum = 0;
    let alphaConcat = '';

    data.forEach(s => {
      const n = Number(s);
      if (!isNaN(n)) {
        sum += n;
        (n % 2 ? odd : even).push(s);
      } else if (/^[A-Za-z]+$/.test(s)) {
        const upper = s.toUpperCase();
        alphas.push(upper);
        alphaConcat += upper;
      } else {
        specials.push(s);
      }
    });

    const concatString = [...alphaConcat]
      .reverse()
      .map((c, i) => (i % 2 ? c.toLowerCase() : c))
      .join('');

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphas,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: concatString
    });
  } catch {
    res.status(400).json({ is_success: false });
  }
});
export default app;
