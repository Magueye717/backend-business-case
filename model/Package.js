const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema({
	active_delivery_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Delivery",
	},
	deliveries: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Delivery",
		},
	],
	description: {
		type: String,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
	width: {
		type: Number,
		required: true,
	},
	height: {
		type: Number,
		required: true,
	},
	depth: {
		type: Number,
		required: true,
	},
	from_name: {
		type: String,
		required: true,
	},
	from_address: {
		type: String,
		required: true,
	},
	from_location: {
		lat: { type: String },
		lng: { type: String },
	},
	to_name: {
		type: String,
		required: true,
	},
	to_address: {
		type: String,
		required: true,
	},
	to_location: {
		lat: { type: String },
		lng: { type: String },
	},
});

module.exports = mongoose.model("Package", PackageSchema);
