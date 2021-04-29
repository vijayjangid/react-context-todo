import { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";

const throttle = (func, delay = 100) => {
  var timerId, skip;

  return (...args) => {
    if (timerId && skip) {
      return;
    }
    if (!skip) {
      skip = true;
      func.call(null, ...args);
    }
    timerId = setTimeout(() => {
      skip = false;
      func.call(null, ...args);
      clearTimeout(timerId);
      timerId = undefined;
    }, delay);
  };
};

export const useScrollPosition = (ref) => {
  const [scrollPosition, setPosition] = useState(() => ({
    scrollTop: 0,
    scrollHeight: 0,
    atTop: true,
    atBottom: false
  }));
  useLayoutEffect(() => {
    const { current } = ref;
    function updatePosition() {
      const { scrollTop, scrollHeight, clientHeight } = current;
      const atTop = scrollTop === 0;
      const atBottom = scrollHeight - scrollTop === clientHeight;
      setPosition(() => ({
        scrollTop,
        scrollHeight,
        atTop,
        atBottom
      }));
    }
    ReactDOM.findDOMNode(current).addEventListener(
      "scroll",
      throttle(updatePosition)
    );
    return () =>
      ReactDOM.findDOMNode(current).removeEventListener(
        "scroll",
        updatePosition
      );
  }, [ref]);
  return scrollPosition;
};
