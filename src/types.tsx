export type userDetailsType = {
  username: string | null;
  email: string | null;
  password: string | null;
};

export type AppContextType = {
  isAuthenticated: boolean;
  userToken: string;
  login: (email: string, password: string) => void;
  registration: (username: string, email: string, password: string) => void;
  setUserToken: (token: string) => void;
  deleteAccount: (id: number) => void;
  updateUserDetails: (
    username: string | null,
    email: string | null,
    password: string | null
  ) => void;
  logout: () => void;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
