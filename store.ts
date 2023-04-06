import {create,} from 'zustand';
import {persist, devtools} from 'zustand/middleware';

type State = {
    selectedGame: string;
    setSelectedGame: (game: string) => void;
};
const isClient = typeof window !== 'undefined';

export const useStore = create<State>()(
    devtools(
        isClient ? persist(
            (set) => ({
                selectedGame: '',
                setSelectedGame: (game) => set({selectedGame: game}),
            }),
            {
                name: 'game-forum-2',
                getStorage: () => localStorage,
            }
        ) : (set) => ({
            selectedGame: '',
            setSelectedGame: (game) => set({selectedGame: game}),
        })
    )
);