const DB = require("../configs/dbConfig");

const getOrdersForTableDB = async (data) => {
  try {
    const { orderStatus } = data;
    const limit = parseInt(data.limit);
    const offSet = parseInt(limit * (data.page - 1));

    const result = await DB.order.findMany({
      where: {
        AND: [orderStatus && { orderStatus: orderStatus }].filter(Boolean),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: offSet,
      select: {
        id: true,
        orderStatus: true,
        totalAmount: true,
        deliveryAddress: true,
        deliveryDate: true,
        paymentMethod: true,
        transactionId: true,
        paymentStatus: true,
        createdAt: true,
        user: {
          select: {
            mobile: true,
            name: true,
          },
        },
        orderItems: {
          select: {
            price: true,
            quantity: true,
            product: {
              select: {
                id: true,
                title: true,
                thumbnailImage: true,
              },
            },
          },
        },
        deliveryMan: {
          select: {
            id: true,
            name: true,
            deliveryManImage: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getTotalRowsForOrderTableDB = async (data) => {
  try {
    const { orderStatus } = data;
    const result = await DB.order.count({
      where: {
        AND: [orderStatus && { orderStatus: orderStatus }].filter(Boolean),
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateOrderDB = async (id, data) => {
  try {
    const result = await DB.order.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getNumberOfOrderDB = async () => {
  try {
    const result = await DB.order.count();
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getNumberOfOrderForEveryStatusDB = async (queryData) => {
  try {
    const { startTime, endTime } = queryData;
    const orderStatus = [
      "all",
      "pending",
      "accepted",
      "declined",
      "processing",
      "outOfDelivery",
      "delivered",
      "canceled",
    ];
    const data = {};
    for (const status of orderStatus) {
      const res = await DB.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        _count: {
          id: true,
        },
        where: {
          AND: [
            status != "all" && { orderStatus: status },
            startTime && {
              createdAt: {
                gte: startTime,
              },
            },
            endTime && {
              createdAt: {
                lte: endTime,
              },
            },
          ].filter(Boolean),
        },
      });
      data[status] = {
        totalAmount: res?._sum?.totalAmount || 0,
        numberOfOrder: res?._count?.id,
      };
    }
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getOneOrderByIdDB = async (id) => {
  try {
    const result = DB.order.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        orderStatus: true,
        totalAmount: true,
        deliveryAddress: true,
        deliveryDate: true,
        paymentMethod: true,
        transactionId: true,
        paymentStatus: true,
        createdAt: true,
        deliveryMan: {
          select: {
            name: true,
            deliveryManImage: true,
          },
        },
        user: {
          select: {
            name: true,
            mobile: true,
          },
        },
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                title: true,
                regularPrice: true,
                discountPrice: true,
                thumbnailImage: true,
                weight: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getOrdersForTableDB,
  getTotalRowsForOrderTableDB,
  updateOrderDB,
  getNumberOfOrderDB,
  getNumberOfOrderForEveryStatusDB,
  getOneOrderByIdDB,
};
