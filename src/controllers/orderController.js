const {
  getOrdersForTableDB,
  getTotalRowsForOrderTableDB,
  updateOrderDB,
  getNumberOfOrderForEveryStatusDB,
  getOneOrderByIdDB,
} = require("../services/orderService");

const getOrdersForTable = async (req, res) => {
  try {
    const result = await getOrdersForTableDB(req?.query);
    const totalRows = await getTotalRowsForOrderTableDB(req?.query);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      totalRows,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req?.params?.id;

    if (!id) {
      return res.json({ message: "Id is required.", success: false });
    }
    const { orderStatus, deliveryManId } = req.body;

    if (orderStatus || deliveryManId) {
      const result = await updateOrderDB(id, req.body);
      if (!result) {
        return res.json({ success: false });
      }
    }
    res.json({
      message: "Order is updated successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getNumberOfOrderForEveryStatus = async (req, res) => {
  try {
    const result = await getNumberOfOrderForEveryStatusDB(req?.query);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const getOneOrderById = async (req, res) => {
  try {
    const id = req?.params?.id;
    const result = await getOneOrderByIdDB(id);

    if (!result) {
      return res.json({ success: false });
    }

    res.json({
      data: result,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports = {
  getOrdersForTable,
  updateOrder,
  getNumberOfOrderForEveryStatus,
  getOneOrderById,
};
