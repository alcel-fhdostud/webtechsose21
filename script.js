 let x = function getViewportWidth() {
        return window.innerWidth || document.documentElement.clientWidth;
      };    
        console.log(`Die Viewport-Breite beträgt: ${x()} Pixel.`);