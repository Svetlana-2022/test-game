import React, { useEffect, useRef, useState } from 'react';

const CanvasComponent = ({ hero1Color, hero2Color }) => { 
    const canvasRef = useRef(); 
    const [ctx, setCtx] = useState(null);

    useEffect(() => { 
        const canvas = canvasRef.current; 
        setCtx(canvas.getContext('2d'))
        // const ctx = canvas.getContext('2d'); 
    });
    const drawCircle = () => { 
        ctx.beginPath(); 
        ctx.arc(30, 30, 20, 0, Math.PI * 2); 
        ctx.fillStyle = "red"; 
        ctx.fill(); 
    };
    
    return ( 
        <div className='block'>
            {/* <p className='block__score1'>Score Hero 1: {textScores1}</p>
            <p className='block__score2'>Score Hero 2: {textScores2}</p>  */}
            <canvas ref={canvasRef} width={800} height={600} className='block__canvas'  /> 
            {/* {gameOver && <div> <h1 className='block__winner'>{winner} wins!</h1> <button onClick={handleRestart}>Restart</button> </div>}  */}
            
        </div>     
    );

    
}
export default CanvasComponent;