

// Import necessary packages and modules

const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./config/dbConfig.js');

var corOptions = {
  origin: 'https://localhost:8081'
}

//middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//testing api
app.get('/',(req,res)=>{
  res.json({message: 'hello from api'})
})

//Port
const PORT = process.env.PORT || 8000

// // import controllers
// const agentController = require('./controllers/agentController');
// const billController = require('./controllers/billController');
// const paymentController = require('./controllers/paymentController');
// const serviceController = require('./controllers/serviceController');
// const userController = require('./controllers/userController');
// const agentHistoryController = require('./controllers/agentHistoryController');
// const serviceHistoryController = require('./controllers/serviceHistoryController');
// const userHistoryController = require('./controllers/userHistoryController');

// // set up routes
// app.use('/agents', agentController);
// app.use('/bills', billController);
// app.use('/payments', paymentController);
// app.use('/services', serviceController);
// app.use('/users', userController);
// app.use('/agentHistory', agentHistoryController);
// app.use('/serviceHistory', serviceHistoryController);
// app.use('/userHistory', userHistoryController);

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connection.connect(function(err){
    if (err) throw err;
    console.log('database connected');

  })
});
