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

router.get("/get/:uuid", async (req, res) => {
    const task_uuid = req.params.uuid
    let { data, error } = await supabase
    .from('tasks')
    .select(`*`)
    .eq("id", task_uuid);

    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

router.post("/add", async (req, res) => {
    const { title, description, date_start, date_end, priority, status } = req.body;

    let { data, error } = await supabase
    .from('tasks')
    .insert([
        {
            title: title, 
            description: description, 
            date_start: date_start,
            date_end: date_end,
            priority: priority,
            status: status
        }
    ])
    .select();

    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

router.delete("/delete", async (req, res) => {
    const { id } = req.body;

    let { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq("id", id);

    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

router.put("/edit", async (req, res) => {
    const { id, title, description, date_start, date_end, priority, status } = req.body;

    let { data, error } = await supabase
    .from('tasks')
    .update({
        title: title, 
        description: description, 
        date_start: date_start,
        date_end: date_end,
        priority: priority,
        status: status
    })
    .eq('id', id)
    .select();


    if (!error) {
        res.json({ error: null, data: data });
    } else {
        console.error(error);
        res.json({ error: error.message, data: null });
    }
});

module.exports = router;