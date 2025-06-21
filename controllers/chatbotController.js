// chatbotController.js

const askChatbot = async (req, res) => {
  const { message } = req.body;

  try {
    // Mock response
    const mockResponse = "This is a mock response. The chatbot is currently unavailable.";

    // Send the mock response as a JSON object
    res.json({ message: mockResponse });
  } catch (error) {
    console.error('Chatbot error:', error.message);
    res.status(500).json({ message: 'Failed to get response from chatbot.' });
  }
};

module.exports = { askChatbot };

