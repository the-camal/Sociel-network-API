const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../data')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 200
        },
       
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const zonesSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createAtval => dateFormat(createAtval)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const zones = model('zones', zonesSchema);

module.exports = zones;