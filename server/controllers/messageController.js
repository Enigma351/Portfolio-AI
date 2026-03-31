const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { text, sender, email } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const newMessage = new Message({
      text,
      sender: sender || 'Anonymous Visitor',
      email: email || ''
    });

    await newMessage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Message transmitted successfully to Partha.OS Kernel.' 
    });
  } catch (error) {
    console.error('Send Message Error:', error);
    res.status(500).json({ error: 'System error: Message transmission failed.' });
  }
};
