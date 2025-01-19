import OngCategoryEnum from "../utils/OngCategoryEnum";
import ActivityStatusEnum from "../utils/ActivityStatusEnum";
import ActivityVisibilityEnum from "../utils/ActivityVisibilityEnum";

export interface Activity {
  id: string;
  ongId: string;
  ongCategory: OngCategoryEnum;
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  limitInscriptionDate: Date;
  quantityVolunteersAvailable: number;
  volunteers: string[];
  actitivityStatusEnum: ActivityStatusEnum;
  activityVisibilityEnum: ActivityVisibilityEnum;
  tags: string[];
  imageURL: string;
}
