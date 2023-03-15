const Delivery = require("../model/Delivery");
const Package = require("../model/Package");

// Create and Save a new Delivery
exports.create = async (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const package_id = req.params.id;

	// Create a Delivery
	const newDelivery = new Delivery({
		package_id,
		pickup_time: req.body.pickup_time,
		start_time: req.body.start_time,
		end_time: req.body.end_time,
		location: req.body.location,
		status: req.body.status,
	});

	try {
		// Save Delivery in the db
		const savedDelivery = await newDelivery.save();
		await Package.findByIdAndUpdate(
			package_id,
			{ active_delivery_id: savedDelivery._id },

			{
				useFindAndModify: false,
			}
		);
		res.send(savedDelivery);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Something went wrong while creating the Delivery.",
		});
	}
};

// Retrieve all Deliverys from the database.
exports.findAll = async (req, res) => {
	try {
		// Retrieve Delivery from the db
		const allDeliverys = await Delivery.find();
		res.send({
			length: allDeliverys?.length,
			data: allDeliverys,
		});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while retrieving Deliverys.",
		});
	}
};

// Find a single Delivery with an id
exports.findOne = async (req, res) => {
	const id = req.params.id;

	try {
		// Retrieve Delivery from the db
		const delivery = await Delivery.findById(id).populate("package_id");

		if (!delivery)
			res.status(404).send({ message: "Not found Delivery with id " + id });
		else
			res.send({
				data: delivery,
			});
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while retrieving the Delivery.",
		});
	}
};

// Update a Delivery by id
exports.update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!",
		});
	}

	const id = req.params.id;

	try {
		// Retrieve and edit the Delivery
		const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, {
			useFindAndModify: false,
		});

		if (!updatedDelivery) {
			res.status(404).send({
				message: `Cannot update Delivery with id=${id}. Delivery was not found!`,
			});
		} else res.send({ message: "Delivery was updated successfully." });
	} catch (error) {
		res.status(500).send({
			message: error.message || "Error updating Delivery with id=" + id,
		});
	}
};

// Delete a Delivery with the specified id
exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		// Retrieve and delete the Delivery
		const deletedDelivery = await Delivery.findByIdAndRemove(id);

		if (!deletedDelivery) {
			res.status(404).send({
				message: `Cannot delete Delivery with id=${id}. Delivery was not found!`,
			});
		} else res.send({ message: "Delivery was deleted successfully." });
	} catch (error) {
		res.status(500).send({
			message: error.message || "Could not delete Delivery with id=" + id,
		});
	}
};
