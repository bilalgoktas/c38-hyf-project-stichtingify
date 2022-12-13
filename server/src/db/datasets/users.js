// 'eventIds' will be added based on events dataset

const users = [
  {
    name: "Stichting MANO",
    imageUrl:
      "https://res.cloudinary.com/dmtrapjjh/image/upload/v1669582261/MANO_mta6o1.png",
    role: "organizer",
    email: "stichting.mano@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0602929232",
  },
  {
    name: "Coolhaven Connect",
    imageUrl: "",
    role: "organizer",
    email: "coolhaven.connect@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0699756127",
  },
  {
    name: "Dutch Council for Refugees",
    imageUrl:
      "https://res.cloudinary.com/dmtrapjjh/image/upload/v1669582192/DucthCouncil_b9orhk.png",
    role: "organizer",
    email: "dutch.council@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0672265078",
  },
  {
    name: "Dutch Connections",
    imageUrl:
      "https://res.cloudinary.com/dmtrapjjh/image/upload/v1669582232/DutchConnections_w8ylpi.png",
    role: "organizer",
    email: "dutch.onnections@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0649889745",
  },
  {
    name: "Heart 4 Refugees",
    imageUrl:
      "https://res.cloudinary.com/dmtrapjjh/image/upload/v1669582286/Heart4Refugees_umqsz3.png",
    role: "organizer",
    email: "heart4refugees@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0601300465",
  },
  {
    name: "Scott Lucas",
    imageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "scott.lucas@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0676865518",
    role: "attendee",
  },
  {
    name: "Alex Thompson",
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "attendee",
    phone: "0629130719",
    email: "alex.thompson@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
  {
    name: "Beverly Little",
    imageUrl: "https://randomuser.me/api/portraits/women/62.jpg",
    role: "attendee",
    phone: "0666609784",
    email: "beverly.little@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
  {
    name: "Harper Carroll",
    imageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    role: "attendee",
    phone: "0666043451",
    email: "harper.carroll@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
  {
    name: "Abdullah Cavit",
    imageUrl: "https://randomuser.me/api/portraits/men/57.jpg",
    role: "attendee",
    phone: "0675469390",
    email: "abdullah.cavit@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
  {
    name: "Faik Yilmaz",
    imageUrl: "https://randomuser.me/api/portraits/men/93.jpg",
    role: "attendee",
    email: "faik.yilmaz@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
    phone: "0652786468",
  },
  {
    name: "Jonathan Rex",
    imageUrl: "https://randomuser.me/api/portraits/men/53.jpg",
    role: "attendee",
    phone: "0625494537",
    email: "jonathan.rex@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
  {
    name: "Wyatt Dean",
    imageUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    role: "attendee",
    phone: "0693679077",
    email: "wyatt.dean@stchtingify.com",
    password:
      "5c16aaf6f2f00507:8abf5d75217de115689a4b17170a0511edaa6c0954e1be64d55d66f60972acfc154a305eeaa32bce1491b56e4f3d3140faa281db1db19d5627a4a913163f2241",
  },
];

export default users;
