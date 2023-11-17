let express = require("express");
let router = express.Router();

// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const RawData = require("../schema/raw-data");
const moment = require("moment");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  RawData.insertMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// find all
router.get("/", function (req, res, next) {
  RawData.find(function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// * update
router.put("/insert/:id", function (req, res, next) {
  const { id } = req.params;
  const payload = req.body;
  RawData.findByIdAndUpdate({ _id: id }, { $set: payload }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

// * delete
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  RawData.findByIdAndDelete({ _id: id }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      // res.json(rs);
      res.status(204).end();
    }
  });
});

//getLastData
router.get("/GetLastData/", async function (req, res, next) {
  try {
    let dateLast = await RawData.aggregate([
      {
        $match: {},
      },
    ])
      .sort({ Date: -1 })
      .limit(1);
  
    // let result = await RawData.aggregate([
    //   {
    //     $match: {
    //       Date: new Date(dateLast[0]?.Date)
    //       // Date : moment(dateLast[0]?.Date).format()
    //     },
    //   },
    // ])
    
    res.json(dateLast);
  } catch (error) {
    res.json(error);
  }
});

router.get("/CheckData/", async function (req, res, next) {
  try {
    let dateLast = await RawData.aggregate([
      {
        $match: {},
      },
    ])
      .sort({ Date: -1 })
      .limit(1);
  
    let result = await RawData.aggregate([
      {
        $match: {
          Date: new Date(dateLast[0]?.Date)
          // Date : moment(dateLast[0]?.Date).format()
        },
      },
    ])
    let data = {
      date : result[0]?.Date,
      // value: result.length
    }
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});



// deleteAll()
router.delete("/", async function (req, res, next) {
  let data = await RawData.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  RawData.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  RawData.deleteMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

module.exports = router;
