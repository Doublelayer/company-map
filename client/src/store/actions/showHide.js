import { MINIMIZED, GROUPED_MARKERS } from "../constants/actionTypes";

export const toogleShowHide = () => {
  return {
    type: MINIMIZED
  };
};

export const toogleGroupedMarkers = () => {
  return {
    type: GROUPED_MARKERS
  };
};
