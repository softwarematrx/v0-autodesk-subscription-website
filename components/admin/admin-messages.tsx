'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Trash2, Clock, User, RotateCw, ExternalLink } from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'unread' | 'read';
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/contact');
            const data = await res.json();
            setMessages(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            await fetch('/api/contact', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchMessages();
            if (selectedId === id) setSelectedId(null);
        } catch (e) {
            alert('Failed to delete');
        }
    };

    const selectedMessage = messages.find(m => m.id === selectedId);

    if (loading) return <div className="text-center py-20"><RotateCw className="animate-spin mx-auto w-10 h-10 text-primary" /></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] italic mb-2 ml-1">Communication matrix</h2>
                    <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">Support Inquiries</h1>
                    <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mt-2 italic opacity-60">Review and respond to customer messages</p>
                </div>
                <div className="bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 shadow-inner">
                    <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] italic">{messages.length} Messages Pending</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Message List */}
                <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar">
                    {messages.length === 0 ? (
                        <div className="text-center py-24 bg-card border border-dashed border-border rounded-[2.5rem]">
                            <div className="text-6xl opacity-30 mx-auto mb-6">💬</div>
                            <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px] italic">No active inquiries</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedId(msg.id)}
                                className={`p-6 rounded-[2rem] border transition-all cursor-pointer relative group ${selectedId === msg.id
                                    ? 'bg-primary/5 border-primary shadow-2xl shadow-primary/5'
                                    : 'bg-card border-border hover:border-primary/30 hover:shadow-lg'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-foreground font-black uppercase italic tracking-tight truncate pr-10 text-lg">{msg.subject}</h4>
                                    <button
                                        onClick={(e) => handleDelete(msg.id, e)}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl text-muted-foreground/30 hover:text-red-500 hover:bg-red-500/5 transition-all absolute top-6 right-6"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-4 italic">
                                    <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                                        <User className="w-3 h-3 text-primary/40" />
                                    </div>
                                    <span className="truncate">{msg.name}</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest italic opacity-40">
                                        <Clock className="w-3 h-3" />
                                        {new Date(msg.date).toLocaleDateString()}
                                    </div>
                                    {msg.status === 'unread' && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[8px] font-black text-primary uppercase tracking-widest italic">New Entry</span>
                                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Content */}
                <div className="lg:col-span-7">
                    {selectedMessage ? (
                        <Card className="bg-card border-border p-10 rounded-[3rem] sticky top-8 shadow-2xl shadow-black/5 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-border pb-10 relative">
                                <div className="space-y-3">
                                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic mb-1">Subject Matter</div>
                                    <h3 className="text-4xl font-black text-foreground uppercase italic tracking-tighter leading-none">{selectedMessage.subject}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest italic mt-4">
                                        <span className="text-foreground bg-muted px-3 py-1.5 rounded-lg">{selectedMessage.name}</span>
                                        <span className="text-muted-foreground opacity-30">/</span>
                                        <span className="text-primary">{selectedMessage.email}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] italic opacity-40">
                                        {new Date(selectedMessage.date).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="bg-muted/50 p-8 rounded-[2rem] border border-border min-h-[250px] relative shadow-inner">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.1] text-9xl">
                                        💬
                                    </div>
                                    <p className="text-foreground/80 font-medium italic whitespace-pre-wrap leading-loose relative z-10 text-lg">
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-16 rounded-2xl gap-3 font-black uppercase tracking-widest text-xs italic shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
                                        onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                    >
                                        <Mail className="w-5 h-5" />
                                        Authorize Email Response
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-16 w-16 rounded-2xl border-border hover:bg-muted p-0 text-muted-foreground transition-all"
                                        title="External View"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-muted/20 rounded-[3rem] border border-dashed border-border/50 text-muted-foreground/30 p-24 text-center">
                            <div className="w-24 h-24 rounded-full border border-dashed border-border flex items-center justify-center mb-8">
                                <Mail className="w-10 h-10 opacity-20" />
                            </div>
                            <h3 className="font-black uppercase tracking-[0.3em] italic text-xs mb-2">Message Matrix Standby</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest italic opacity-60">Select an entry from the transmission log to preview content</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 20px;
        }
      `}</style>
        </div>
    );
}
