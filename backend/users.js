var express = require("express")
var router = express.Router()
var supabase = require("./supabaseClient")
const { generateToken, authenticateToken } = require("./authService");

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

router.get('/user/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('users')
        .select(`
            id,
            username,
            created_at
        `)
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({ error: error.message });
    }

    res.status(200).json({ user: data });
});




router.post('/admin/create-user', authenticateToken, async (req, res) => {
    const { email, password, username } = req.body;
    // console.log(req.user)
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    
    const { data: authData, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    
    const { data: userInfo, error: userError } = await supabase
      .from('users')
      .insert([{ id: authData.user.id, username, is_admin:false }]);
    
    if (userError) return res.status(400).json({ error: userError.message });
  
    res.status(201).json({ message: "User created successfully", user: userInfo });
});
  
router.delete('/admin/delete-user/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    // Delete from public.users
    const { error: publicUserError } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

    if (publicUserError) {
        return res.status(400).json({ error: publicUserError.message });
    }

    // Delete from auth.users
    const { error: authUserError } = await supabase.auth.admin.deleteUser(id);

    if (authUserError) {
        return res.status(400).json({ error: authUserError.message });
    }

    res.status(200).json({ message: "User deleted successfully" });
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !authData.user) return res.status(401).json({ error: error?.message || 'Invalid credentials' });

    // Fetch user details from the 'users' table using the user's ID
    const { data: userData, err } = await supabase
        .from('users')
        .select('id, username, is_admin, created_at')
        .eq('id', authData.user.id)
        .single();  // Use .single() to get a single user record directly

    if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch user details' });
    }

    const tokenPayload = {
        id: userData.id,
        username: userData.username,
        is_admin: userData.is_admin,
        email: authData.user.email,  // Add the email from authData
    };

    const token = generateToken(tokenPayload);
    res.status(200).json({ message: "Login successful", token});
});


module.exports = router;