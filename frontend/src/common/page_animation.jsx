import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimationWrapper = ({ children, keyValue, transition = { duration: 1 }, animate = { opacity: 1 }, initial = { opacity: 0 }, className }) => {
    return (
        <AnimatePresence>
            <motion.div
                transition={transition}
                key={keyValue}
                initial={initial}
                animate={animate}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper
