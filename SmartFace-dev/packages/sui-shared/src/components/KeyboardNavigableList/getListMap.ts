import compact from 'lodash/compact';
import { makeAutoObservable, observable } from 'mobx';

type ListItemsType = { root: Array<ListItem>; map: Map<ListItem['id'], ListItem> };

function getParentSublistIds(node: HTMLElement): string[] {
  const { parentElement, dataset } = node;
  const { keyboardNavigableListSublist } = dataset;

  return compact(
    parentElement
      ? [...getParentSublistIds(parentElement), keyboardNavigableListSublist]
      : [keyboardNavigableListSublist],
  );
}

function getChildListItems(node: HTMLElement): Array<HTMLElement> {
  const { children, dataset } = node;
  const { keyboardNavigableListItem } = dataset;

  return keyboardNavigableListItem ? [node] : [...children].flatMap((child) => getChildListItems(child as HTMLElement));
}

interface ListItemConstructorParamType {
  id: string;
  itemHTMLElement: HTMLElement;
  parentList: Array<ListItem>;
  parentListHTMLElement: HTMLElement;
  path: Array<ListItem>;
  sublist?: Array<ListItem> | null;
  sublistHTMLElement?: HTMLElement | null;
}

export class ListItem {
  id: string;
  itemHTMLElement: HTMLElement;
  openedSublists: Array<string>;
  path: Array<ListItem> = [];
  parentList: Array<ListItem>;
  parentListHTMLElement: HTMLElement;
  sublist?: Array<ListItem> | null = null;
  sublistId?: string;
  sublistHTMLElement?: HTMLElement | null = null;

  constructor({
    id,
    itemHTMLElement,
    parentList,
    path,
    sublistHTMLElement,
    parentListHTMLElement,
  }: ListItemConstructorParamType) {
    this.id = id;
    this.itemHTMLElement = itemHTMLElement;
    this.openedSublists = getParentSublistIds(itemHTMLElement);
    this.path = path;
    this.parentList = parentList;
    this.parentListHTMLElement = parentListHTMLElement;
    this.sublistHTMLElement = sublistHTMLElement;
    this.sublistId = sublistHTMLElement?.dataset.keyboardNavigableListSublist;

    makeAutoObservable(this);
  }
}

export function getListItems(entryNode: HTMLElement, path: Array<ListItem> = []): ListItemsType {
  const items: ListItemsType = observable({ root: [], map: new Map() });
  getChildListItems(entryNode).forEach((itemHTMLElement) => {
    const sublist = itemHTMLElement.querySelector<HTMLElement>('[data-keyboard-navigable-list-sublist]');
    const listItem = new ListItem({
      id: itemHTMLElement.dataset.keyboardNavigableListItem!,
      itemHTMLElement: itemHTMLElement,
      parentList: items.root,
      path: path,
      sublistHTMLElement: sublist,
      parentListHTMLElement: entryNode,
    });

    if (sublist) {
      const { root: sublistItems, map: subListMap } = getListItems(sublist, [...listItem.path, listItem]);
      listItem.sublist = sublistItems;
      subListMap.forEach((item, key) => items.map.set(key, item));
    }

    items.map.set(listItem.id, listItem);

    items.root.push(listItem);
  });

  return items;
}
