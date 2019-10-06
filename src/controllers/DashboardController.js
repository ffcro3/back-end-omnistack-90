// index, show, store, update, destroy
import Spot from '../models/Spot';

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;

    const spots = await Spot.find({
      user: user_id,
    });

    return res.status(200).json(spots);
  },
};
