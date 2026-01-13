const DB = require("../configs/dbConfig");

const getOneOfferByTitleDB = async (title) => {
  try {
    const res = await DB.offer.findUnique({ where: { title } });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getAllOffersDB = async () => {
  try {
    const res = await DB.offer.findMany({
      select: {
        id: true,
        title: true,
        banner: true,
        _count: {
          select: { offerItems: true },
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOffersForTableDB = async () => {
  try {
    const res = await DB.offer.findMany({
      select: {
        id: true,
        title: true,
        banner: true,
        startTime: true,
        endTime: true,
        offerItems: {
          select: {
            product: {
              select: {
                id: true,
                title: true,
                discountPrice: true,
                thumbnailImage: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    const result = res.map((item) => ({
      id: item.id,
      title: item.title,
      banner: item.banner,
      startTime: item.startTime,
      endTime: item.endTime,
      offerItems: item.offerItems.map((pro) => ({
        id: pro.product.id,
        title: pro.product.title,
        discountPrice: pro.product.discountPrice,
        thumbnailImage: pro.product.thumbnailImage,
        weight: pro.product.weight,
      })),
    }));
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const createOfferDB = async (offerData, offerItemsData) => {
  try {
    const res = await DB.offer.create({
      data: {
        ...offerData,
        offerItems: {
          createMany: {
            data: offerItemsData || [],
          },
        },
      },
      include: {
        offerItems: true,
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const updateOfferDB = async (id, offerdData, offerItems) => {
  try {
    if (offerItems && offerItems.length) {
      const deletedData = await DB.offerItem.deleteMany({
        where: {
          offerId: id,
        },
      });
    }

    const data = await DB.offer.update({
      where: {
        id: id,
      },
      data: {
        ...offerdData,
        offerItems: {
          createMany: {
            data: offerItems || [],
          },
        },
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const deleteOfferDB = async (id) => {
  try {
    const deletedData = await DB.offerItem.deleteMany({
      where: {
        offerId: id,
      },
    });

    const res = await DB.offer.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOneOfferByTitleDB,
  getOffersForTableDB,
  createOfferDB,
  getAllOffersDB,
  updateOfferDB,
  deleteOfferDB,
};
