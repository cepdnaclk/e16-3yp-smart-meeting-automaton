const express = require("express");
const asSchema = require("../models/ac.model");
const projectorschema = require("../models/projector.model");

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

router.get("/all", async(req, res)=>{
    const listAc = [];
    const listPro = [];
    try {
        asSchema.find({}, async(err, resultData)=>{
            if(err){
                console.log("Error in finding...");
                res.status(501).json({
                    'msg': err
                });
            }
            else{
                console.log("There is data...");
                listAc = resultData;
            }
        });
        projectorschema.find({}, async(err, resultData)=>{
            if(err){
                console.log("Error in finding...");
                res.status(501).json({
                    'msg': err
                });
            }
            else{
                console.log("There is data...");
                listPro = resultData;
            }
        });
        res.status(200).json({
            acList: listAc,
            proList: listPro
        });
    } catch (error) {
        console.log("Error in finding data...");
        res.status(500).json({
            'msg': error
        });
    }
});

// router.post()

module.exports = router;
