import { MutationHookOptions } from '@apollo/client';
import { useLocalMutation } from '../apollo';
import { User } from '../user';

import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  LOGOUT_MUTATION,
  CONFIRM_MUTATION,
  RESEND_MUTATION,
  FORGOT_MUTATION,
  RESET_MUTATION,
} from './documents';

import {
  Auth,
  LoginVariables,
  RegisterVariables,
  ForgotVariables,
  ResetVariables,
  LogoutVariables,
} from './types';

export const useLogin = (
  options?: MutationHookOptions<{ login: Auth }, LoginVariables>
) => useLocalMutation(LOGIN_MUTATION, options);

export const useRegister = (
  options?: MutationHookOptions<{ register: Auth }, RegisterVariables>
) => useLocalMutation(REGISTER_MUTATION, options);

export const useLogout = (
  options?: MutationHookOptions<{ logout: string }, LogoutVariables>
) => useLocalMutation(LOGOUT_MUTATION, options);

export const useConfirm = (options?: MutationHookOptions<{ confirm: User }>) =>
  useLocalMutation(CONFIRM_MUTATION, options);

export const useResend = (options?: MutationHookOptions<{ resend: string }>) =>
  useLocalMutation(RESEND_MUTATION, options);

export const useForgot = (
  options?: MutationHookOptions<{ forgot: string }, ForgotVariables>
) => useLocalMutation(FORGOT_MUTATION, options);

export const useReset = (
  options?: MutationHookOptions<{ reset: Auth }, ResetVariables>
) => useLocalMutation(RESET_MUTATION, options);
