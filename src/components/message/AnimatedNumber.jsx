import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const AnimatedNumber = ({ targetNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Function to animate towards the targetNumber
    const incrementCount = () => {
      setCount((prevCount) => {
        if (prevCount < targetNumber) {
          return prevCount + 1;
        } else if (prevCount > targetNumber) {
          return prevCount - 1;
        }
        return prevCount; // Stop when target is reached
      });
    };

    // Start the animation if targetNumber is different from current count
    const interval = setInterval(incrementCount, 1); // Adjust interval for speed

    // Stop the interval when the count reaches the target number
    if (count === targetNumber) {
      clearInterval(interval);
    }

    // Cleanup interval on component unmount or if targetNumber changes
    return () => clearInterval(interval);
  }, [targetNumber, count]); // Dependencies include targetNumber and count

  return (
    <motion.div
      key={count} // Ensure re-rendering on count change
      exit={{ opacity: 0 }}
      animate={{ y: 0 }} // Set the rotation to normal after flip
      initial={{ y: 0 }} // Start the element flipped downwards
      transition={{
        type: "spring", // Use spring for smooth rotation
        stiffness: 300,
        damping: 20, // Controls the smoothness of the flip
        duration: 0.8, // Duration for the flip effect
      }}
      style={{
        width: "100%",
        fontSize: "4rem",
        fontWeight: "bold",
        color: "teal",
        display: "inline-block",
      }}
    >
      <Typography
        variant="h4"
        color="primary"
        textAlign="center"
        alignSelf={"center"}
      >
        {count}
      </Typography>
    </motion.div>
  );
};

export default AnimatedNumber;
