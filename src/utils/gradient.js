export class Gradient {
  constructor() {
    this.canvas = null;
    this.gl = null;
    this.running = true;
    this.shaderProgram = null;
    this.animationId = null;
    this.time = 0;
    this.colors = [];
    this.handleResize = this.resize.bind(this);
  }

  initGradient(selector) {
    this.canvas = document.querySelector(selector);
    if (!this.canvas) return;

    this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!this.gl) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const computedStyle = getComputedStyle(this.canvas);
    this.colors = [
      this.hexToRgb(computedStyle.getPropertyValue('--gradient-color-1').trim() || '#fff'),
      this.hexToRgb(computedStyle.getPropertyValue('--gradient-color-2').trim() || '#7038ff'),
      this.hexToRgb(computedStyle.getPropertyValue('--gradient-color-3').trim() || '#00d4ff'),
      this.hexToRgb(computedStyle.getPropertyValue('--gradient-color-4').trim() || '#ffba27')
    ];

    this.initShaders();
    this.animate();

    window.addEventListener('resize', this.handleResize);
  }

  hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    const num = parseInt(hex, 16);
    return [
      ((num >> 16) & 255) / 255,
      ((num >> 8) & 255) / 255,
      (num & 255) / 255
    ];
  }

  initShaders() {
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;

      vec3 hash3(vec2 p) {
        vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                       dot(p, vec2(269.5, 183.3)),
                       dot(p, vec2(419.2, 371.9)));
        return fract(sin(q) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = mix(mix(hash3(i).x, hash3(i + vec2(1.0, 0.0)).x, f.x),
                      mix(hash3(i + vec2(0.0, 1.0)).x, hash3(i + vec2(1.0, 1.0)).x, f.x), f.y);
        return n;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        
        float t = u_time * 0.1;
        float n1 = noise(uv * 2.0 + vec2(t, -t));
        float n2 = noise(uv * 3.0 + vec2(-t, t * 1.2));
        float n3 = noise(uv * 4.0 + vec2(t * 1.5, -t * 0.8));
        
        vec3 color1 = mix(u_color1, u_color2, n1);
        vec3 color2 = mix(u_color3, u_color4, n2);
        vec3 finalColor = mix(color1, color2, n3);
        
        finalColor += vec3(0.05) * noise(uv * 10.0 + t);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);
    this.gl.useProgram(this.shaderProgram);

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(this.shaderProgram, 'position');
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  animate() {
    if (!this.running) return;

    this.time += 0.016;

    const resolutionLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_resolution');
    const timeLocation = this.gl.getUniformLocation(this.shaderProgram, 'u_time');
    
    this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
    this.gl.uniform1f(timeLocation, this.time);

    const colorLocations = [
      this.gl.getUniformLocation(this.shaderProgram, 'u_color1'),
      this.gl.getUniformLocation(this.shaderProgram, 'u_color2'),
      this.gl.getUniformLocation(this.shaderProgram, 'u_color3'),
      this.gl.getUniformLocation(this.shaderProgram, 'u_color4')
    ];

    this.colors.forEach((color, index) => {
      this.gl.uniform3f(colorLocations[index], color[0], color[1], color[2]);
    });

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  pause() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  play() {
    this.running = true;
    this.animate();
  }

  disconnect() {
    this.pause();
    window.removeEventListener('resize', this.handleResize);
  }
}
