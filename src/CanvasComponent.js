import React, { useEffect, useRef } from 'react';

const CanvasComponent = ({ hero1Color, hero2Color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    

    // Реализация логики игры на Canvas

    // Отрисовка героев, заклинаний и т.д.

    // Обработка действий героев и врагов
    let hero1 = { 
        x: 100, 
        y: 300, 
        radius: 50, 
        color: hero1Color, 
        speed: 5, 
        shootingFrequency: 60, 
        shootCooldown: 0, 
        bullets: [] 
    }; 
    let hero2 = { 
        x: 700, 
        y: 300, 
        radius: 50, 
        color: hero2Color, 
        speed: 5, 
        shootingFrequency: 60, 
        shootCooldown: 0, 
        bullets: [] 
    };
     
    const drawCircle = (x, y, radius, color) => { 
        ctx.beginPath(); 
        ctx.arc(x, y, radius, 0, Math.PI * 2); 
        ctx.fillStyle = color; 
        ctx.fill(); 
    };
    
    const checkCollision = (bullet, hero) => { const dx = bullet.x - hero.x; const dy = bullet.y - hero.y; const distance = Math.sqrt(dx * dx + dy * dy); return distance < hero.radius; }; 
    const update = () => { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        // Движение героев 
    hero1.y += hero1.speed; hero2.y -= hero2.speed; 
    // Стрельба заклинаниями // Обработка столкновений 
    hero1.bullets.forEach((bullet, index) => { bullet.x += bullet.speed; drawCircle(bullet.x, bullet.y, 5, hero1.color); 
        if (checkCollision(bullet, hero2)) { hero1.bullets.splice(index, 1); // Удаление попавшего заклинания 
    hero2.color = 'green'; // Изменение цвета hero2 при попадании 
} }); 
    hero2.bullets.forEach((bullet, index) => { bullet.x -= bullet.speed; drawCircle(bullet.x, bullet.y, 5, hero2.color); 
        if (checkCollision(bullet, hero1)) { hero2.bullets.splice(index, 1); // Удаление попавшего заклинания 
        hero1.color = 'green'; // Изменение цвета hero1 при попадании 
    } }); // Отрисовка героев 
    drawCircle(hero1.x, hero1.y, hero1.radius, hero1.color);
    drawCircle(hero2.x, hero2.y, hero2.radius, hero2.color); 
    // const update = () => { 
    //     ctx.clearRect(0, 0, canvas.width, canvas.height); 

        requestAnimationFrame(update);
    };

    update();

}, [hero1Color, hero2Color]);

//   }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CanvasComponent;