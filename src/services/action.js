import http from "../services/http-common";

const send = (data) => {
  return http.post("/start-signal", data);
};

const Action = {
    send
};

export default Action;