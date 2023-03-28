const Delivery = require("../model/Delivery");
const Package = require("../model/Package");

// Create and Save a new Package
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //get the active delivery id
  const active_delivery_id = req.params.id;

  // Create a Package
  const newPackage = new Package({
    active_delivery_id,
    description: req.body.description,
    weight: req.body.weight,
    width: req.body.width,
    height: req.body.height,
    depth: req.body.depth,
    from_name: req.body.from_name,
    from_address: req.body.from_address,
    from_location: req.body.from_location,
    to_name: req.body.to_name,
    to_address: req.body.to_address,
    to_location: req.body.to_location,
  });

  try {
    // Save Package in the database
    const package = await newPackage.save();

    //Add the active delivery to the deliveries
    active_delivery_id && package.deliveries.push(active_delivery_id);

    //update the delivery
    if (active_delivery_id) {
      await Delivery.findByIdAndUpdate(
        active_delivery_id,
        {
          $set: { package_id: package._id },
        },
        {
          runValidators: true,
        }
      );
    }
    res.send(package);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something went wrong while creating the Package.",
    });
  }
};

// Retrieve all Packages from the database.
exports.findAll = async (req, res) => {
  try {
    // Retrieve Package from the db
    const allPackages = await Package.find();
    res.send({
      length: allPackages?.length,
      data: allPackages,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving Packages.",
    });
  }
};

// Find a single Package by id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve Package from the db
    const package = await Package.findById(id);

    if (!package)
      res.status(404).send({ message: "Not found Package with id " + id });
    else
      res.send({
        data: package,
      });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving the Package.",
    });
  }
};

// Update a package by id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    // Retrieve and edit the Package
    const updatedPackage = await Package.findOneAndUpdate(
      { _id: id },
      req.body
    );

    if (!updatedPackage) {
      res.status(404).send({
        message: `Cannot update Package with id=${id}. Package was not found!`,
      });
    } else res.send({ message: "Package was updated successfully." });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error updating Package with id=" + id,
    });
  }
};

// Delete a Package with the specified id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve and delete the Package
    const deletedPackage = await Package.findByIdAndRemove(id);

    if (!deletedPackage) {
      res.status(404).send({
        message: `Cannot delete Package with id=${id}. Package was not found!`,
      });
    } else res.send({ message: "Package was deleted successfully." });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete Package with id=" + id,
    });
  }
};
