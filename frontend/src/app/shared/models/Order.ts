
import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";
import { User } from "./User";

export class Order{
  order_id!:number;
  items!: CartItem[];
  total_price!:number;

  user_id!: string;
  full_name!: string;
  address!: string;
  addressLatLng?:LatLng

  
  payment_id!: string;
  order_date!:string;
  created_at!: string;
  updated_at!:string
  status!: string;
}