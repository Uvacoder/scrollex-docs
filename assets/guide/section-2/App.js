import { Scroll } from "./scrollex";
import "./styles.css";

const keyframes = {
  heading: {
    0: {
      rotateZ: "0deg",
    },
    200: {
      rotateZ: "180deg",
    },
  },
};

export default function App() {
  return (
    <Scroll.Container scrollAxis="y" className="h-screen">
      <Scroll.Section className="h-full children-center">
        <Scroll.Item keyframes={keyframes.heading}>
          <h1>Page One</h1>
        </Scroll.Item>
      </Scroll.Section>
      <Scroll.Section className="h-full children-center">
        <Scroll.Item keyframes={keyframes.heading}>
          <h1>Page Two</h1>
        </Scroll.Item>
      </Scroll.Section>
      <Scroll.Section className="h-full children-center">
        <Scroll.Item keyframes={keyframes.heading}>
          <h1>Page Three</h1>
        </Scroll.Item>
      </Scroll.Section>
    </Scroll.Container>
  );
}
