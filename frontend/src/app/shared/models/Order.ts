
import { LatLng } from "leaflet";
import { CartItem } from "./CartItem";

export class Order{
  order_id!:number;
  items!: CartItem[];
  total_price!:number;
  full_name!: string;
  delivery_address!: string;
  addressLatLng?:LatLng
  paymentId!: string;
  order_date!:string;
  created_at!: string;
  updated_at!:string
  status!: string;
}