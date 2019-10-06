// index, show, store, update, destroy
import User from '../models/User';

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json(user);
    }

    user = await User.create({ email });

    return res.status(200).json(user);
  },
};
