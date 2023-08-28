import { Schema, model, models } from 'mongoose';

const WordSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'UserId is required.'],
    },
    word: {
      type: String,
      required: [true, 'Word is required.'],
    },
    meaning: {
      type: String,
      default: '',
    },
    createdTime: {
      type: Date,
      default: Date.now() + 2 * 60 * 60 * 1000,
    },
    isLearned: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      required: [true, 'Tag is required.'],
    },
    color: {
      type: String,
      default: 'blue',
    },
  },
  { versionKey: false }
);

const Word = models.Word || model('Word', WordSchema);

export default Word;
