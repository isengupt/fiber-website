import React, { useState, useRef, useMemo } from "react";
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "./components/VisibilitySensor";
import "./styles.css";

import * as THREE from "three/src/Three";

import { Canvas, useRender } from "react-three-fiber";

import { useSpring, animated } from "react-spring/three";
import { useTrail, animated as a, useChain } from "react-spring";
import MeshDash from "./MeshDash";

const FormChain = ({ isVisible }) => {
  const trail1Ref = useRef();
  const trail2Ref = useRef();
  const trail3Ref = useRef();
  const trail4Ref = useRef();

  useChain(
    isVisible
      ? [trail1Ref, trail2Ref, trail3Ref, trail4Ref]
      : [trail4Ref, trail3Ref, trail2Ref, trail1Ref],

    isVisible ? [0.5, 1.0, 1.5, 2.0] : [0.5, 1.0, 1.5, 2.0]
  );

  return (
    <div class="container">
      <form class="form-minimal">
        <FormTrail open={isVisible} trailRef={trail1Ref}>
          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="first-name"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="first-name">First name</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail2Ref}>
          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="last-name"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="last-name">Last name</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail3Ref}>
          <div class="minimal-input">
            <input
              class="minimal-textfield"
              id="email"
              type="text"
              autocomplete="off"
            />
            <div
              class="textfield-underline"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
            <label for="email">Email</label>
          </div>
        </FormTrail>

        <FormTrail open={isVisible} trailRef={trail4Ref}>
          <button class="btn-minimal" type="submit">
            Send
          </button>
        </FormTrail>
      </form>
    </div>
  );
};

const Chain = ({ isVisible }) => {
  const trail1Ref = useRef();

  const trail2Ref = useRef();

  const trail3Ref = useRef();

  useChain(
    isVisible
      ? [trail1Ref, trail2Ref, trail3Ref]
      : [trail3Ref, trail2Ref, trail1Ref],

    isVisible ? [0.4, 0.8, 1.2] : [0.4, 0.8, 1.2]
  );

  return (
    <div className="page__container page__grid">
      <div className="grid__item">
        <ChainTrail open={isVisible} trailRef={trail1Ref}>
          <div className="page__name">INTRO</div>
          <div className="page__line">
            <div className="line"></div>
          </div>
          <div className="page__title">
            Animation videos for blockchain projects and ICO's
          </div>
          <div className="page__description page__big">
            Making complex topics clear
          </div>
          <div className="page__description page__big">
            Making complex topics clear
          </div>
        </ChainTrail>
      </div>
      <div className="grid__item">
        <ChainTrail open={isVisible} trailRef={trail2Ref}>
          <div className="page__name">01</div>
          <div className="page__line">
            <div className="line"></div>
          </div>
          <div className="page__title title__small">
            Animation videos for blockchain projects and ICO's
          </div>
          <div className="page__description page__small">
            Making complex topics clear
          </div>
        </ChainTrail>
      </div>

      <div className="grid__item">
        <ChainTrail open={isVisible} trailRef={trail3Ref}>
          <div className="page__name">01</div>
          <div className="page__line">
            <div className="line"></div>
          </div>
          <div className="page__title title__small">
            Animation videos for blockchain projects and ICO's
          </div>
          <div className="page__description page__small">
            Making complex topics clear
          </div>
        </ChainTrail>
      </div>
    </div>
  );
};

function Trail({ open, children, ...props }) {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="flex__page trails-main" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  );
}

function ChainTrail({ open, trailRef, children, ...props }) {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    ref: trailRef,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    reverse: !open,
  });
  return (
    <div className="flex__page trails-side" {...props}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <a.div>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
    </div>
  );
}

