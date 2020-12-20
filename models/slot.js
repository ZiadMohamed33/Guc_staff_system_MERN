const slotSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    number: {
        type: Number,
        enum: [1,2,3,4,5],
        required: true
    },
    date: {
        type: String,
        enum: ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'],
        required:true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});
const slot = mongoose.model('slot',slotSchema);

module.exports = slot;