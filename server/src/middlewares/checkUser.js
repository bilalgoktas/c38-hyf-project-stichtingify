// Checking the request body, (user) should be object.
export const isUserTypeObject = (req, res, next) => {
  const { user } = req.body;
  if (typeof user !== "object") {
    res.status(400).json({
      success: false,
      msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
        user
      )}`,
    });

    return;
  } else {
    next();
  }
};

// ID validation
export const isIdValid = (req, res, next) => {
  const userId = req.params.id;
  const idLength = userId.split("").length;
  if (idLength !== 24) {
    res.status(400).json({
      success: false,
      msg: "This ID is invalid, please check it again!",
    });
    return;
  } else {
    next();
  }
};
