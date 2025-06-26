export interface MatchOrder{
     orderId: string,
     investment: number,
     currentValue: number,
     exit:boolean,
     qty:number,
     side:string 
}
export type PendingOrder = 
  | {
      orderId: string;
      investment: number;
      buyPrice: number;
      unmatch: boolean;
      side: string;
    }
  | {
      orderId: string;
      investment: number;
      exitValue: number;
      exiting: boolean;
      qty:number,
      side: string;
    };

export interface ExitOrder{
 orderId: string,
 investment: number,
 return: number,
 exitQty:number,
 exited:boolean,
 side:string 
}
export interface CancelledOrder{
  orderId: string,
  investment: number,
  buyPrice: number,
  cancel: boolean,
  side: string
}
export interface Ointerface{
  matched: MatchOrder[],
  pending: PendingOrder[],
  exited: ExitOrder[],
  cancelled: CancelledOrder[]
}
