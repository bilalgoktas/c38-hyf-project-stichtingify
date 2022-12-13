import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (query) => {
  let userMessage = `<h3>Dear ${query.user.name},</h3> welcome to <a href='http://c38-group3.herokuapp.com/main-page'>Stichtingify</a>!<br /><br /> <strong>Your ID:</strong> ${query.user._id}<br /><br /> Have a nice day!<br />Stichtingify`;
  let confirmMessage = "";
  if (query.event) {
    let date = query.event.startDate.toString();
    date = date.slice(0, 21);
    confirmMessage = `<h3>Dear ${query.user.name},</h3> You have been registered for <a href='https://c38-group3.herokuapp.com/events/${query.event._id}'>${query.event.details[0].title}</a>,  which will take place at  ${query.event.address.street} ${query.event.address.number}, ${query.event.address.postalCode}, ${query.event.address.city} on ${date}.<br />Your identification number is ${query.user._id}.<br /><br /> Have a nice day!<br />Stichtingify`;
  }
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY,
    apiSecret: process.env.MAILJET_API_SECRET,
  });
  const email = process.env.MAILJET_EMAIL;
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: email,
          Name: "Stichtingify",
        },
        To: [
          {
            Email: query.user.email,
            Name: query.user.name,
          },
        ],
        Subject: query.event
          ? "Event is booked successfully"
          : "Greetings from Stichtingify.",
        HTMLPart: query.event ? confirmMessage : userMessage,
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
};
