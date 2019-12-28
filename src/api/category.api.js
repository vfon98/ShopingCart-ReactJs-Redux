import axios from '../axios/axios.base'
import { category } from './endpoints'

export const fetchCategories = () => {
  return axios.get(category.CATEGORY_LIST);
}