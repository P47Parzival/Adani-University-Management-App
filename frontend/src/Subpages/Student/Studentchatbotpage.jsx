import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Chatbot() {
    const [message, setMessage] = useState('');
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const userId = location.state?.rollNo;

    const handleSendMessage = async () => {
        if (!message.trim() || !userId) return;

        const newMessage = { role: 'user', content: message };
        setConversations(prev => [...prev, newMessage]);
        
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/chat', { 
                message,
                userId 
            });
            
            const botResponse = { 
                role: 'assistant', 
                content: res.data.result || res.data 
            };
            setConversations(prev => [...prev, botResponse]);
            setMessage('');
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to get response');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[80vh] max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">University Assistant</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                {conversations.map((msg, index) => (
                    <div key={index} 
                         className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                            msg.role === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-200 text-gray-800'
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="text-center text-gray-500">
                        Thinking...
                    </div>
                )}
            </div>

            {/* Input area */}
            <div className="flex gap-2">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    rows="2"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className={`px-4 py-2 rounded-lg font-medium ${
                        isLoading || !message.trim()
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
