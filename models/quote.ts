import { Schema, model, models } from 'mongoose';

const QuoteSchema = new Schema({
  quote: {
    type: String,
    required: [true, 'Quote is required.'],
  },
  meaning: {
    type: String,
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: [true, 'Author is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  color: {
    type: String,
    default: '#0F96EF',
  },
});

const Quote = models.Quote || model('Quote', QuoteSchema);

export default Quote;
