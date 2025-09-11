"use client"
import React, { useState, useEffect, useRef } from 'react';

// Define the shape of a chat message
interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// Function to determine the time string
const getTimeString = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Function to find the appropriate system prompt based on user text
const getSystemPrompt = (userText: string) => {
    let gradeLevel = "general";
    if (userText.match(/class\s*(8|[1-8]|below\s*8|below\s*grade\s*8|below\s*class\s*8)/i)) {
        gradeLevel = "below 8";
    } else if (userText.match(/(9|10|9th|10th)/i)) {
        gradeLevel = "9-10";
    } else if (userText.match(/(11|12|11th|12th|eleventh|twelfth)/i)) {
        gradeLevel = "11-12";
    }
    
    switch (gradeLevel) {
        case "below 8":
            return "You are a friendly and encouraging career guidance counselor for Indian students below grade 8. Your goal is to suggest career options based on their interests and hobbies. Respond in a friendly, conversational tone. For each suggestion, mention the types of hobbies they could pursue and which fundamental subjects are important. Use Markdown with headings, bold text, and bullet points to make your response easy to read. The content should be simple and not too lengthy.";
        case "9-10":
            return "You are a friendly and knowledgeable career guidance counselor for Indian students in grades 9-10. Your goal is to suggest career options based on their interests. Respond in a friendly, conversational tone. For each suggestion, clearly state the relevant **stream** (e.g., Science, Commerce, Arts/Humanities), the **courses** they should study, and the **future outcomes** or career paths available. Use Markdown with headings, bold text, and bullet points to make your response easy to read. The content should not be too lengthy.";
        case "11-12":
            return "You are a highly knowledgeable career guidance counselor for Indian students in grades 11-12. Your goal is to provide specific career options and pathways based on their interests. Respond in a professional yet friendly, conversational tone. For each suggestion, clearly state the relevant **course and entrance exams**, the **specific content** they should study, and the **future outcomes** or specialized career roles. Use Markdown with headings, bold text, and bullet points to make your response easy to read. The content should not be too lengthy.";
        default:
            return "You are a friendly and knowledgeable career guidance counselor for Indian students. Your goal is to suggest career options for students in grades 10-12 based on their interests. Respond in a friendly, conversational tone. For each suggestion, clearly state the relevant **stream** (e.g., Science, Commerce, Arts/Humanities), the **courses** they should study, and the **future outcomes** or career paths available. Use Markdown with headings, bold text, and bullet points to make your response easy to read. The content should not be too lengthy.";
    }
};

