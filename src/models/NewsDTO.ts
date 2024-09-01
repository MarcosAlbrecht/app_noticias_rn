import {ItemNewDTO} from './ItemNewDTO';

export interface NewsDTO {
  count: number;
  page: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  showingFrom: number;
  showingTo: number;
  items: ItemNewDTO[];
}
