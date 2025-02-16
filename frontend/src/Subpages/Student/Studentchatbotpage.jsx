import { useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSendMessage = async () => {
        try {
            const res = await axios.post('http://localhost:3000/chat', { message });
            setResponse(res.data.result);  // Extract only the message part
        } catch (error) {
            setResponse('Error: Could not fetch response');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center max-h-screen p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Chat with AI</h1>
                <div className="flex items-center space-x-2">
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Type your message..." 
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button 
                        onClick={handleSendMessage} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Send
                    </button>
                </div>
                <div className="mt-4 p-3 bg-gray-100 rounded-lg min-h-[50px]">
                    <p className="text-gray-700 font-medium">Response:</p>
                    <p className="text-gray-800 mt-1">{response ? JSON.stringify(response) : 'No response yet'}</p>
                </div>
            </div>
        </div>
    );
}

export default App;