const AICareerAdvisor: React.FC = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatLogRef = useRef<HTMLDivElement>(null);

    // Initial message from the bot
    const initialBotMessage = {
        role: 'model' as 'model',
        text: "Hello! I'm your AI career counselor. I can help you with career guidance, course selection, and academic planning. How can I assist you today?"
    };

    // Load chat history from local storage on component mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('careerChatHistory');
        if (savedHistory) {
            setChatHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Save chat history to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('careerChatHistory', JSON.stringify(chatHistory));
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const sendQuickQuestion = (question: string) => {
        setChatInput(question);
        // The sendMessage logic is tied to the button click or enter key press
    };

    const sendMessage = async () => {
        const userText = chatInput.trim();
        if (userText === '') return;

        // Add user message to history
        const newUserMessage: ChatMessage = { role: 'user', text: userText };
        setChatHistory(prev => [...prev, newUserMessage]);
        setChatInput('');
        setIsThinking(true);

        const systemPrompt = getSystemPrompt(userText);
        const gradeLevel = systemPrompt.includes('below grade 8') ? 'below 8' : systemPrompt.includes('grades 9-10') ? '9-10' : systemPrompt.includes('grades 11-12') ? '11-12' : 'general';

        const payload = {
            contents: [{ parts: [{ text: userText }] }],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        };

        const apiKey = "AIzaSyA_gGMhMpqMxst23Y9Xv4RBGqBwJqC6yGg"; // NOTE: This is exposed in client-side code
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            const botMessageText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again.";
            const newBotMessage: ChatMessage = { role: 'model', text: botMessageText };
            
            setChatHistory(prev => [...prev, newBotMessage]);

        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: ChatMessage = {
                role: 'model',
                text: `I'm sorry, an error occurred: ${(error as Error).message}. Please try again.`,
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsThinking(false);
        }
    };

    const displayMessage = (message: ChatMessage) => {
        const isUser = message.role === 'user';
        const avatarSvg = isUser 
            ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath fill-rule='evenodd' d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.726.657H4.477a.75.75 0 0 1-.726-.657Z' clip-rule='evenodd' /%3E%3C/svg%3E"
            : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M10.5 21a5.25 5.25 0 0 0 5.25-5.25V13.5a3 3 0 0 0-3-3H9.467A2.25 2.25 0 0 1 7.25 8.25v-1.5A2.25 2.25 0 0 1 9.467 4.5H16.5a.75.75 0 0 0 0-1.5H9.467A3.75 3.75 0 0 0 5.717 7.25v1.5a3.75 3.75 0 0 0 3.75 3.75h3.708a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 0 0 1.5h-.008z' /%3E%3C/svg%3E";
        
        const bubbleClasses = isUser
            ? 'user-bubble rounded-br-none bg-emerald-600 text-white'
            : 'bot-bubble rounded-bl-none bg-gray-50 text-gray-900';
        
        const avatarClasses = isUser ? 'ml-2' : 'mr-2';

        const content = isUser 
            ? message.text 
            : message.text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        return (
            <div key={Math.random()} className={`flex my-2 p-2 items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                    <img src={avatarSvg} alt="Bot Avatar" className={`w-8 h-8 ${avatarClasses}`} />
                )}
                <div className={`message-bubble rounded-xl p-4 shadow-sm max-w-[85%] ${bubbleClasses}`}>
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>
                    <span className={`block text-right text-xs mt-2 ${isUser ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                        {getTimeString()}
                    </span>
                </div>
                {isUser && (
                    <img src={avatarSvg} alt="User Avatar" className={`w-8 h-8 ${avatarClasses}`} />
                )}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
                    body {
                        font-family: 'Poppins', sans-serif;
                        background: linear-gradient(to bottom, #ffffff, #fbfbfb);
                    }
                    .chat-container {
                        max-width: 1000px;
                        height: 200vh;
                    }
                    .chat-log {
                        overflow-y: auto;
                        flex-grow: 1;
                    }
                    .message-bubble {
                        max-width: 85%;
                        word-wrap: break-word;
                    }
                    .user-bubble {
                        background-color: #10b981;
                        color: white;
                        border-bottom-right-radius: 0;
                    }
                    .bot-bubble {
                        background-color: #f7f8f9;
                        color: #1f2937;
                        border-bottom-left-radius: 0;
                    }
                    .spinner {
                        border: 4px solid rgba(0, 0, 0, 0.1);
                        border-left-color: #3b82f6;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
            <div className="chat-container bg-green-50 rounded-2xl shadow-xl flex flex-col p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-2">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-500 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-emerald-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9.75 9.75M12 20.25a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5ZM1.898 16.755A59.769 59.769 0 0 0 21.733 12 59.769 59.769 0 0 0 1.898 7.245m10.858.775A7.5 7.5 0 0 0 12 15.75h.008v.007h-.008Z" />
                            </svg>
                            <h1 className="text-xl font-semibold text-gray-800">AI Career Counselor</h1>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-10.5L3 7.5m17.25 11.25L12.75 21m0 0-3.258-2.585M12.75 21h.008m-3.75 0L6 18.75m3.75-10.5L12 10.5m-3.75-3.75L6 7.5m3.75-3.75 5.25 10.5L21 16.5m-17.25 4.5 1.898-1.898" />
                        </svg>
                        <span className="text-sm">English</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                
                {/* Quick Questions Section */}
                <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                    <h2 className="text-md font-semibold text-gray-800">Quick Questions</h2>
                    <div id="quickQuestions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        <button className="bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm text-left hover:bg-emerald-700 transition-colors" onClick={() => { sendQuickQuestion('What career is best for me after 12th science?'); sendMessage(); }}>What career is best for me after 12th science?</button>
                        <button className="bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm text-left hover:bg-emerald-700 transition-colors" onClick={() => { sendQuickQuestion('Which engineering branch has the best scope?'); sendMessage(); }}>Which engineering branch has the best scope?</button>
                        <button className="bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm text-left hover:bg-emerald-700 transition-colors" onClick={() => { sendQuickQuestion('How do I prepare for medical entrance exams?'); sendMessage(); }}>How do I prepare for medical entrance exams?</button>
                        <button className="bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm text-left hover:bg-emerald-700 transition-colors" onClick={() => { sendQuickQuestion('What are the career options in commerce?'); sendMessage(); }}>What are the career options in commerce?</button>
                        <button className="bg-gray-100 text-gray-800 py-2 px-3 rounded-md text-sm text-left hover:bg-emerald-700 transition-colors" onClick={() => { sendQuickQuestion('Tell me about government job opportunities'); sendMessage(); }}>Tell me about government job opportunities</button>
                    </div>
                </div>

                {/* Chat with AI Counselor Section */}
                <div className="bg-white rounded-lg shadow-md flex flex-col p-4 space-y-4 flex-grow overflow-hidden">
                    <h2 className="text-md font-semibold text-gray-800">Chat with AI Counselor</h2>
                    <div id="chatLog" ref={chatLogRef} className="chat-log flex flex-col space-y-4 pr-2">
                        {/* Initial bot message */}
                        <div className="flex items-start my-2 p-2">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M10.5 21a5.25 5.25 0 0 0 5.25-5.25V13.5a3 3 0 0 0-3-3H9.467A2.25 2.25 0 0 1 7.25 8.25v-1.5A2.25 2.25 0 0 1 9.467 4.5H16.5a.75.75 0 0 0 0-1.5H9.467A3.75 3.75 0 0 0 5.717 7.25v1.5a3.75 3.75 0 0 0 3.75 3.75h3.708a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 0 0 1.5h-.008z' /%3E%3C/svg%3E" alt="Bot Avatar" className="w-8 h-8 mr-2" />
                            <div className="message-bubble bot-bubble rounded-xl p-4 shadow-sm">
                                <p className="text-gray-900">{initialBotMessage.text}</p>
                                <span className="block text-right text-xs text-gray-500 mt-2">{getTimeString()}</span>
                            </div>
                        </div>
                        {/* Render all messages from state */}
                        {chatHistory.map(displayMessage)}
                    </div>
                    
                    {/* Thinking Indicator */}
                    {isThinking && (
                        <div id="thinkingIndicator" className="flex justify-start items-center p-2">
                            <div className="spinner"></div>
                            <p className="ml-2 text-gray-500 italic">Thinking...</p>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                        <input
                            type="text"
                            id="chatInput"
                            placeholder="Send a message"
                            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                        />
                        <button
                            id="sendBtn"
                            className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                            onClick={sendMessage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.491 12 59.769 59.769 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICareerAdvisor;
