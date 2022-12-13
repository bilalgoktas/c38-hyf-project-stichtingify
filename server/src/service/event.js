import { RecordNotFoundError } from "../../error/appErrors.js";
import Event from "../models/event.js";

export const filterEvents = (req) => {
  let today = new Date();
  let query = { startDate: { $gte: today }, status: "published" };
  let catIds = [];
  let languages = [];
  let endDate = req.query.startDate;
  endDate = endDate + "T23:59:59";
  if (req.query.languages) {
    languages = req.query.languages.split(",");
  }
  if (req.query.category) {
    catIds = req.query.category.split(",");
  }
  req.query.category ? (query["categoryIds"] = { $in: catIds }) : "";
  req.query.languages ? (query["languagesOfEvent"] = { $in: languages }) : "";
  req.query.city ? (query["address.city"] = req.query.city) : "";
  req.query.price
    ? Number(req.query.price) > 0
      ? (query["price"] = { $gt: 0 })
      : (query["price"] = { $eq: 0 })
    : "";
  req.query.startDate
    ? (query["startDate"] = { $gte: req.query.startDate, $lte: endDate })
    : "";
  return query;
};

export const myEventsFilter = (user) => {
  let query = {};
  if (user.role === "organizer") {
    query["organizerId"] = user._id;
  } else {
    query["attendeeIds"] = user._id;
  }
  return query;
};

export const getEventFunction = async (id, userId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    let event = await Event.findById(id);
    if (!event) throw new RecordNotFoundError(id);
    let numberOfAttendees = event.attendeeIds.length;
    if (userId !== event.organizerId.toString()) {
      delete event._doc.attendeeIds;
      event = {
        ...event._doc,
        numberOfAttendees,
      };
    }
    return event;
  } catch (error) {
    throw error;
  }
};
