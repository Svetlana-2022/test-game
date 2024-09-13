import React, { useEffect, useRef, useState } from 'react';

const CanvasComponent = ({ hero1Color, hero2Color }) => { 
    const canvasRef = useRef(); 
    const [hero1Speed, setHero1Speed] = useState(-2); 
    const [hero2Speed, setHero2Speed] = useState(2); 
    const [hero1ShootingFrequency, setHero1ShootingFrequency] = useState(60); 
    const [hero2ShootingFrequency, setHero2ShootingFrequency] = useState(60); 
    const [gameOver, setGameOver] = useState(false); 
    const [winner, setWinner] = useState(null);
    const [textScores1, setTextScores1] = useState(0);
    const [textScores2, setTextScores2] = useState(0);
    // const [ctx, setCtx] = useState(null);
    let hero1 = { x: 100, y: 300, radius: 50, color: hero1Color, speed: hero1Speed, shootingFrequency: hero1ShootingFrequency, shootCooldown: 0, bullets: [] }; 
    let hero2 = { x: 700, y: 300, radius: 50, color: hero2Color, speed: hero2Speed, shootingFrequency: hero2ShootingFrequency, shootCooldown: 0, bullets: [] };
    //переменная для записи счёта
    let score1 = 0;
    let score2 = 0;

    useEffect(() => { 
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 
        const drawCircle = (x, y, radius, color) => { 
            ctx.beginPath(); 
            ctx.arc(x, y, radius, 0, Math.PI * 2); 
            ctx.fillStyle = color; 
            ctx.fill(); 
        };
            
            //функция проверки столкновений 
        const checkCollision = (bullet, hero) => { 
            const dx = bullet.x - hero.x; 
            const dy = bullet.y - hero.y; 
            const distance = Math.sqrt(dx * dx + dy * dy); 
            return distance < hero.radius; }; 
        const update = () => { 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 

            // Обработка столкновений с границами поля  
            if (hero1.y + hero1.speed > canvas.height - 50 || hero1.y + hero1.speed < 50 ) {
                hero1.speed = - hero1.speed;
            }
            if ( hero2.y + hero2.speed > canvas.height - 50 || hero2.y + hero2.speed < 50  ) {
                hero2.speed = - hero2.speed;
            }
           
            
            if (!gameOver) { 
                // Движение героев 
                hero1.y += hero1.speed; 
                hero2.y += hero2.speed; 
                // Стрельба заклинаниями 
                if (hero1.shootCooldown > 0) { hero1.shootCooldown--;
                    // Обработка столкновений 
                    hero1.bullets.forEach((bullet, index) => { bullet.x += 5; 
                        drawCircle(bullet.x, bullet.y, 5, hero1.color); 
                        if (checkCollision(bullet, hero2)) { hero1.bullets.splice(index, 1); hero2.color = 'green'; score1 = score1 +=1; setTextScores1(score1);} 
                    });  
                } 
                // Стрельба заклинаниями 
                if (hero2.shootCooldown > 0) { hero2.shootCooldown--;
                    // Обработка столкновений
                    hero2.bullets.forEach((bullet, index) => { bullet.x -= 5; 
                        drawCircle(bullet.x, bullet.y, 5, hero2.color); 
                        if (checkCollision(bullet, hero1)) { hero2.bullets.splice(index, 1); hero1.color = 'green'; score2 = score2 +=1; setTextScores2(score2);} 
                    });
                } 
                // Обработка столкновений 
                hero1.bullets.forEach((bullet, index) => { bullet.x += 5; 
                    drawCircle(bullet.x, bullet.y, 5, hero1.color); 
                    if (checkCollision(bullet, hero2)) { hero1.bullets.splice(index, 1); hero2.color = 'green'; score1 = score1 +=1; setTextScores1(score1);} 
                }); 
                hero2.bullets.forEach((bullet, index) => { bullet.x -= 5; 
                    drawCircle(bullet.x, bullet.y, 5, hero2.color); 
                    if (checkCollision(bullet, hero1)) { hero2.bullets.splice(index, 1); hero1.color = 'green'; score2 = score2 +=1; setTextScores2(score2);} 
                });
             
            }
                //Проверка победы 
                if (hero1.color === 'green' ) { 
                    setGameOver(true); 
                    setWinner('Hero 1');
      
                } else if (hero2.color === 'green' ) { 
                    setGameOver(true); 
                    setWinner('Hero 2');
                }
            // Отрисовка героев 
            drawCircle(hero1.x, hero1.y, hero1.radius, hero1.color); 
            drawCircle(hero2.x, hero2.y, hero2.radius, hero2.color); 
            requestAnimationFrame(update); 
        }; 
        update(); 
        //проверка клика по герою
        const handlerClickHero = () =>{ 
            const checkHero = (elHero, elClientY, elClientX) => {
                return (
                    elClientX > elHero.x - (elHero.radius / 2) &&
                    elClientX < elHero.x + (elHero.radius / 2) &&
                    elClientY > elHero.y - (elHero.radius / 2) &&
                    elClientY < elHero.y + (elHero.radius / 2)
                    )
            }
            const clickHandler = (e) =>{
                console.log( '-click-', e);
                if(checkHero(hero1, e.clientY - 60,  e.clientX - canvas.offsetLeft)) {hero1.color = 'orange'};
                if(checkHero(hero1, e.clientY - 60,  e.clientX - canvas.offsetRight)) {hero2.color = 'yellow'};
                console.log(hero1.y, hero1.x, '===', e.clientY - 60, e.clientX); 
            }
            
            // return (
            //     canvas.addEventListener('click', clickHandler);
            // canvas.removeEventListener('click', clickHandler);
            // )
        };
        
    }, [hero1Color, hero2Color, hero1Speed, hero2Speed, hero1ShootingFrequency, hero2ShootingFrequency]);
      
    const handleMouseMove = (e) => { // elemHero будет следовать от  курсора мыши
        let elemHero1 = hero1.y + (hero1.radius / 2);
        let elemHero2 = hero2.y + (hero2.radius / 2);
        if(elemHero1 === e.clientY) {
            hero1.speed = - hero1.speed;
        } 
        if(elemHero2 === e.clientY) {
            hero2.speed = - hero2.speed;
        } 
    }; 
    //Обработчик клика(половина поля)
    const handleMouseClick = (e) => {
        // let elemHero1Max = hero1.y + hero1.radius ;
        // let elemHero2 = hero2.y + (hero2.radius / 2);;
        // if(checkHero(hero1, e.clientY - 60,  e.clientX - canvas.offsetLeft)) {hero1.color = 'orange'};
        // if(checkHero(hero1, e.clientY - 60,  e.clientX - canvas.offsetRight)) {hero2.color = 'yellow'};
        // console.log(hero1.y, hero1.x, '===', e.clientY - 60, e.clientX); 
        if (e.clientX < canvasRef.current.width / 2) {
        console.log(e.clientX, canvasRef.current.width / 2); 
        if (hero1.shootCooldown === 0) { hero1.bullets.push({ x: hero1.x, y: hero1.y }); hero1.shootCooldown = hero1.shootingFrequency; } 
        } else if (e.clientX > canvasRef.current.width / 2) {
            console.log(e.clientX, canvasRef.current.width / 2); 
            if (hero2.shootCooldown === 0) { hero2.bullets.push({ x: hero2.x, y: hero2.y }); hero2.shootCooldown = hero2.shootingFrequency; } 
        } 
    }; 

    const handleRestart = () => { 
        setGameOver(false); 
        setWinner(null); 
        hero1.color = hero1Color; 
        hero2.color = hero2Color; 
        // hero1.bullets = []; 
        // hero2.bullets = [];
        // setTextScore1(0);
        // setTextScore2(0);
    };
    console.log(gameOver, hero1.shootCooldown, hero1ShootingFrequency);       
    return ( 
        <div className='block'>
            <p className='block__score1'>Score Hero 1: {textScores1}</p>
            <p className='block__score2'>Score Hero 2: {textScores2}</p> 
            <canvas ref={canvasRef} width={800} height={600} className='block__canvas' onMouseMove={handleMouseMove} onClick={handleMouseClick} /> 
            {gameOver && <div> <h1 className='block__winner'>{winner} wins!</h1> <button onClick={handleRestart}>Restart</button> </div>} 
            <div> 
                <h2>Hero 1 Settings</h2> 
                <label>Speed: <input type="range" min="1" max="10" value={hero1Speed} onChange={(e) => setHero1Speed(parseInt(e.target.value))} /></label> 
                <label>Shooting Frequency: <input type="range" min="1" max="100" value={hero1ShootingFrequency} onChange={(e) => setHero1ShootingFrequency(parseInt(e.target.value))} /></label> 
            </div> 
            <div> 
                <h2>Hero 2 Settings</h2> 
                <label>Speed: <input type="range" min="1" max="10" value={hero2Speed} onChange={(e) => setHero2Speed(parseInt(e.target.value))} /></label>     
                <label>Shooting Frequency: <input type="range" min="1" max="100" value={hero2ShootingFrequency} onChange={(e) => setHero2ShootingFrequency(parseInt(e.target.value))} /></label> 
            </div> 
        </div>     
    ); 
}; 
export default CanvasComponent;