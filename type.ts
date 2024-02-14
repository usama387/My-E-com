// In this file the data types are defined for the different schemas created in sanity
// 1)Product is category use dto show case different products
export interface ProductProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  price: number;
  rowprice: number;
  title: string;
  position: string;
  ratings: number;
  description: string;
  brand: string;
  slug: {
    current: string;
    _type: string;
  };
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: [
    {
      _key: string;
      _ref: string;
      _type: string;
    }
  ];
  isnew: boolean;
  body: any;
  quantity: number;
}

// Here i defined the datatype state properties coming from redux and used in the pageButton component
export interface StateProps {
  // name of instance used in redux amd note that productData is equal to ProductProps created upward
  orebi: {
    productData: ProductProps[];
  };
}
