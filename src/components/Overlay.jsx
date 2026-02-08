import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Overlay = ({ onYes, isSuccess, message, setMessage }) => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [copied, setCopied] = useState(false);

    const moveNoButton = () => {
        const randomX = (Math.random() - 0.5) * 400; // random between -200px and 200px
        const randomY = (Math.random() - 0.5) * 300; // random between -150px and 150px
        setNoButtonPos({ x: randomX, y: randomY });
        setMessage('Please think once again... 🥺');
    };

    const sendMessage = async () => {
        const link = `${window.location.origin}${window.location.pathname}?msg=${encodeURIComponent(message)}`;
        // Try Web Share API
        if (navigator.share) {
            try {
                await navigator.share({ title: 'A message for you', text: message, url: link });
                return;
            } catch (e) {
                // fallthrough to clipboard
            }
        }

        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error('Copy failed', e);
        }
    };

    if (isSuccess) {
        return (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="backdrop-blur-2xl bg-white/10 border border-white/20 p-12 rounded-3xl text-center max-w-xl w-full mx-4 shadow-2xl pointer-events-auto"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="font-dancing text-6xl md:text-7xl text-white mb-4 drop-shadow-lg"
                    >
                        Yay! 🎉
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="font-dancing text-3xl md:text-4xl text-pink-200 leading-relaxed"
                    >
                        Thank you! Love you too! ❤️
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl text-center max-w-lg w-full mx-4 pointer-events-auto shadow-2xl">
                <h1 className="font-dancing text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">
                    My Dearest Love,
                </h1>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-4 rounded-lg bg-black/30 text-white resize-none mb-4"
                    rows={3}
                />

                <p className="font-dancing text-lg md:text-xl text-pink-100 mb-4 leading-relaxed">
                    Every beat of my heart is for you.
                </p>

                <div className="flex justify-center gap-4 relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onYes}
                        className="px-6 py-3 bg-gradient-to-r from-rose-300 to-rose-500 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-rose-500/50 transition-all duration-300"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        animate={{
                            x: noButtonPos.x,
                            y: noButtonPos.y,
                        }}
                        onMouseEnter={moveNoButton}
                        className="px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-700 rounded-full text-white font-bold text-lg backdrop-blur-sm border border-white/10 transition-all duration-300"
                    >
                        NO
                    </motion.button>

                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 ml-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    >
                        {copied ? 'Link copied!' : 'Send / Share'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
