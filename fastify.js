const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  },
];
//Get a request
//Do something with that request
//return a response

// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

//student/id route
fastify.get("/cit/student/:id", (request, reply) => {
  //recieve request a student id x (s)
  //do something with that request get the student
  //give a reply <- sedn teh student s back to the client
  studentIDFromClient = request.params.id;
  let studentToSendToClient = null;
  for (studentInArray of students) {
    if (studentInArray.id == studentIDFromClient) {
      studentToSendToClient = studentInArray;
      break;
    }
  }
  //give a reply <- send the student s back to the client
  if (studentToSendToClient != null) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(studentToSendToClient);
  } else {
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("Could not find student document");
  }
});

//student/id route
fastify.post("/cit/students/add", (request, reply) => {
  console.log(request);
  let dataFromCLient = JSON.parse(request.body);
  console.log(dataFromCLient);
  let maxID = 0;
  for (individualStudent of students) {
    if (maxID < individualStudent.id) {
      maxID = individualStudent.id;
    }
  }

  generatedStudent = {
    id: maxID + 1,
    last: dataFromCLient.lname,
    first: dataFromCLient.fname,
  };

  students.push(generatedStudent);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(generatedStudent);
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
