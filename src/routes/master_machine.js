let express = require("express");
let router = express.Router();
// ! USE --------------------- Set VARIABLE ------------------------------------------------------------------------

const MasterMC = require("../schema/master_machine");

// ? ------------------------------------------------------ Master
// * add
router.post("/", function (req, res, next) {
  const payload = req.body;
  MasterMC.insertMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});


// find all
router.get("/", function (req, res, next) {
  MasterMC.find(function (err, rs) {
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
  MasterMC.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    function (err, rs) {
      if (err) {
        res.json(err);
      } else {
        res.json(rs);
      }
    }
  );
});

// * delete
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;
  MasterMC.findByIdAndDelete({ _id: id }, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      // res.json(rs);
      res.status(204).end();
    }
  });
});

//getLastData
router.get("/lastData/", function (req, res, next) {
  MasterMC
    .aggregate([
      {
        $match: {},
      },
    ])
    .sort({ registerNo: -1 })
    .limit(1)
    .exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

// deleteAll()
router.delete("/", async function (req, res, next) {
  let data = await MasterMC.deleteMany({});
  // console.log(data);
  res.json(data);
});

//find
router.post("/getByCondition", function (req, res, next) {
  const payload = req.body;
  MasterMC.find(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});

router.post("/DelByCondition", function (req, res, next) {
  const payload = req.body;
  MasterMC.deleteMany(payload, function (err, rs) {
    if (err) {
      res.json(err);
    } else {
      res.json(rs);
    }
  });
});




module.exports = router;
