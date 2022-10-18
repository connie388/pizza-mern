export const documents = {
  cheese: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      label: "Description",
      type: "text",
    },
    {
      name: "image",
      label: "Image",
      type: "text",
    },
  ],
  sauce: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "desc",
      label: "Description",
      type: "text",
    },
    {
      name: "image",
      label: "Image",
      type: "text",
    },
    {
      name: "amountType",
      label: "Amount Type",
      type: "checkbox",
    },
  ],
  sauceamount: [
    {
      name: "type",
      label: "Type",
      type: "text",
      required: true,
    },
  ],
  menucategory: [
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
  ],
  toppingcategory: [
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "Float",
      required: true,
    },
  ],
  toppings: [
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "Float",
      required: true,
    },
    {
      name: "list",
      label: "list",
      type: "array",
      list: [
        {
          name: "topping",
          label: "Topping",
          type: "number",
          required: true,
        },
      ],
    },
  ],
  menuchoicebycategory: [
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "list",
      label: "list",
      type: "array",
      list: [
        {
          name: "size",
          label: "Size",
          type: "text",
          required: true,
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
        },
        {
          name: "information",
          label: "Information",
          type: "text",
        },
        {
          name: "shape",
          label: "Shape",
          type: "text",
        },
      ],
    },
  ],
  menuchoice: [
    {
      name: "menu",
      label: "Menu",
      type: "array",
      list: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "size",
      label: "Size",
      type: "text",
      required: true,
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      required: true,
    },
    {
      name: "information",
      label: "Information",
      type: "text",
    },
  ],
};
