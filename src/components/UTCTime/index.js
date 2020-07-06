import React from "react";
import TimeAgo from "../TimeAgo";
import useStyles from "./useStyles";

export default function(props) {
  const style = useStyles();
  const { time, timeago = true } = props;

  if (time === 18446744073709552000) {
    return <span>Forever</span>;
  }
  let timeStr = new Date(time * 1000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

  if (timeago) {
    timeStr = timeStr.replace(/-/gi, ".").split(" ");
    return (
      <span className={style.time}>
        {timeStr[0]}(<TimeAgo time={time * 1000} />)
      </span>
    );
  }
  timeStr = new Date(time * 1000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "")
    .replace(/-/gi, ".");

  return <span className={style.time}>{timeStr}(UTC)</span>;
}
