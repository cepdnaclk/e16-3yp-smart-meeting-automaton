const { bool } = require("@hapi/joi");
const express = require("express");
const asSchema = require("../models/ac.model");
const projectorschema = require("../models/projector.model");
const {
  acStateOperation,
  proStateOperation,
  getStateAc,
  getStatePro,
} = require("../controler/componentsControler");

//init
const router = express.Router();

//authAdmin,
router.post("/control/ac", async (req, res) => {
  if (req.body.state) {
    acStateOperation(true, req.body.id);
    console.log("Ac on");

    res.status(200).json({
      state: "Ac is on",
    });
  } else {
    acStateOperation(false, req.body.id);
    console.log("Ac off");

    res.status(200).json({
      state: "Ac is off",
    });
  }
});

router.post("/control/pro", async (req, res) => {
  if (req.body.state) {
    proStateOperation(true, req.body.id);
    console.log("Pro on");
    res.status(200).json({
      state: "Projector is on",
    });
  } else {
    proStateOperation(false, req.body.id);
    console.log("Pro off");
    res.status(200).json({
      state: "Projector is off",
    });
  }
});

router.get("/all", async (req, res) => {
  var listAc = [];
  var listPro = [];
  try {
    await asSchema.find({}, async (err, resultData) => {
      if (err) {
        console.log("Error in finding...");
        res.status(501).json({
          msg: err,
        });
      } else {
        console.log("There is data...");
        // for (let index = 0; index < resultData.length; index++) {
        //   resultData[index].set('name', 'ac');
        //   listAc.push(resultData[index]);
        //   console.log(resultData[index]['name']);

        // }
        resultData.forEach((element) => {
          // console.log(getStateAc[element._id]);
          // console.log(element._id);
          listAc.push({
            name: "ac",
            id: element._id,
            state: getStateAc(element._id),
            compId: element.compId,
          });
          // acState[element._id] = false;
        });
        // console.log(acState);
        // console.log(acState['60452c7b349ff556059fa8c1']);
        // listAc = resultData;
        // console.log(listAc);
      }
    });
    await projectorschema.find({}, async (err, resultData) => {
      if (err) {
        console.log("Error in finding...");
        res.status(501).json({
          msg: err,
        });
      } else {
        console.log("There is data...");
        resultData.forEach((element) => {
          listPro.push({
            name: "pro",
            id: element._id,
            state: getStatePro(element._id),
            compId: element.compId,
          });
          // proState[element._id] = false;
        });
        // listPro = resultData;
        // console.log(resultData);
      }
    });
    res.status(200).json({
      acList: listAc,
      proList: listPro,
    });
  } catch (error) {
    console.log("Error in finding data...");
    res.status(500).json({
      msg: error,
    });
  }
});

// router.post()
//404
router.use((req, res) => {
  res.status(404).send("404");
});

module.exports = router;
