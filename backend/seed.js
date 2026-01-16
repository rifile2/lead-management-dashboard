const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config();
const Lead = require("./models/Lead");

const statuses = ["new", "contacted", "converted", "lost"];

async function seedLeads() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Lead.deleteMany();

        const leads = [];

        for (let i = 0; i < 500; i++) {
            leads.push({
                name: faker.name.findName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
                company: faker.company.companyName(),
                status: statuses[Math.floor(Math.random() * statuses.length)],
                source: faker.company.bs()
            });
        }

        await Lead.insertMany(leads);
        console.log(" 500 Leads Seeded Successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seedLeads();