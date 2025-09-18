export const ValidationRules = {
  categoryRegex: /^[A-Za-z\s]{3,30}$/,   
  codeRegex: /^[A-z]{1,5}[0-9]{1,5}$/,         
  nameRegex: /^[A-Za-z0-9\s]{3,50}$/,
  UserNameRegex : /^[A-z]{1}[a-zA-Z0-9_]{3,20}$/,
  PasswordRegex : /^[a-zA-Z0-9_]{5,20}$/,
  EmailRegex :/^[^@\s]+@[^@\s]+\.[^@\s]+$/,

  // Price
  minPrice: 0.01,
  maxPrice: 1000000,

  // Discount
  minDiscount: 0,
  maxDiscount: 100
};