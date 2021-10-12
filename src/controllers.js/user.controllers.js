const models = require('../models.js');
const helpers = require('../helpers');
const jwt = require('jsonwebtoken');
const config = require('../config');

const signUp = async (req, res) => {
  try {
    const { email, password1, password2 } = req.body;

    if (!email || !password1 || !password2 || password1 !== password2) {
      return res
        .status(409)
        .json({ error: 'El email o password no son correctos!!' });
    }

    const hash = await helpers.bcrypt.encryp(password1);
    const user = models.user({ email, password: hash });
    await user.save();
    return res.status(201).json({ user });
  } catch (err) {
    console.log({ err });
    return res.status(409).json({ error: 'Hubo un error en tu respuesta!' });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(409)
        .json({ error: 'El email o password no son correctos!!' });
    }
    const user = await models.user.findOne({ email });
    if (!user) {
      return res.status(409).json('El usuario no existe!!');
    }
    const isValid = await helpers.bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(409).json({ error: 'Password no valido!!' });
    }

    const token = jwt.sign({ user }, config.jwt.secret, { expiresIn: '1h' });

    return res.status(200).json({ token, user: user });
  } catch (err) {
    // console.log({ err })
    return res.status(409).json({ error: 'Hubo un error!' });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await models.user.find();
    
    return res.json({ users });
  } catch (_) {
    return res.json({ users:[] });
  }
};

const remove = async (req, res) => {
  try{
    const { id } = req.params
    await models.user.findByIdAndRemove(id)

    return res.json(true)
  }catch(_){ return res.status(409).json(false)}
};

const logout = (req, res) => {
  return res.json('logout');
};

module.exports = {
  signUp,
  signIn,
  logout,
  getAll,
  remove
};
