
import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
  order_id!:string;
  items!: CartItem[];
  total_price!:number;

  user_id!: string;
  full_name!: string;
  phone_number!:string;
  email!:string;
  address!: string;
  addressLatLng?:LatLng

  
  payment_id!: string;
  order_date!:string;
  created_at!: string;
  updated_at!:string
  status!: string;
}