const mongoose = require("mongoose");

const DeliverySchema = mongoose.Schema({
	package_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Package",
	},
	pickup_time: {
		type: String,
		required: true,
	},
	start_time: {
		type: String,
		required: true,
	},
	end_time: {
		type: String,
		required: true,
	},
	location: {
		lat: { type: String },
		lng: { type: String },
	},
	status: {
		type: String,
		enum: ["open", "picked-up", "in-transit", "delivered", "failed"],
		default: "open",
		required: true,
	},
});

module.exports = mongoose.model("Delivery", DeliverySchema);
