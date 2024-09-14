export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter Your User Name",
    componentType: "input",
    type: "text",
    // options: []
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
  // {
  //   name: "confirmPassword",
  //   label: "Confirm Password",
  //   placeholder: "Confirm Password",
  //   componentType: "input",
  //   type: "password",
  // },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Your Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Your Password",
    componentType: "input",
    type: "password",
  },
];

export const adddProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter Product Title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter Product Description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
      { id: "fila", label: "Fila" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Sale Price (optional)",
  },
  {
    label: "Stock",
    name: "stock",
    componentType: "input",
    type: "number",
    placeholder: "Enter Product Stock",
  },
  // {
  //   label: "Image",
  //   name: "image",
  //   componentType: "input",
  //   type: "file",
  // },
]