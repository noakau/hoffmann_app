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



router.post("/register", async (req, res) => {
    const { email, password, nom, prenom } = req.body;
  
    // Créer un utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
  
    
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id: authData.user.id,
          nom,
          prenom,
          email,
        },
      ]);
  
    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }
  
    res.status(200).json({ message: "Compte créé avec succès !" });
  });
  module.exports = router;