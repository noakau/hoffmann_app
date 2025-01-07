var express = require("express")
var router = express.Router()
var supabase = require("./supabaseClient")

// priority: 1=faible, 2=moyen, 3=important, 4=urgent
// status: 1=à faire, 2=en cours, 3=terminé

router.get("/get_all", async (req, res) => {
    let { data, error } = await supabase
    .from('tasks')
    .select(`*`);

    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

router.post("/create", async (req, res) => {
    const { title, description, date_start, date_end, priority, status } = req.body;


    let { data, error } = await supabase
    .from('tasks')
    .select(`*`);

    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

module.exports = router;