// Application state
let isRecording = false;
let recordingTimer = null;
let transcriptTimer = null;
let waveformTimer = null;

// Sample transcript phrases for simulation
const transcriptPhrases = [
    "Hello, this is a test recording...",
    "I'm discussing the future of AI technology...",
    "The meeting covered several important topics...",
    "We talked about innovative solutions...",
    "The conversation was very productive...",
    "Key insights were shared during the session...",
    "Everyone contributed valuable perspectives...",
    "The discussion led to actionable next steps..."
];

// Application data
const appData = {
    conversations: [
        {
            id: 1,
            category: "Entrepreneurship",
            title: "Startup Networking at AI Event in SF",
            description: "Participants discussed their roles at various AI-focused startups and research centers",
            time: "Jun 17, 2:00 PM",
            icon: "💡",
            color: "#FF0080"
        },
        {
            id: 2,
            category: "Education",
            title: "Discussing EdTech Outreach and Student",
            description: "The conversation centers on strategies for engaging students within EdTech platforms",
            time: "Jun 17, 1:38 PM",
            icon: "📚",
            color: "#00FF85"
        }
    ],
    achievements: [
        {
            id: 1,
            title: "5-Day Streak!",
            icon: "🔥",
            progress: 100,
            color: "#FF0080"
        },
        {
            id: 2,
            title: "100 Conversations",
            icon: "🏆",
            progress: 75,
            color: "#00D4FF"
        },
        {
            id: 3,
            title: "Early Bird",
            icon: "🌅",
            progress: 50,
            color: "#A855F7"
        }
    ]
};

// DOM Elements
const recordButton = document.getElementById('recordButton');
const recordingStatus = document.getElementById('recordingStatus');
const transcriptText = document.getElementById('transcriptText');
const recordingWidget = document.querySelector('.recording-widget');
const searchInput = document.querySelector('.search-input');
const achievementCards = document.querySelectorAll('.achievement-card');
const conversationCards = document.querySelectorAll('.conversation-card');
const celebrationEffect = document.getElementById('celebrationEffect');

// Initialize the application
function initializeApp() {
    setupEventListeners();
    initializeWaveform();
    setupSearchFunctionality();
    setupAchievementInteractions();
    setupConversationInteractions();
    
    // Add fade-in animation to main elements
    setTimeout(() => {
        document.querySelector('.recording-widget').classList.add('fade-in');
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.search-container').classList.add('fade-in');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.achievements-section').classList.add('fade-in');
    }, 500);
    
    setTimeout(() => {
        document.querySelector('.conversations-section').classList.add('fade-in');
    }, 700);
}

// Set up event listeners
function setupEventListeners() {
    recordButton.addEventListener('click', toggleRecording);
    
    // Add touch feedback for mobile
    recordButton.addEventListener('touchstart', () => {
        recordButton.style.transform = 'scale(0.95)';
    });
    
    recordButton.addEventListener('touchend', () => {
        recordButton.style.transform = '';
    });
}

// Toggle recording state
function toggleRecording() {
    isRecording = !isRecording;
    
    if (isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

// Start recording
function startRecording() {
    recordingWidget.classList.add('recording');
    recordingStatus.textContent = 'Listening... Tap to stop';
    transcriptText.textContent = '';
    
    // Start waveform animation
    animateWaveform();
    
    // Start simulated transcript
    startTranscriptSimulation();
    
    // Add glow effect
    recordingWidget.classList.add('glow-blue');
    
    // Haptic feedback simulation (visual feedback)
    recordButton.classList.add('bounce-in');
    setTimeout(() => {
        recordButton.classList.remove('bounce-in');
    }, 600);
}

// Stop recording
function stopRecording() {
    recordingWidget.classList.remove('recording');
    recordingStatus.textContent = 'Tap to start recording';
    
    // Stop timers
    if (transcriptTimer) {
        clearInterval(transcriptTimer);
        transcriptTimer = null;
    }
    
    if (waveformTimer) {
        clearInterval(waveformTimer);
        waveformTimer = null;
    }
    
    // Remove glow effect
    recordingWidget.classList.remove('glow-blue');
    
    // Show completion message
    setTimeout(() => {
        transcriptText.textContent = 'Recording saved successfully!';
        triggerSuccessEffect();
    }, 500);
    
    // Reset transcript after delay
    setTimeout(() => {
        transcriptText.textContent = 'Live transcript will appear here...';
    }, 3000);
}

// Initialize waveform with base heights
function initializeWaveform() {
    const waveBars = document.querySelectorAll('.wave-bar');
    const heights = [0.3, 0.7, 0.4, 0.8, 0.6, 0.9, 0.5, 0.7];
    
    waveBars.forEach((bar, index) => {
        const height = heights[index] * 20 + 8; // Scale to pixels
        bar.style.height = `${height}px`;
    });
}

// Animate waveform during recording
function animateWaveform() {
    const waveBars = document.querySelectorAll('.wave-bar');
    
    waveformTimer = setInterval(() => {
        waveBars.forEach((bar) => {
            const randomHeight = Math.random() * 40 + 12;
            bar.style.height = `${randomHeight}px`;
        });
    }, 150);
}

// Start transcript simulation
function startTranscriptSimulation() {
    let phraseIndex = 0;
    let charIndex = 0;
    let currentPhrase = transcriptPhrases[phraseIndex];
    
    transcriptTimer = setInterval(() => {
        if (charIndex < currentPhrase.length) {
            transcriptText.textContent = currentPhrase.substring(0, charIndex + 1) + '|';
            charIndex++;
        } else {
            // Move to next phrase
            phraseIndex = (phraseIndex + 1) % transcriptPhrases.length;
            currentPhrase = transcriptPhrases[phraseIndex];
            charIndex = 0;
            
            // Clear and start new phrase
            setTimeout(() => {
                transcriptText.textContent = '';
            }, 1000);
        }
    }, 100);
}

// Setup search functionality
function setupSearchFunctionality() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        // Add visual feedback
        const searchBar = document.querySelector('.search-bar');
        if (query.length > 0) {
            searchBar.classList.add('glow-blue');
        } else {
            searchBar.classList.remove('glow-blue');
        }
        
        // Filter conversations (simulation)
        conversationCards.forEach(card => {
            const title = card.querySelector('.conversation-title')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.conversation-description')?.textContent.toLowerCase() || '';
            
            if (title.includes(query) || description.includes(query) || query === '') {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Clear search on focus
    searchInput.addEventListener('focus', () => {
        document.querySelector('.search-bar').classList.add('glow-blue');
    });
    
    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') {
            document.querySelector('.search-bar').classList.remove('glow-blue');
        }
    });
}

// Setup achievement interactions
function setupAchievementInteractions() {
    achievementCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            triggerAchievementCelebration(index);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            addGlowEffect(card, appData.achievements[index].color);
        });
        
        card.addEventListener('mouseleave', () => {
            removeGlowEffect(card);
        });
        
        // Touch events for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = '';
        });
    });
}

