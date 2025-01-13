var express = require("express")
var router = express.Router()
var supabase = require("./supabaseClient")


router.get("/", async (req, res) => {
    let { data, error } = await supabase
    .from('users')
    .select(`
        id,
        username,
        is_admin,
        created_at,
        auth.users (email)
    `);

    if (!error) {
        res.json({ error: null, data: users });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});



router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const role = "admin";
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        role,
    });
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});
  

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) return res.status(401).json({ error: error.message });
    res.status(200).json(data);
});

module.exports = router;