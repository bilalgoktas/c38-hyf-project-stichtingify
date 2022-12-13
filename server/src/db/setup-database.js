import connectDB, { closeConnection } from "./connectDB.js";
import { logError, logInfo } from "../util/logging.js";
// Models
import User from "../models/user.js";
import Event from "../models/event.js";
import Category from "../models/category.js";
// Datasets
import users from "./datasets/users.js";
import categories from "./datasets/categories.js";
import events from "./datasets/events.js";

const buildEvents = (
  originalEventList,
  categoryDocs,
  attendeeDocs,
  organizerDocs
) => {
  const updatedEvents = originalEventList.map((event) => {
    // Set OrganizerId
    if (event.organizerName) {
      const organizerDoc = organizerDocs.find(
        (organizer) => organizer.name === event.organizerName
      );
      event.organizerId = organizerDoc._id.toString();
      delete event.organizerName;
    }

    // Set categoryIds
    if (
      Array.isArray(event.categoryNames) &&
      event.categoryNames.length !== 0
    ) {
      const selectedCategoryIds = event.categoryNames.reduce(
        (prevVal, curVal) => {
          const selectedCatDoc = categoryDocs.find(
            (catDoc) => catDoc.name === curVal
          );
          return [...prevVal, selectedCatDoc._id];
        },
        []
      );
      event.categoryIds = selectedCategoryIds;
      delete event.categoryNames;

      // Set attendeeIds
      if (
        Array.isArray(event.attendeeNames) &&
        event.attendeeNames.length !== 0
      ) {
        const selectedAttendeeIds = event.attendeeNames.reduce(
          (prevVal, curVal) => {
            const selectedAttendeeDoc = attendeeDocs.find(
              (attendeeDoc) => attendeeDoc.name === curVal
            );
            return [...prevVal, selectedAttendeeDoc._id.toString()];
          },
          []
        );
        event.attendeeIds = selectedAttendeeIds;
        delete event.attendeeNames;
      }
    }
    return event;
  });
  return updatedEvents;
};

const main = async () => {
  try {
    connectDB();

    /*===== CATEGORIES =====*/

    // Delete all categories
    const deletedCategories = await Category.deleteMany({});
    logInfo(`-- Delete ${deletedCategories.deletedCount} categories`);

    // Add categories
    const catDocs = await Category.insertMany(
      categories.map((catStr) => ({ name: catStr }))
    );
    logInfo(`-- Add ${catDocs.length} categories`);

    /*===== USERS =====*/

    // Delete all users
    const deletedUsers = await User.deleteMany({});
    logInfo(`-- Delete ${deletedUsers.deletedCount} users`);

    // Add users
    const userDocs = await User.insertMany(users);
    logInfo(`-- Add ${userDocs.length} users`);
    const attendeeDocs = userDocs.filter((user) => user.role === "attendee");
    const organizerDocs = userDocs.filter((user) => user.role === "organizer");

    /*===== EVENTS =====*/

    // Delete all events
    const deletedEvents = await Event.deleteMany({});
    logInfo(`-- Delete ${deletedEvents.deletedCount} events`);

    // Add events
    const finalEvents = buildEvents(
      events,
      catDocs,
      attendeeDocs,
      organizerDocs
    );
    const eventDocs = await Event.insertMany(finalEvents);
    logInfo(`-- Add ${eventDocs.length} events`);

    // Update organizers' eventIds
    let updateCounter = 0;
    for await (const orgDoc of organizerDocs) {
      const id = orgDoc._id.toString();
      const eventIds = finalEvents.reduce((prevVal, currVal) => {
        if (currVal.organizerId === id) {
          const eventId = currVal.organizerId;
          return [...prevVal, eventId];
        }
        return prevVal;
      }, []);
      if (eventIds.length !== 0) {
        orgDoc.eventIds = eventIds;
        await orgDoc.save();
        updateCounter++;
      }
    }
    logInfo(`-- Update ${updateCounter} organizers`);

    // Update attendees' eventIds
    updateCounter = 0;
    for await (const attDoc of attendeeDocs) {
      const id = attDoc._id.toString();
      const eventIds = eventDocs.reduce((prevVal, currVal) => {
        const hasAttId = currVal.attendeeIds.includes(id);
        if (hasAttId) {
          const eventId = currVal._id.toString();
          return [...prevVal, eventId];
        }
        return prevVal;
      }, []);
      attDoc.eventIds = eventIds;
      await attDoc.save();
      updateCounter++;
    }
    logInfo(`-- Update ${updateCounter} attendees`);
  } catch (error) {
    logError(error);
  } finally {
    await closeConnection();
  }
};

main();
