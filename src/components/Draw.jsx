import { useRef, useEffect } from "react";

const Draw = () => {
  const canvasRef = useRef(null);
  const lastPositionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initialize canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;

    // Set initial drawing properties
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.1; // Trail opacity

    const handleMouseMove = (e) => {
      const { pageX, pageY } = e;

      if (lastPositionRef.current) {
        const { x, y } = lastPositionRef.current;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(pageX - canvas.offsetLeft, pageY - canvas.offsetTop);
        ctx.stroke();
      }

      // Update last position
      lastPositionRef.current = { x: pageX - canvas.offsetLeft, y: pageY - canvas.offsetTop };
    };

    const handleResize = () => {
      // Resize canvas on window resize
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 100;
    };

    // Add event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Cleanup: remove event listeners
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 100, left: 0 }}
    />
  );
};

export default Draw;
