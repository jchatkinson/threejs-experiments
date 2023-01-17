import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";

type Point = [number, number];

const dotsAtom = atom<Point[]>([]);

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(
  null,
  (get, set) => {
    set(drawingAtom, true);
  }
);

const handleMouseUpAtom = atom(null, (get, set) => {
  set(drawingAtom, false);
});

const handleMouseMoveAtom = atom(
  null,
  (get, set, update: Point) => {
    if (get(drawingAtom)) {
      set(dotsAtom, (prev) => [...prev, update]);
    }
  }
);

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);
  return (
    <g>
      {dots.map(([x, y]) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  );
};

const useCommitCount = () => {
  const commitCountRef = useRef(0);
  useEffect(() => {
    commitCountRef.current += 1;
  });
  return commitCountRef.current;
};

export default function SvgJotai() {
  const [, handleMouseUp] = useAtom(
    handleMouseUpAtom
  );
  const [, handleMouseDown] = useAtom(
    handleMouseDownAtom
  );
  const [, handleMouseMove] = useAtom(
    handleMouseMoveAtom
  );
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        handleMouseMove([e.clientX, e.clientY]);
      }}
    >
      <rect width="400" height="400" fill="#eee" />
      <text x="3" y="12" font-size="12px">
        Commits: {useCommitCount()}
      </text>
      <SvgDots />
    </svg>
  );
};