const EDU_ACCOUNT_ID = '15802914';

export type PersonalDetailAccountInfo = {
  accountID: string;
  avatar: string;
  displayName: string;
  firstName: string;
  lastName: string;
  status: string;
  login: string;
  pronouns: string;
  timezone: {
    automatic: boolean;
    selected: string;
  };
  payPalMeAddress: string;
  phoneNumber: string;
  validated: boolean;
  localCurrencyCode: string;
};

export {EDU_ACCOUNT_ID};
