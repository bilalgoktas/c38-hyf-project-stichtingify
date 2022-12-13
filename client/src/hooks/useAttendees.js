import { useEffect, useState } from "react";
const useAttendees = (attendeeIds) => {
  attendeeIds = attendeeIds || [];
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      attendeeIds.map(async (id) => {
        const response = await fetch(
          `${process.env.BASE_SERVER_URL}/api/user/${id}`,
          {
            credentials: "include",
          }
        );
        const resData = await response.json();
        if (!resData.success) throw new Error(resData.msg);
        return { ...resData.result, _id: id };
      })
    )
      .then((attendees) => setAttendees(attendees))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteAttendeeFromEvent = async ({ attendeeId, eventId }) => {
    try {
      const body = { userId: attendeeId, eventId };
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/events/unBook/${eventId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const resData = await response.json();
      if (!resData.success) throw new Error(resData.msg);
      const updatedAttendees = attendees.filter(
        (attendee) => attendee._id !== attendeeId
      );
      setAttendees(updatedAttendees);
    } catch (error) {
      setError(error.message);
    }
  };
  return { attendees, setAttendees, error, isLoading, deleteAttendeeFromEvent };
};

export default useAttendees;
