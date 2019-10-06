// index, show, store, update, destroy
import Spot from '../models/Spot';
import User from '../models/User';

module.exports = {
  async index(req, res) {
    const { tech } = req.query;

    const spots = await Spot.find({
      techs: tech,
    });

    return res.status(200).json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({
        error: 'User not logged in or does not exists',
      });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price,
    });

    return res.status(200).json(spot);
  },
};
