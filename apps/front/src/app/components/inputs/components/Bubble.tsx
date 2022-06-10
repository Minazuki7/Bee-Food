import React from "react";
import "./bubble.css";

interface BubbleProps {
  text: string;
  className: string;
}

const Bubble = ({ text, className }: BubbleProps) => {
  return <div className="speech-bubble ">{text}</div>;
};

export default Bubble;
