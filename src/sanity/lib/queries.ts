export const categoriesQuery = `
  *[_type == "category"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    range,
    featured,
    image
  }
`;


export const brandsQuery = `
  *[_type == "brand"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    image
  }
`;


export const productsQuery = `
  *[_type == "product"] | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    stock,
    status,
    variant,
    images,
    brand->{
      title
    }
  }
`;


export const allProductsQuery = `*[_type == "product"]{
  _id,
  name,
  slug,
  price,
  discount,
  images,
  status,
  brand->{
    title
  },
  _createdAt,
  variant
}`;
