import mongoose from "mongoose";

const { Schema } = mongoose;
const eventSchema = new Schema({
  organizerId: { type: Schema.Types.ObjectId, required: true },
  thumbnailUrl: String,
  status: { type: String, enum: ["published", "draft"], required: true },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    postalCode: { type: String, required: true }, //regex validation needed for postal code. e.g.: 3025AB
  },
  price: { type: Number, min: 0, max: 1000, required: true },
  capacity: { type: Number, in: 1, max: 1000, required: true },
  startDate: { type: Date, required: true }, // 2022-10-29T20:31:31.115Z
  endDate: { type: Date, required: true },
  attendeeIds: [Schema.Types.ObjectId],
  categoryIds: { type: [Schema.Types.ObjectId], required: true },
  languagesOfEvent: { type: [String], required: true },
  details: [
    {
      language: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      toBring: [String],
      rules: [String],
    },
  ],
});

const Event = mongoose.model("event", eventSchema);

export default Event;
