export function increaseEncoder() {
  return {type: "increase", socket: true};
};

export function decreaseEncoder() {
  return {type: "decrease", socket: true};
}

export function setValue(value) {
  return {type: "setValue", socket: true, value };
}