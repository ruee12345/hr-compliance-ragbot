'use client';

import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '@/lib/hooks';
import { Card } from '@/components/ui';

const ChatContainer: React.FC = () => {
  const { messages, sendMessage, isLoading, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col" padding="none">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">HR Assistant</h2>
            <p className="text-sm text-blue-100 mt-1">
              Ask questions about company policies, benefits, and procedures
            </p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="text-sm text-blue-100 hover:text-white transition-colors"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome to HR Assistant!
              </h3>
              <p className="text-gray-600 mb-4">
                Ask questions about company policies, benefits, and procedures
              </p>
              
              {/* Quick Ask Buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Quick Ask:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Leave Policy',
                    'Work From Home',
                    'Salary Structure',
                    'Notice Period',
                    'Holiday List',
                    'Dress Code',
                    'Health Insurance',
                    'Office Timings',
                  ].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => sendMessage(`Tell me about ${topic.toLowerCase()}`)}
                      className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </Card>
  );
};

export default ChatContainer;
