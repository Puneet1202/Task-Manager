const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    // Yeh task ka title hai
    title: {
        type: String,
        required: true, // Title ke bina task save nahi hoga
        trim: true      // Shuru aur end se extra space hata dega
    },
    
    // Yeh task ki description ya content hai
    content: {
        type: String,
        required: false
    },
    
    // Yeh task ka current status hai
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'], // In 3 values ke alawa kuch aur nahi ho sakta
        default: 'pending' // Agar status na dein, toh by default 'pending' hoga
    },
    
    // Yeh task ki priority hai
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    
    // YEH SABSE IMPORTANT PART HAI
    // Isse pata chalega ki yeh task kis user ne banaya hai
    user: {
        type: mongoose.Schema.Types.ObjectId, // Yahan hum User ki ID store karenge
        ref: 'User', // Yeh 'User' model se link hai
        required: true
    }
}, {
    // Isse 'createdAt' aur 'updatedAt' fields automatically ban jayengi
    timestamps: true 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;