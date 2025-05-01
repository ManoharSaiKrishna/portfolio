class Particles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particlesArray = [];
        this.numberOfParticles = window.innerWidth < 768 ? 30 : 50;
        this.initCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    initCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        document.body.appendChild(this.canvas);
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.particlesArray = [];
        this.numberOfParticles = window.innerWidth < 768 ? 30 : 50;
        this.createParticles();
    }
    
    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particlesArray.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    updateParticles() {
        for (let i = 0; i < this.particlesArray.length; i++) {
            let p = this.particlesArray[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.size > 0.2) p.size -= 0.01;
            
            if (p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height || p.size <= 0.2) {
                this.particlesArray[i] = {
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.2
                };
            }
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particlesArray.length; i++) {
            let p = this.particlesArray[i];
            
            if (document.body.classList.contains('dark-mode')) {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            } else {
                this.ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
            }
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
    
    connectParticles() {
        let maxDistance = 100;
        
        for (let a = 0; a < this.particlesArray.length; a++) {
            for (let b = a; b < this.particlesArray.length; b++) {
                const dx = this.particlesArray[a].x - this.particlesArray[b].x;
                const dy = this.particlesArray[a].y - this.particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    
                    if (document.body.classList.contains('dark-mode')) {
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    } else {
                        this.ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.15})`;
                    }
                    
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particlesArray[a].x, this.particlesArray[a].y);
                    this.ctx.lineTo(this.particlesArray[b].x, this.particlesArray[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.connectParticles();
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize particles when page is loaded
window.addEventListener('load', () => {
    // Only initialize particles if not on mobile
    if (window.innerWidth > 768) {
        new Particles();
    }
});