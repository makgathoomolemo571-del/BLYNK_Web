import * as storyRoutes from "./routes/index";
import * as storyConstants from "./constants/story.constants";
import * as storyValidators from "./validators/story.validator";
import { storyDTO } from "./dto/story.dto";

export default {
  routes: storyRoutes,
  constants: storyConstants,
  validators: storyValidators,
  dto: storyDTO,
};