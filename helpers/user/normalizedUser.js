const normalizedUser = (userFromClient) => {
  const {
    image: { url, alt },
    address,
    name,
  } = userFromClient;

  return {
    ...userFromClient,
    name: {
      ...userFromClient.name,
      middle: name.middle || "",
    },

    image: {
        ...userFromClient.image,
      url:
        url ||
        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
      alt: alt || "Business User Card Image",
    },

    address: {
      ...userFromClient.address,
      state: address.state || "not defined",
    },
  };
};
module.exports = normalizedUser;
