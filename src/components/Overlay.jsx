import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Overlay = ({ onYes }) => {
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const moveNoButton = () => {
        const x = Math.random() * 200 - 100; // Random x between -100 and 100
        const y = Math.random() * 200 - 100; // Random y between -100 and 100
        setNoButtonPos({ x, y });
        setIsHovered(true);
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="glass-card p-10 rounded-2xl text-center max-w-lg w-full mx-4 pointer-events-auto">
                <h1 className="font-dancing text-5xl md:text-6xl text-white mb-6 drop-shadow-lg">
                    My Dearest Love,
                </h1>
                <p className="font-dancing text-2xl md:text-3xl text-pink-100 mb-8 leading-relaxed">
                    Every beat of my heart is for you. <br />
                    Will you be mine?
                </p>

                <div className="flex justify-center gap-8 relative h-20 items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onYes}
                        className="px-8 py-3 bg-gradient-to-r from-rose-400 to-red-500 rounded-full text-white font-bold text-xl shadow-lg hover:shadow-rose-500/50 transition-shadow duration-300"
                    >
                        YES!
                    </motion.button>

                    <motion.button
                        animate={isHovered ? { x: noButtonPos.x, y: noButtonPos.y } : {}}
                        onMouseEnter={moveNoButton}
                        className="px-8 py-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-full text-white font-bold text-xl backdrop-blur-sm border border-white/10"
                    >
                        NO
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
