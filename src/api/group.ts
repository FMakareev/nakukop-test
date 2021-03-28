import DATA from './__mocks__/names.json';
import {GroupResult} from "./types";


export const GroupsApi = {
  getGroups: async (): Promise<GroupResult> => {
    return Promise.resolve(DATA as unknown as GroupResult);
  }
}
