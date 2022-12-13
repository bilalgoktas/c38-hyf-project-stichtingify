import Event from "../models/event.js";
import Users from "../models/user.js";
import { uploadImage } from "../service/image.js";
import { sendEmail } from "../service/email.js";
import {
  filterEvents,
  myEventsFilter,
  getEventFunction,
} from "../service/event.js";
import { date } from "../service/date.js";
import { isAttend } from "../service/isAttend.js";
import { RecordNotFoundError, NoFoundError } from "../../error/appErrors.js";

export const getEvents = async (req, res, next) => {
  const query = filterEvents(req);
  try {
    const events = await Event.find(query).sort({ startDate: -1 });
    if (events.length == 0) throw new NoFoundError("Events");
    res.status(200).json({ result: events, success: true });
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await getEventFunction(req.params.id, req.session?.user?._id);
    res.status(200).json({
      result: event,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  let userId = req.session.user._id;
  let query = JSON.parse(req.body.event);
  query = {
    ...query,
    organizerId: userId,
  };
  if (req.file) {
    const image = await uploadImage(req);
    query = {
      ...query,
      thumbnailUrl: image,
    };
  }
  try {
    const event = new Event(query);
    await event.save();
    res.status(201).json({
      result: event,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  let query = JSON.parse(req.body.event);
  if (req.file) {
    const image = await uploadImage(req);
    query = {
      ...query,
      thumbnailUrl: image,
    };
  }
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, query);
    if (!event) throw new RecordNotFoundError(req.params.id);
    res.status(200).json({ result: event, success: true });
  } catch (error) {
    next(error);
  }
};

export const bookAnEvent = async (req, res, next) => {
  try {
    const checkAttend = await isAttend(req.body.userId, req.body.eventId);
    if (checkAttend) {
      res.status(400).json({
        msg: "The event is already booked",
        success: false,
      });
    } else {
      const user = await Users.findByIdAndUpdate(
        req.body.userId,
        { $push: { eventIds: req.body.eventId } },
        { new: true, upsert: true }
      );
      if (!user) throw new RecordNotFoundError(req.body.userId, "User");
      const event = await Event.findByIdAndUpdate(
        req.body.eventId,
        { $push: { attendeeIds: req.body.userId } },
        { new: true, upsert: true }
      );
      if (!event) throw new RecordNotFoundError(req.body.eventId);
      let query = {
        user: user,
        event: event,
      };
      sendEmail(query);
      res.status(200).json({ msg: "Booked", success: true });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) throw new RecordNotFoundError(eventId);
    event.attendeeIds.forEach(
      async (id) =>
        await Users.findByIdAndUpdate(id, {
          $pull: { eventIds: eventId },
        })
    );
    res.status(200).json({ msg: "Deleting the event is done!", success: true });
  } catch (error) {
    next(error);
  }
};

export const unBookAnEvent = async (req, res, next) => {
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  try {
    const event = await Event.findByIdAndUpdate(eventId, {
      $pull: { attendeeIds: userId },
    });
    const user = await Users.findByIdAndUpdate(userId, {
      $pull: { eventIds: eventId },
    });
    if (!event || !user) {
      throw new RecordNotFoundError(
        !event ? eventId : userId,
        !user ? "User" : ""
      );
    }
    res.status(200).json({
      msg: "UnBooking event is done!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const upcomingEvent = async (req, res, next) => {
  const query = await date(req);
  try {
    const upcomingEvents = await Event.find(query)
      .sort({ startDate: 1 })
      .limit(4);
    if (upcomingEvents.length == 0) throw new NoFoundError("Upcoming events");
    res.status(200).json({ result: upcomingEvents, success: true });
  } catch (error) {
    next(error);
  }
};

export const myEvents = async (req, res, next) => {
  const query = myEventsFilter(req.session.user);
  try {
    const events = await Event.find(query);
    if (events.length == 0) throw new NoFoundError("Events");
    res.status(200).json({ result: events, success: true });
  } catch (error) {
    next(error);
  }
};
