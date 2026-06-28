const mongoose = require('mongoose');
require('dotenv').config();

const Budget = require('./models/Budget');
const Plan = require('./models/Plan');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    await Budget.deleteMany({});
    await Plan.deleteMany({});
    console.log('Cleared existing database records.');

    const savedBudgets = await Budget.insertMany([
      { name: "Paris Trip 2025" },  
      { name: "Tokyo Summer" },    
      { name: "Road Trip USA" }    
    ]);
    console.log('Budgets seeded successfully!');

    const plansData = [
      {
        slug: "plan-001",
        budgetId: savedBudgets[0]._id, 
        date: "2025-07-14",
        tags: ["Sightseeing", "Culture"],
        items: [
          { description: "Visit Eiffel Tower at sunrise", isCompleted: true, isMandatory: true },
          { description: "Louvre Museum — 2hr slot booked", isCompleted: false, isMandatory: true },
          { description: "Seine River evening cruise", isCompleted: false, isMandatory: false },
          { description: "Buy croissants at Poilâne bakery", isCompleted: true, isMandatory: false },
        ],
      },
      {
        slug: "plan-002",
        budgetId: savedBudgets[0]._id, 
        date: "2025-07-15",
        tags: ["Food", "Evening"],
        items: [
          { description: "Montmartre walking tour (3hrs)", isCompleted: false, isMandatory: true },
          { description: "Lunch reservation at Le Comptoir", isCompleted: false, isMandatory: true },
          { description: "Sacré-Cœur sunset photos", isCompleted: false, isMandatory: false },
        ],
      },
      {
        slug: "plan-003",
        budgetId: savedBudgets[1]._id, 
        date: "2025-08-03",
        tags: ["Temples", "Food"],
        items: [
          { description: "Senso-ji Temple early morning visit", isCompleted: true, isMandatory: true },
          { description: "Shibuya crossing at dusk", isCompleted: false, isMandatory: true },
          { description: "Ramen at Ichiran Shibuya", isCompleted: false, isMandatory: false },
          { description: "TeamLab Planets tickets pre-booked", isCompleted: false, isMandatory: false },
        ],
      },
      {
        slug: "plan-004",
        budgetId: savedBudgets[2]._id, 
        date: "2025-09-20",
        tags: ["Nature", "Hiking"],
        items: [
          { description: "Grand Canyon South Rim hike (Bright Angel trail)", isCompleted: false, isMandatory: true },
          { description: "Pack extra water (3L per person)", isCompleted: false, isMandatory: true },
          { description: "Sunset photos at Yavapai Point", isCompleted: false, isMandatory: false },
          { description: "Book Phantom Ranch dinner in advance", isCompleted: true, isMandatory: false },
        ],
      },
    ];

    await Plan.insertMany(plansData);
    console.log('Plans seeded successfully!');

    mongoose.connection.close();
    console.log('Database connection closed. Seeding complete!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();