import Event from "../models/event.js";

export const isAttend = async (userId, EventId) => {
  try {
    const event = await Event.findOne({
      _id: EventId,
      attendeeIds: { $in: userId },
    });
    if (event) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
