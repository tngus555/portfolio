document.addEventListener("DOMContentLoaded", () => {
  // 기존 네비게이션 코드
  const gnbBtn = document.querySelectorAll(".gnb-btn");
  let selectedBtn = document.querySelector(".selected");

  const setAnchorOnSelected = () => {
    if (selectedBtn) {
      selectedBtn.style.anchorName = "--selected";
    }
  };

  setAnchorOnSelected();

  gnbBtn.forEach((button) => {
    button.addEventListener("click", () => {
      if (selectedBtn) {
        selectedBtn.classList.remove("selected");
        selectedBtn.style.anchorName = "";
      }
      selectedBtn = button;
      selectedBtn.classList.add("selected");
      setAnchorOnSelected();
    });

    const handleInteractionStart = () => {
      if (button !== selectedBtn) {
        if (selectedBtn) {
          selectedBtn.style.anchorName = "";
        }
        button.style.anchorName = "--selected";
      }
    };

    button.addEventListener("mouseenter", handleInteractionStart);
    button.addEventListener("focus", handleInteractionStart);

    const handleInteractionEnd = () => {
      if (button !== selectedBtn) {
        button.style.anchorName = "";
        setAnchorOnSelected();
      }
    };

    button.addEventListener("mouseleave", handleInteractionEnd);
    button.addEventListener("blur", handleInteractionEnd);
  });

  const gnbLinks = document.querySelectorAll(".gnb-top a");
  gnbLinks.forEach((link) => {
    const hoverImg = link.dataset.hover;
    link.addEventListener("mouseenter", () => {
      link.style.color = "transparent";
      link.style.backgroundImage = `url(${hoverImg})`;
      link.style.backgroundSize = "contain";
      link.style.backgroundRepeat = "no-repeat";
      link.style.backgroundPosition = "center";
    });
    link.addEventListener("mouseleave", () => {
      link.style.color = "";
      link.style.backgroundImage = "";
    });
  });

  const wave = document.querySelector(".wave");
  document.addEventListener("mousemove", (e) => {
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
  });

  // ===== WebGL 멜팅 효과 =====
  const textBg = document.querySelector(".text-bg");
  const canvas = document.createElement("canvas");
  textBg.appendChild(canvas);

  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) {
    console.error("WebGL not supported");
    return;
  }

  // 캔버스 스타일 설정
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  // 캔버스 크기 설정
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  window.addEventListener("resize", resize);

  // 버텍스 셰이더
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  // 프래그먼트 셰이더 - 멜팅 효과
  const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_hover;
    varying vec2 v_texCoord;

    // 노이즈 함수
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
      vec2 uv = v_texCoord;
      

      
                    // 멜팅 효과 - 시간에 따라 UV를 아래로 왜곡
      

      
                    float meltAmount = (noise(vec2(uv.x * 5.0, u_time * 0.3)) - 0.5) * 0.15; // -0.5를 추가하여 효과를 중앙 정렬
      

      
                    uv.y += meltAmount; // smoothstep을 제거하여 전체 영역에 효과 적용
      
          
      
          // 드리핑 - 세로로 물결치는 효과
      
          float drip = sin(uv.x * 10.0 + u_time * 0.5) * 0.02;
      
          uv.y += drip; // smoothstep을 제거하여 전체 영역에 효과 적용
      
      // 텍스처 샘플링
      vec4 color = texture2D(u_texture, uv);
      
      // UV가 범위를 벗어나면 투명하게
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        color = vec4(0.0);
      }
      
      gl_FragColor = color;
    }
  `;

  // 셰이더 컴파일
  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  // 프로그램 생성
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }

  gl.useProgram(program);

  // 버퍼 설정
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
    gl.STATIC_DRAW
  );

  const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

  // 유니폼 위치
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

  // 텍스처 로드
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0])
  );

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = "./img/home-bg.svg";
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };



          
  // 애니메이션 루프
  let time = 0;
  function render() {
    time += 0.016;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  render();
});
