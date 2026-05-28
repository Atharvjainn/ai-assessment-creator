import {create} from 'zustand'

type UIStore = {
    activeTab : string | null,
    setCurrentTab : (tabname : string) => void,
    file : File | null,
    setFile : (file : File | null) => void
}


export const useUIStore = create<UIStore>((set) => ({
    activeTab : 'home',
    setCurrentTab : (tabname : string) => {
        set({activeTab : tabname})
    },
    file : null,
    setFile : (file : File | null) => {
        set({file})
    }
}))