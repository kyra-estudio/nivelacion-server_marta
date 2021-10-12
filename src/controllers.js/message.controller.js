const models = require('../models.js');

const create = async (req, res) => {
  try {
    const { userFromId, userToId, text } = req.body;

    if (text.length === 0) {
      return res.json({ error: 'mensaje vacio' });
    }

    const userFrom = await models.user.findById(userFromId);
    if (!userFrom) {
      return res.json({ error: 'El usuario emisor del mensaje no existe' });
    }

    const userTo = await models.user.findById(userToId);
    if (!userTo) {
      return res.json({ error: 'El usuario receptor del mensaje no existe' });
    }

    let message = null;

    message = await models.message.create({
      userFrom,
      userTo,
      text,
    });

    return res.json({ message });
  } catch (err) {
    return res.json({ err });
  }
};

const chat = async (req, res) => {
  try {
    const { userFromId, userToId } = req.body;

    console.log({ body: req.body });

    const userFrom = await models.user.findById(userFromId);
    if (!userFrom) {
      return res.json({ err: 'El userFrom no existe' });
    }

    const userTo = await models.user.findById(userToId);
    if (!userTo) {
      return res.json({ err: 'El userToId no existe' });
    }

    let result = [];

    const userList1 = await models.message.find({
      userFrom: userFrom,
      userTo: userTo,
    });
    const userList2 = await models.message.find({
      userFrom: userTo,
      userTo: userFrom,
    });

    let chat = [];

    userList1.forEach((message) => {
      chat.push(message);
    });

    userList2.forEach((message) => {
      chat.push(message);
    });

    const orderedChat = chat.sort((a, b) => a.createdAt - b.createdAt)
    // chat.sort((x, y) => {
    //   x.createdAt < y.createdAt;
    // });
    return res.json({ messages: chat });
  } catch (err) {
    return res.json({ err:err.message });
  }
};

module.exports = {
  create,
  chat,
};
