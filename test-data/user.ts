const uniqueId = `${Date.now()}${Math.floor(Math.random() * 100)}`;

export const testUser = {
  firstName: 'Test',
  lastName: 'User',
  dob: '1995-05-15',
  country: 'Georgia',
  postalCode: '0101',
  houseNumber: '10',
  street: 'Rustaveli 1',
  city: 'Tbilisi',
  state: 'Tbilisi',
  phone: '555123456',
  email: `email${uniqueId}@gmail.com`,
  password: 'Noemail123!@#',
  message: "Contact me here, PEACE.Contact me here, PEACE.Contact me here, PEACE.Contact me here, PEACE.Contact me here, PEACE.Contact me here, PEACE."
};
  console.log(testUser.email);

export const paymentDetails = {
  bankName: 'Test Bank',
  accountName: 'Test User',
  accountNumber: '123456789',
  cardNumber: '4111-1111-1231-1111',
  expirationDate: '12/2030',
  cvv: '123',
  cardholderName: 'John Doe',
  giftCardNumber: 'GIFT123456789',
  giftCardPin: '123',
};
