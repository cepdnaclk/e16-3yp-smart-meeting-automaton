const express = require("express");

//init
const router = express.Router();

//authAdmin,
router.post("/control/ac", async (req, res) => {
    if(req.data){
        //code to on ac
        console.log('Ac on');
        
        res.status(200).json({
            'state': 'Ac is on'
        });
    }
    else{
        //code to stop ac
        console.log('Ac off');

        res.status(200).json({
            'state': 'Ac is off'
        });
    }
    
});

router.post("/control/pro", async (req, res) => {
    if(req.body.state){
        //code to on pro
        console.log('Pro on');
        res.status(200).json({
            'state': 'Projector is on'
        });
    }
    else{
        //code to stop pro
        console.log('Ac off');
        res.status(200).json({
            'state': 'Projector is off'
        });
    }
    
});

module.exports = router;
