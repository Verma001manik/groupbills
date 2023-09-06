    const express = require('express');
    const BillRouter = require('./services/Bills');

    const cors = require('cors');

    const app = express();
    app.use(express.json());
    app.use(express.static('build'));
    app.use(cors());
    app.use(express.static('dist'));
    app.use('/api/bills', BillRouter);
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });
    const PORT =  process.env.PORT || 3001;
    app.listen(PORT, ()=>{
        console.log(`port started on ${PORT}`)
    })