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
          type: "Float",
          required: true,
        },
      ],
    },
  ],
};
