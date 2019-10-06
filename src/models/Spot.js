import mongoose from 'mongoose';
import 'dotenv/config';

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// eslint-disable-next-line func-names
SpotSchema.virtual('thumbnail_url').get(function() {
  return `${process.env.APP_URL}/files/${this.thumbnail}`;
});

export default mongoose.model('Spot', SpotSchema);
