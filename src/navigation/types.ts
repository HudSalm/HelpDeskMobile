import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  MyCalls: undefined;
  CallsReceived: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  RecoverPassword: undefined;
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  RegisterCall: undefined;
  UpdateCalls: { callDetails: string };
  UpdateEmail: { data: string; nameColumn: string };
  UpdateInfo: { data: string | null; nameColumn: string; text: string };
  UpdatePassword: { isSession: boolean };
};
