import { useTrail, animated, to } from '@react-spring/web';

const items = ['Lorem', 'ipsum', 'dolor', 'sit'];
const config = { mass: 5, tension: 2000, friction: 200 };

export const StaggeredList = ({ children }: { children: JSX.Element[] }) => {
  const trail = useTrail(children.length, {
    config,
    from: {
      opacity: 0,
      y: 0,
    },
    opacity: 1,
    y: 1
  });

  return (
    <ul>
      {trail.map(({ y, ...rest }, index) => (
        <animated.li
          key={items[index]}
          style={{
            ...rest,
            transform: to([y], y => `scaleY(${y})`),
            transformOrigin: "top",
            overflow: "hidden",
            position: "relative"
          }}
        >
          <animated.div
            style={{
              transformOrigin: "top",
              transform: to([y], y => `scaleY(${1 / y})`)
            }}
          >
            {children[index]}
          </animated.div>
        </animated.li>
      ))}
    </ul>
  );
};

export default StaggeredList;
