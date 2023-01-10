interface Iproduct {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage":number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[],
    "amount"?: number
}


interface productAmount {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage":number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[],
    "amount": number
}

interface IcardProps {
    addToCart(arg0: string): void;
    cart: number[];
    list?: Iproduct[];
    listSecond?: Iproduct[];
    product?: Iproduct;
}

interface IcreditCart {
    blurHandler(name: string, target: string) :void;
    setSlash(elem: { target: HTMLInputElement }):void;
    cvv:number;
    cardDirty:number;
    validDirty:number;
    codeDirty:number
}


interface IfunctionProps {
    name: string;
    maxVal: string | number | undefined;
  }

export {type IfunctionProps}
export {type IcreditCart}
export {type IcardProps}
export {type productAmount}
export {type Iproduct}