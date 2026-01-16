const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

/**
 * GET /api/leads
 * search, filter, pagination
 */
router.get("/", async(req, res) => {
    try {
        const { search, status, page = 1, limit = 10 } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { company: { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            query.status = status;
        }

        const leads = await Lead.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Lead.countDocuments(query);

        res.json({
            total,
            page: Number(page),
            limit: Number(limit),
            leads
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * GET /api/leads/:id
 */
router.get("/:id", async(req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.json(lead);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;