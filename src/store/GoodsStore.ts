import {
  ApiStateEnum,
  getGoodsNamesDto,
  getGroupDto,
  getGroupID,
  getID,
  GoodsApi,
  GoodsDto,
  goodsDto,
  GoodsResult,
  GroupDto,
  GroupResult,
  GroupsApi,
  Maybe
} from "../api";
import {action, makeObservable, observable} from "mobx"
import * as _ from 'lodash';

interface GoodsStoreProps {
  goodsApi?: typeof GoodsApi;
  groupsApi?: typeof GroupsApi;
}

export class GoodsStore {

  requestState: ApiStateEnum = ApiStateEnum.SUCCESS;
  goods: GoodsDto[] = [];
  groups: GroupDto[] = [];

  goodsApi?: typeof GoodsApi;
  groupsApi?: typeof GroupsApi;

  constructor({
                goodsApi,
                groupsApi,
              }: GoodsStoreProps) {
    this.goodsApi = goodsApi;
    this.groupsApi = groupsApi;

    makeObservable(this, {
      loadData: action,
      requestState: observable,
      goods: observable,
      groups: observable,
    })
  }

  private getGoods = () => this.goodsApi?.getGoods()

  private getGroups = () => this.groupsApi?.getGroups();

  loadData = async () => {
    try {
      this.requestState = ApiStateEnum.LOADING;
      const [groups, goods]: [
        Maybe<GroupResult>,
        Maybe<GoodsResult>
      ] = await Promise.all([
        this.getGroups(),
        this.getGoods()
      ]);
      const goodsNamesDto = getGoodsNamesDto(groups);
      this.groups = getGroupDto(groups)
      this.goods = goodsDto(goodsNamesDto)(goods);

      this.requestState = ApiStateEnum.SUCCESS;
    } catch (e) {
      console.log(e);
      this.requestState = ApiStateEnum.REJECTED;
    }
  }

  getGoodsByGroup = (groupID: number | string): GoodsDto[] => {
    return _.chain(this.goods).filter((item) => _.isEqual(groupID.toString(), getGroupID(item).toString())).value();
  }
  getGoodsById = (ID: number | string): GoodsDto => {
    return _.chain(this.goods).find((item) => _.isEqual(ID.toString(), getID(item).toString())).value();
  }


}
