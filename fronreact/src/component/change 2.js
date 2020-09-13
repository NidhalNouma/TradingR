import { useEffect, useState } from "react";

function Change() {
  const [vchange, setChange] = useState(0);

  const change = () => setChange(vchange + 1);

  return { vchange, change };
}

export default Change;
