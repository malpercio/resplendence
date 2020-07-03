
const {Schema, model, ObjectId} = require('mongoose');

const tokensSchema = new Schema({
  gold: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  emerald: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  diamond: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  onyx: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  sapphire: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
  ruby: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },
});

const cardSchema = new Schema({
  gem: {
    type: String,
    required: true,
    immutable: true,
    enum: ["gold", "emerald", "diamond", "onyx", "sapphire", "ruby"]
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
    get: v => Math.round(v),
    set: v => Math.round(v),
  },
  cost: {
    type: tokensSchema,
    required: true,
    immutable: true,
  },
});

const nobleSchema = new Schema({
  points: {
    type: Number,
    default: 0,
    min: 0,
  },
  cost: {
    type: tokensSchema,
    required: true,
    immutable: true,
  },
});

const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
    immutable: true,
    trim: true
  },
  socketId: {
    type: String,
    required: true,
    immutable: true,
    trim: true,
  },
  tokens: {
    type: tokensSchema,
  },
  cards: {
    type: [cardSchema],
    default: [],
  },
  hand: {
    type: [cardSchema],
    default: [],
  },
  nobles: {
    type: [nobleSchema],
    default: [],
  },
});

const actionSchema = new Schema({
  playerId: {
    type: ObjectId,
    required: true,
    immutable: true,
  },
  matchId: {
    type: ObjectId,
    required: true,
    immutable: true,
  },
  location: {
    type: String,
    required: true,
    immutable: true,
    default: "board",
    enum: ["hand", "board"]
  },
  tokens: tokensSchema,
  cards: [cardSchema],
  time: { type: Date, default: Date.now, immutable: true, },
});

const matchSchema = new Schema({
  players: [ObjectId],
  room: {
    type: String,
    required: true,
    immutable: true,
    trim: true
  },
  startTime: { type: Date, default: Date.now, immutable: true, },
  endTime: { type: Date },
  aftermath: {
    type: String,
    enum:  ["ended", "disconnected"]
  },
  endedBy: {
    type: ObjectId
  },
});

matchSchema.virtual("duration").get(function() {
  return this.endTime? this.endTime.getTime() - this.startTime.getTime(): null;
});

matchSchema.virtual("elapsedTime").get(function() {
  return !this.endTime? this.durationDate.now().getTime() - this.startTime.getTime(): null;
});

playerSchema.virtual("score").get(function() {
  let totalScore = 0;
  for (let noble of this.nobles) {
    totalScore += noble.points;
  }
  for (let card of this.cards) {
    totalScore += card.points;
  }
  return totalScore;
});


module.exports = {
  Token: tokensSchema,
  Card: cardSchema,
  Noble: nobleSchema,
  Player: playerSchema,
  Action: actionSchema,
  Match: matchSchema,
};