// Setup conversation interactions
function setupConversationInteractions() {
    conversationCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Simulate opening conversation
            card.classList.add('bounce-in');
            addGlowEffect(card, appData.conversations[index].color);
            
            // Show feedback
            setTimeout(() => {
                card.classList.remove('bounce-in');
                removeGlowEffect(card);
            }, 1000);
        });
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Trigger achievement celebration
function triggerAchievementCelebration(achievementIndex) {
    const achievement = appData.achievements[achievementIndex];
    const card = achievementCards[achievementIndex];
    
    // Add special effects
    card.classList.add('bounce-in');
    addGlowEffect(card, achievement.color);
    
    // Trigger celebration particles
    triggerCelebrationEffect();
    
    // Remove effects after animation
    setTimeout(() => {
        card.classList.remove('bounce-in');
        removeGlowEffect(card);
    }, 2000);
}

// Trigger celebration particle effect
function triggerCelebrationEffect() {
    celebrationEffect.classList.add('active');
    
    const particles = celebrationEffect.querySelectorAll('.celebration-particle');
    particles.forEach((particle, index) => {
        // Random positions
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = (index * 0.2) + 's';
        
        // Reset animation
        particle.style.animation = 'none';
        particle.offsetHeight; // Trigger reflow
        particle.style.animation = 'celebrate 2s ease-out forwards';
    });
    
    // Hide effect after animation
    setTimeout(() => {
        celebrationEffect.classList.remove('active');
    }, 2000);
}

// Trigger success effect
function triggerSuccessEffect() {
    const widget = document.querySelector('.recording-widget');
    widget.classList.add('glow-green');
    
    setTimeout(() => {
        widget.classList.remove('glow-green');
    }, 2000);
}

// Add glow effect with specific color
function addGlowEffect(element, color) {
    const glowClass = getGlowClass(color);
    element.classList.add(glowClass);
}

// Remove glow effect
function removeGlowEffect(element) {
    element.classList.remove('glow-blue', 'glow-purple', 'glow-magenta', 'glow-green');
}

// Get appropriate glow class based on color
function getGlowClass(color) {
    switch (color) {
        case '#00D4FF':
            return 'glow-blue';
        case '#A855F7':
            return 'glow-purple';
        case '#FF0080':
            return 'glow-magenta';
        case '#00FF85':
            return 'glow-green';
        default:
            return 'glow-blue';
    }
}

// Smooth scroll behavior
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Handle device orientation changes
function handleOrientationChange() {
    // Recalculate layouts if needed
    setTimeout(() => {
        initializeWaveform();
    }, 100);
}

// Add device orientation listener
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Prevent zoom on double tap for mobile
document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

// Performance optimization: Reduce animations when not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause non-essential animations
        if (waveformTimer && !isRecording) {
            clearInterval(waveformTimer);
        }
    } else {
        // Resume animations if recording
        if (isRecording && !waveformTimer) {
            animateWaveform();
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !searchInput.contains(document.activeElement)) {
        e.preventDefault();
        toggleRecording();
    }
});

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for potential use
window.OmiApp = {
    toggleRecording,
    isRecording: () => isRecording,
    triggerCelebrationEffect,
    addGlowEffect,
    removeGlowEffect
};