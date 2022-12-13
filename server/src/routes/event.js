import { Router } from "express";
import { multerUploads } from "../middlewares/multerUpload.js";
import {
  getEvents,
  createEvent,
  updateEvent,
  getEvent,
  bookAnEvent,
  deleteEvent,
  unBookAnEvent,
  upcomingEvent,
  myEvents,
} from "../controllers/event.js";

const eventRouter = Router();

// Get Upcoming Events
eventRouter.get("/upcomingevents", upcomingEvent);
// Get My Events
eventRouter.get("/myevents", myEvents);
// Get One Event
eventRouter.get("/:id", getEvent);
// Get events
eventRouter.get("/", getEvents);
// Book An Event
eventRouter.put("/book", bookAnEvent);
// UnBook Event
eventRouter.put("/unBook/:id", unBookAnEvent);
// Edit Event
eventRouter.put("/:id", multerUploads.single("thumbnailUrl"), updateEvent);
// Create Event
eventRouter.post("/", multerUploads.single("thumbnailUrl"), createEvent);
// Delete an event
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
