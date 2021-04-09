export interface CreditCard{
    id:number;
    customerId:number;
    cardTypeId:number;
    cardNumber:string;
    firstNameOnTheCard:string;
    lastNameOnTheCard:string;
    expirationMonth:number;
    expirationYear:number;
    cvv:string;
    selectedCard:boolean
}