export const REGISTER_USER = 'REGISTER_USER';

export interface RegisterUserAction {
    type: typeof REGISTER_USER;
}

export const registerUser = (): RegisterUserAction => ({
    type: REGISTER_USER,
});


