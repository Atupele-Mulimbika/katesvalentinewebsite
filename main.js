document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const successMessage = document.getElementById('successMessage');
    const musicBtn = document.getElementById('musicBtn');
    const shareBtn = document.getElementById('shareBtn');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const ctx = confettiCanvas.getContext('2d');
    
    // Audio elements
    const heartbeatSound = document.getElementById('heartbeatSound');
    const romanticMusic = document.getElementById('romanticMusic');
    const successSound = document.getElementById('successSound');
    
    // Countdown elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    // No button messages
    const noMessages = [
        "Are you sure?",
        "Really sure?",
        "Think about it...",
        "Give it another thought!",
        "Last chance!",
        "You might regret this!",
        "Have a heart!",
        "Don't do this to me!",
        "I'm gonna cry...",
        "You're breaking my heart!",
        "I'll be so sad!",
        "Pretty please?",
        "With a cherry on top?",
        "For the sake of love!",
        "I'll make it worth it!",
        "Say yes, I dare you!",
        "I double dare you!",
        "Okay, last last chance!",
        "Just click yes already!",
        "You know you want to!",
        "Come on, be my Valentine!",
        "I believe in us!",
        "Don't you love me?",
        "I'll keep asking forever!",
        "This could be the beginning!",
        "Think of the memories!",
        "It'll be magical!",
        "I promise to make you smile!",
        "Your happiness is my goal!",
        "Let's create magic together!",
        "I'm not giving up!",
        "My love is endless!",
        "Like my patience!",
        "Just say yes!",
        "Pretty pretty please?",
        "With sugar on top?",
        "For old times' sake?",
        "For new memories?",
        "Because we're amazing!",
        "Because you're amazing!",
        "Because I'm amazing!",
        "Because we're perfect!",
        "Just click the pink button!"
    ];
    
    let noClickCount = 0;
    let confettiParticles = [];
    let isMusicPlaying = false;
    
    // Initialize
    function init() {
        // Set canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Start heartbeat sound
        heartbeatSound.volume = 0.3;
        heartbeatSound.play().catch(e => console.log("Audio autoplay blocked"));
        
        // Start animations
        createFloatingHearts();
        startConfetti();
    }
    
    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    
    // No button behavior - REMOVED MOVING FUNCTIONALITY
    noBtn.addEventListener('click', function() {
        noClickCount++;
        
        // Get message based on click count
        const messageIndex = Math.min(noClickCount - 1, noMessages.length - 1);
        noBtn.textContent = noMessages[messageIndex];
        
        // Make button shrink and fade
        const scale = Math.max(0.7, 1 - (noClickCount * 0.03));
        noBtn.style.transform = `scale(${scale})`;
        noBtn.style.opacity = Math.max(0.4, 1 - (noClickCount * 0.02));
        
        // Make yes button grow and become more attractive
        yesBtn.style.transform = `scale(${Math.min(1.5, 1 + (noClickCount * 0.1))})`;
        
        // Add shake animation to NO button
        noBtn.classList.add('animate__animated', 'animate__headShake');
        setTimeout(() => {
            noBtn.classList.remove('animate__animated', 'animate__headShake');
        }, 500);
        
        // Add pulse animation to YES button
        yesBtn.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            yesBtn.classList.remove('animate__animated', 'animate__pulse');
        }, 500);
        
        // Change yes button text occasionally to make it more appealing
        if (noClickCount % 3 === 0) {
            const yesMessages = [
                "YES PLEASE! 💖",
                "SAY YES! 🌹",
                "PICK ME! 💕",
                "CHOOSE LOVE! 😍",
                "YES = HAPPINESS! 🥰",
                "I'M WAITING! 💘",
                "CLICK ME! 🌟"
            ];
            const randomIndex = Math.floor(Math.random() * yesMessages.length);
            yesBtn.innerHTML = `<i class="fas fa-heart"></i> ${yesMessages[randomIndex]} <i class="fas fa-heart"></i>`;
            
            setTimeout(() => {
                yesBtn.innerHTML = '<i class="fas fa-heart"></i> YES! <i class="fas fa-heart"></i>';
            }, 1500);
        }
        
        // Add confetti from the NO button position
        const btnRect = noBtn.getBoundingClientRect();
        createMiniConfetti(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);
        
        // Play a sound
        playClickSound();
        
        // If we've run out of messages, loop back
        if (noClickCount >= noMessages.length) {
            noClickCount = Math.floor(noMessages.length / 2);
        }
    });
    
    // Yes button behavior
    yesBtn.addEventListener('click', function() {
        // Remove no button event listeners
        const newNoBtn = noBtn.cloneNode(true);
        noBtn.parentNode.replaceChild(newNoBtn, noBtn);
        
        // Show success message
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('show');
        }, 10);
        
        // Play success sound
        successSound.volume = 0.5;
        successSound.play();
        
        // Play romantic music
        romanticMusic.volume = 0.4;
        romanticMusic.play();
        isMusicPlaying = true;
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        
        // Update yes button
        yesBtn.innerHTML = '<i class="fas fa-heart"></i> YES! FOREVER! <i class="fas fa-heart"></i>';
        yesBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.classList.remove('animate__heartBeat');
        
        // Disable no button
        noBtn.style.opacity = '0.3';
        noBtn.style.pointerEvents = 'none';
        noBtn.textContent = 'Missed Opportunity 😢';
        
        // Start massive confetti
        createMassiveConfetti();
        
        // Start countdown
        startCountdown();
        
        // Create floating hearts celebration
        createCelebrationHearts();
    });
    
    // Music button
    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            romanticMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> Play Our Song';
        } else {
            romanticMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
        }
        isMusicPlaying = !isMusicPlaying;
    });
    
    // Share button
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'I Said Yes! 💝',
                text: `I just said YES to being [Your Name]'s Valentine! 🥰💖`,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`I just said YES to being [Your Name]'s Valentine! 🥰💖 ${window.location.href}`);
            shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share the News';
            }, 2000);
        }
    });
    
    // Countdown function
    function startCountdown() {
        function updateCountdown() {
            const now = new Date();
            let valentineDate = new Date(now.getFullYear(), 1, 14); // February 14
            
            // If Valentine's Day has passed this year, use next year
            if (now > valentineDate) {
                valentineDate = new Date(now.getFullYear() + 1, 1, 14);
            }
            
            const diff = valentineDate - now;
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Animate seconds
            secondsEl.parentElement.classList.add('animate__pulse');
            setTimeout(() => {
                secondsEl.parentElement.classList.remove('animate__pulse');
            }, 500);
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Confetti system
    function startConfetti() {
        // Create some initial floating hearts
        for (let i = 0; i < 50; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 2 + 1,
                color: ['#ff4081', '#ff79b0', '#b76e79', '#ffd700'][Math.floor(Math.random() * 4)],
                shape: Math.random() > 0.5 ? 'heart' : 'circle',
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 5 - 2.5
            });
        }
        
        animateConfetti();
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiParticles.forEach(particle => {
            // Update position
            particle.y += particle.speed;
            particle.x += Math.sin(particle.y * 0.01) * 0.5;
            particle.rotation += particle.rotationSpeed;
            
            // Reset if off screen
            if (particle.y > confettiCanvas.height) {
                particle.y = -10;
                particle.x = Math.random() * confettiCanvas.width;
            }
            
            // Draw particle
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            
            if (particle.shape === 'heart') {
                drawHeart(ctx, 0, 0, particle.size, particle.color);
            } else {
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.restore();
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    function drawHeart(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
    }
    
    function createMiniConfetti(x, y) {
        for (let i = 0; i < 20; i++) {
            confettiParticles.push({
                x: x,
                y: y,
                size: Math.random() * 8 + 3,
                speed: Math.random() * 5 + 2,
                color: ['#ff4081', '#ff79b0', '#b76e79'][Math.floor(Math.random() * 3)],
                shape: 'heart',
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                gravity: 0.1,
                life: 100
            });
        }
    }
    
    function createMassiveConfetti() {
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                confettiParticles.push({
                    x: Math.random() * confettiCanvas.width,
                    y: -10,
                    size: Math.random() * 15 + 5,
                    speed: Math.random() * 8 + 3,
                    color: ['#ff4081', '#ff79b0', '#b76e79', '#ffd700', '#ffffff'][Math.floor(Math.random() * 5)],
                    shape: Math.random() > 0.3 ? 'heart' : 'circle',
                    rotation: Math.random() * 360,
                    rotationSpeed: Math.random() * 15 - 7.5,
                    gravity: 0.15,
                    life: 150
                });
            }, i * 10);
        }
    }
    
    // Create floating hearts in background
    function createFloatingHearts() {
        const heartsContainer = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                heart.style.fontSize = `${Math.random() * 20 + 15}px`;
                heart.style.opacity = Math.random() * 0.3 + 0.1;
                heart.style.animation = `float ${Math.random() * 20 + 10}s infinite linear`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                heartsContainer.appendChild(heart);
            }, i * 300);
        }
    }
    
    // Create celebration hearts
    function createCelebrationHearts() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                heart.style.fontSize = `${Math.random() * 40 + 20}px`;
                heart.style.opacity = '1';
                heart.style.zIndex = '1001';
                heart.style.pointerEvents = 'none';
                heart.style.animation = `bounce ${Math.random() * 2 + 1}s infinite`;
                document.body.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    heart.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    // Play click sound
    function playClickSound() {
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
        audio.volume = 0.3;
        audio.play();
    }
    
    // Initialize everything
    init();
});