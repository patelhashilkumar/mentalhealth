'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import * as React from 'react';
import { Send, User, HeartPulse } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getAiReply } from '@/app/actions';

interface Message {
  id: string;
  role: 'user' | 'ai' | 'loading';
  content: string;
}

const LoadingDots = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
  </div>
);

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Corresponds to max-h-30
      if (scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = 'auto';
      } else {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = 'hidden';
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'loading',
      content: '',
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
    }
    setIsLoading(true);

    try {
      const result = await getAiReply(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'ai',
        content: result.reply,
      };
      setMessages(prev =>
        prev.map(msg => (msg.role === 'loading' ? aiMessage : msg))
      );
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description:
          'Failed to get a response from the AI. Please try again.',
      });
      setMessages(prev => prev.filter(msg => msg.role !== 'loading'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' && 'justify-end'
              )}
            >
              {message.role !== 'user' && (
                <Avatar className="w-9 h-9 border border-border">
                  <AvatarFallback>
                    <HeartPulse className="w-5 h-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md lg:max-w-lg p-4 rounded-2xl text-foreground',
                  message.role === 'user'
                    ? 'bg-primary/20 rounded-br-none'
                    : 'bg-card/60 backdrop-blur-sm border border-border/50 rounded-bl-none',
                  message.role === 'loading' && 'p-4'
                )}
              >
                {message.role === 'loading' ? (
                  <LoadingDots />
                ) : (
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                )}
              </div>
              {message.role === 'user' && (
                <Avatar className="w-9 h-9 border">
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {messages.length === 0 && (
             <div className="text-center text-muted-foreground py-20">
              <HeartPulse className="w-12 h-12 mx-auto mb-4 text-primary/50" />
              <p className="text-lg font-medium">Welcome to Gemini Health Consult</p>
              <p className="text-sm">Describe your symptoms to get started.</p>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 bg-transparent">
        <div className="p-2 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-sm">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Describe your symptoms..."
              className="flex-1 resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-base min-h-[40px] max-h-30"
              rows={1}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full shrink-0"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}