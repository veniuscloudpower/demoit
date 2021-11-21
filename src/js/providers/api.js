/* eslint-disable consistent-return, no-use-before-define */
import { SAVE_DEMO_URL, GET_DEMOS_URL } from '../constants';

let requestInFlight = false;
let queue = [];

const emptyQueue = function () {
  if (queue.length > 0) {
    const { state, token, diff } = queue.shift();

    saveDemo(state, token, diff);
  }
};

const saveDemo = async function (state, token, diff) {
  
  localStorage.setItem("myStageSaved",JSON.stringify({ state, a: diff }));
  
};

const getDemos = async function (id, token) {
  try {
    const response = await fetch(GET_DEMOS_URL + '/' + id, { headers: { token } });
    const result = await response.json();

    if (result.error) {
      console.error(result.error);
    } else if (result) {
      return result;
    } else {
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  saveDemo,
  getDemos
};
