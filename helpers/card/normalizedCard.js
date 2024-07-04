const { generateBizNumber } = require("../generateBizNumber");

const normalizedCard=async (cardFromClient,userId)=>{
    const {
        image: { url, alt },
        address,
      } = cardFromClient;


      return {

        ...cardFromClient,
        image: {
            ...cardFromClient.image,
          url:
            url ||
            "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
          alt: alt || "Business User Card Image",
        },
        address: {
            ...cardFromClient.address,
            state: address.state || "not defined",
          },
          bizNumber:  await generateBizNumber(),
          user_id: cardFromClient.user_id || userId,
      }
}

exports.normalizedCard=normalizedCard