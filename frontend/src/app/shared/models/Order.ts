
import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
  order_id!:string;
  items!: CartItem[];
  total_price!:number;
  stt!:number;

  user_id!: string;
  receiver!: string;
  delivery_phone!:string;
  phone_number!: string;
  full_name!:string
  email!:string;
  address!: string;
  addressLatLng?:LatLng
  active!:string
  
  payment_id!: string;
  order_date!:string;
  updated_at!:string
  status!: string;
}