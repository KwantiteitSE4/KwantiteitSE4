import * as type from '../types';

export const setCurrentMatchTrue = () => {
    return {
        type: type.CURRENT_GAME_SET,
        payload: true
    }
}