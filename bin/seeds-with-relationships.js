const mongoose = require('mongoose');
const Job = require('../models/Job.model');
const Company = require('../models/Company.model');



const jobs = [
  {
    title: "Front-end junior developer",
    company: "Google-Spain",
    location: "Madrid",
    description: "front-end developer with 6 months of experience",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    salary: 3000,
    rating: 8,
    
 }, 
 {
    title: "Back-end junior developer",
    company: "Facebook-Germany",
    location: "Berlin",
    description: "front-end developer with 6 months of experience",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    salary: 3500,
    rating: 5,
    
}
];


const companies= [
  {
    name: "Google-Spain",
    url: "https://mongoosejs.com/docs/schematypes.html#schematype-options",
    description: "new company in tech",
    rating: 8,
    established: 1999
  },
  { 
  name: "Facebook-Germany",
  url: "https://facebook.com",
  description: "social media company",
  rating: 5,
  established: 2005
  }
]

async function seedData() {
  try {

      /* CONNECT */
      const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/LFJob-project';
      const conn = await mongoose.connect(MONGO_URI);
      console.log(`Connected to Mongo! Database name: "${conn.connections[0].name}"`);


      /* DELETE EXISTING DATA */
      // const deletedBooks = await Book.deleteMany({}); //WARNING: this will delete all books in your DB !!
      // const deletedAuthors = await Author.deleteMany({}); //WARNING: this will delete all authors in your DB !!
      // console.log(deletedBooks, deletedAuthors);


      /* Seed authors */
      const companiesCreated = await Company.insertMany(companies);
      console.log(`Number of authors created... ${companiesCreated.length} `);


      /* Seed books */
      /* (for each book, we need to find the objectId of its author) */

      const jobsWithIds = []; //will be an array of objects (each object contains the details of a book, including the author id)

      for(const jobObj of jobs){
          const company = jobObj.company;
          const companyDetails = await Company.findOne({name: company});
          const companyId = companyDetails._id;


          const newJob = {
            title: jobObj.title,
            companyName: jobObj.company,
            description: jobObj.description,
            location: jobObj.location,
            details: jobObj.details,
            salary: jobObj.salary,
            rating: jobObj.rating,
            company: companyId
          }
          jobsWithIds.push(newJob);
      }


        const jobsCreated = await Job.insertMany(jobsWithIds);
        console.log(`Number of jobs created... ${jobsCreated.length} `);


      /* CLOSE DB CONNECTION */
      mongoose.connection.close();

  } catch (e) {
      console.log("error seeding data in DB....", e)
  }
}

seedData();