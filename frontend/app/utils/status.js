import chroma from "chroma-js";
import { STATUS_OPTIONS } from "../containers/HomePage/constants";

export const adjustStatusColor = selectedCompany =>
  STATUS_OPTIONS.map(option => {
    let color = (selectedCompany && selectedCompany.color) || "#cccccc";
    switch (option.value) {
      case 1:
        color = chroma(color)
          .brighten()
          .hex();
        break;
      case 3:
        color = chroma(color)
          .darken()
          .hex();
        break;
      default:
        break;
    }
    return {
      ...option,
      color,
    };
  });