function FormTrail({ open, trailRef, children, ...props }) {
  const items = React.Children.toArray(children);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    ref: trailRef,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    reverse: !open,
  });
  return (
    <div className="flex__page forms-side" {...props}>
      {trail.map(({ x, height, ...rest }, index) => (
        <a.div
          key={items[index]}
          className="forms-text"
          style={{
            ...rest,
            transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
          }}
        >
          <a.div>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
}

function Octahedron({ active, hovered }) {
  /*   const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false); */
  const vertices = [
    [-1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, -1, 0],
    [-1, 0, 0],
  ];
  const { color, pos, ...props } = useSpring({
    color: active ? "hotpink" : "white",
    pos: active ? [0, 0, 2] : [0, 0, 0],
    "material-opacity": hovered ? 0.6 : 0.25,
    scale: active ? [2, 2, 2] : [1, 1, 1],
    rotation: active
      ? [THREE.Math.degToRad(180), 0, THREE.Math.degToRad(45)]
      : [0, 0, 0],
    config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 },
  });
  return (
    <group>
      <animated.line position={pos}>
        <geometry
          attach="geometry"
          vertices={vertices.map((v) => new THREE.Vector3(...v))}
        />
        <animated.lineBasicMaterial attach="material" color={color} />
      </animated.line>
      <animated.mesh {...props}>
        <octahedronGeometry attach="geometry" />
        <meshStandardMaterial attach="material" color="grey" transparent />
      </animated.mesh>
    </group>
  );
}

function App() {
  const [active, setActive] = useState(false);
  const [hovered, setHover] = useState(false);
  return (
    <main>
      <div className="frame">
        <div className="frame__title-wrap">
          <h1 className="frame__title">Ishan Sengupta</h1>
          <p className="frame__tagline">Front-end experimentation</p>
        </div>
        <div className="frame__links">
          <a href="https://www.dropbox.com/s/129owvam7kedah1/ISHAN_SENGUPTA_RESUME.pdf?dl=0">
            Resume
          </a>
        </div>
        <div className="frame__demos">
          <a
            href="#"
            activeClassName="frame__demo--current"
            className="frame__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            activeClassName="frame__demo--current"
            className="frame__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            activeClassName="frame__demo--current"
            className="frame__demo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="content">
        <div style={{ width: "100%" }}>
          <div className="div">
            <div className="page__container">
              <MeshDash />
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <>
                    <Trail open={isVisible}>
                      <div className="page__name">INTRO</div>
                      <div className="page__line">
                        <div
                          className="line"
                          style={{ width: isVisible ? "50px" : "0px" }}
                        ></div>
                      </div>
                      <div className="page__title">
                        Animation videos for blockchain projects and ICO's
                      </div>
                      <div className="page__description">
                        Making complex topics clear
                      </div>
                    </Trail>
                  </>
                )}
              </VisibilitySensor>
            </div>
          </div>
          <div className="div">
            <VisibilitySensor partialVisibility>
              {({ isVisible }) => <Chain isVisible={isVisible} />}
            </VisibilitySensor>
          </div>
          <div className="div">
            <div className="page__container page__grid__alternate">
              <div className="grid__item">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <Trail open={isVisible}>
                      <div className="page__name">IMPORTANT INFO</div>
                      <div className="page__line">
                        <div className="line"></div>
                      </div>
                      <div className="page__title">
                        Animation videos for blockchain projects and ICO's
                      </div>
                      <div
                        className="page__description page__big page__flex"
                        onClick={(e) => setActive(!active)}
                        onPointerOver={(e) => setHover(true)}
                        onPointerOut={(e) => setHover(false)}
                      >
                        <div className="page__number">01</div>
                        <div>Unique style</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">02</div>
                        <div>Translation</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">03</div>
                        <div>Subtitles</div>
                      </div>
                    </Trail>
                  )}
                </VisibilitySensor>
              </div>
              <div className="grid__item full_height">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <>
                      <Spring
                        delay={300}
                        to={{
                          position: "absolute",
                          opacity: isVisible ? 1 : 0,
                        }}
                      >
                        {({ opacity }) => (
                          <Canvas
                            style={{ position: "absolute", opacity: opacity }}
                          >
                            <ambientLight color="lightblue" />
                            <pointLight
                              color="white"
                              intensity={1}
                              position={[10, 10, 10]}
                            />
                            <Octahedron active={active} hovered={hovered} />
                          </Canvas>
                        )}
                      </Spring>
                      <Trail open={isVisible}>
                        <div className="page__description page__big page__flex page__bold">
                          <div className="page__number">03</div>
                          <div>Subtitles</div>
                        </div>
                        <div
                          className="page__description"
                          style={{ fontWeight: "bold" }}
                        >
                          INTRO
                        </div>
                      </Trail>
                    </>
                  )}
                </VisibilitySensor>
              </div>
            </div>
          </div>
          <div className="div">
            <div className="page__container page__grid__alternate">
              <div className="grid__item">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <Trail open={isVisible}>
                      <div className="page__name">INTRO</div>
                      <div className="page__line">
                        <div className="line"></div>
                      </div>
                      <div className="page__title">
                        Animation videos for blockchain projects and ICO's
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">02</div>
                        <div>Translation</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">03</div>
                        <div>Subtitles</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">02</div>
                        <div>Translation</div>
                      </div>
                      <div className="page__description page__big page__flex">
                        <div className="page__number">03</div>
                        <div>Subtitles</div>
                      </div>
                    </Trail>
                  )}
                </VisibilitySensor>
              </div>

              <VisibilitySensor once>
                {({ isVisible }) => <FormChain isVisible={isVisible} />}
              </VisibilitySensor>
              {/*              <div class="container">
                <form class="form-minimal">
                  <div class="minimal-input">
                    <input
                      class="minimal-textfield"
                      id="first-name"
                      type="text"
                      autocomplete="off"
                    />
                    <div class="textfield-underline"></div>
                    <label for="first-name">First name</label>
                  </div>
                  <div class="minimal-input">
                    <input
                      class="minimal-textfield"
                      id="last-name"
                      type="text"
                      autocomplete="off"
                    />
                    <div class="textfield-underline"></div>
                    <label for="last-name">Last name</label>
                  </div>
                  <div class="minimal-input">
                    <input
                      class="minimal-textfield"
                      id="email"
                      type="text"
                      autocomplete="off"
                    />
                    <div class="textfield-underline"></div>
                    <label for="email">Email</label>
                  </div>
                  <button class="btn-minimal" type="submit">
                    Send
                  </button>
                </form>
              </div> */}
            </div>
            {/*   <VisibilitySensor once>
            {({ isVisible }) => (
              <Spring delay={300} to={{ opacity: isVisible ? 1 : 0 }}>
                {({ opacity }) => <h2 style={{ opacity }}>Hello</h2>}
              </Spring>
            )}
          </VisibilitySensor> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
