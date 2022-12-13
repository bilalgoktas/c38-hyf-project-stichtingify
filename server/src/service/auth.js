export const genSuccessAuthResObj = (session) => {
  if (!session?.user?.role)
    return {
      success: true,
      isAuthenticated: false,
    };
  return {
    success: true,
    isAuthenticated: true,
    authUser: {
      _id: session?.user?._id,
      role: session?.user?.role,
      imageUrl: session?.user?.imageUrl,
      name: session?.user?.name,
    },
  };
};

export const addUserToSession = (session, userDoc) => {
  session.user = {
    _id: userDoc._id.toString(),
    role: userDoc.role,
    imageUrl: userDoc.imageUrl,
    name: userDoc.name,
  };
};

export const checkUserRole = (req, role) => {
  return req?.session?.user?.role === role;
};

export const checkAuthentication = (req) => {
  return req?.session?.user ? true : false;
};
