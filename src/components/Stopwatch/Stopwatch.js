import React, { useState, useRef, useEffect } from "react";
import styles from "./Stopwatch.module.css";

const getHours = (time) => {
  return Math.floor(time / (1000 * 60 * 60)) % 24;
};

const getMinutes = (time) => {
  return Math.floor(time / (1000 * 60)) % 60;
};

const getSeconds = (time) => {
  return Math.floor(time / 1000) % 60;
};

const getMilliSeconds = (time) => {
  return Math.floor(time % 1000);
};

const formatTime = (time) => {
  var h = getHours(time);
  var m = getMinutes(time);
  var s = getSeconds(time);
  var ms = getMilliSeconds(time);
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  if (ms < 100) {
    ms = "0" + ms;
  }
  if (ms < 10) {
    ms = "0" + ms;
  }
  return {
    h,
    m,
    s,
    ms,
  };
};

function Stopwatch() {
  const clock = useRef(0);
  const offset = useRef(0);
  const interval = useRef();
  const [time, setTime] = useState(formatTime(0));
  const [status, setStatus] = useState("stopped");
  const del = useRef(0);

  useEffect(() => {
    let interval = null;
    if (status === "running") {
      interval = setInterval(update, 1);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);

  const delta = () => {
    const now = Date.now(),
      d = now - offset.current;
    offset.current = now;
    return d;
  };

  const update = () => {
    clock.current += delta();
    setTime(formatTime(clock.current));
  };

  const start = () => {
    if (status === "running") {
      return;
    }
    offset.current = Date.now();
    setStatus("running");
  };

  const stop = () => {
    if (status === "stopped") {
      return;
    }
    setStatus("stopped");
  };

  const reset = () => {
    clock.current = 0;
    setTime(formatTime(0));
  };

  return (
    <div className={styles.main}>
      <div className={styles.clock}>
        {`${time.h}:${time.m}:${time.s}:${time.ms}`}
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
