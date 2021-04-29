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

function updatePosition(ref, setPosition) {
  const { scrollTop, scrollHeight, clientHeight } = ref.current;
  const atTop = scrollTop === 0;
  const atBottom = Math.abs(scrollHeight - scrollTop - clientHeight) <= 1;
  const noScrollVisible = atTop && atBottom;
  setPosition(() => ({
    scrollTop,
    scrollHeight,
    atTop,
    atBottom,
    noScrollVisible
  }));
}

export const useScrollPosition = (ref) => {
  const [scrollPosition, setPosition] = useState(() => ({}));

  useLayoutEffect(() => {
    updatePosition(ref, setPosition);
  }, [ref, setPosition]);

  useLayoutEffect(() => {
    const { current } = ref;
    function handleScroll() {
      updatePosition(ref, setPosition);
    }
    ReactDOM.findDOMNode(current).addEventListener(
      "scroll",
      throttle(handleScroll)
    );
    return () =>
      ReactDOM.findDOMNode(current).removeEventListener("scroll", handleScroll);
  }, [ref, setPosition]);

  return scrollPosition;
};
