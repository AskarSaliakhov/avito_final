import { REGISTER_USER, RegisterUserAction } from '../actions/user';

export interface UserState {
    isRegistered: boolean;
}
const initialState: UserState = {
    isRegistered: false,
};

export const reducerUser = (state: UserState = initialState, action: RegisterUserAction): UserState => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                isRegistered: true,
            };
        default:
            return state;
    }
};
