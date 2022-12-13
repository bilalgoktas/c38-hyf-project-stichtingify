export const date = async (req) => {
  let query = {};
  let today = new Date();
  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  query["startDate"] = { $gte: today, $lte: oneYearFromNow };
  if (!req?.session?.user || req?.session?.user?.role === "attendee") {
    query["status"] = "published";
  }
  return query;
};
