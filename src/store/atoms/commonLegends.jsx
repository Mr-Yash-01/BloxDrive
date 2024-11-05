import { atom } from "recoil";
import { PinataSDK } from 'pinata';

export const tempAtom = atom({
    key: "tempAtom",
    default: "Hello World",
})

export const secretAtom = atom({
    key: "secretAtom",
    default: null,
})

export const mainLoadingAtom = atom({
    key: "mainLoadingAtom",
    default: true,
})

export const currentAccountAtom = atom({
    key: "currentAccountAtom",
    default: "",
})

export const currentFragmentAtom = atom({
    key: "currentFragmentAtom",
    default: 1,
})

export const showCreateAtom = atom({
    key: "showCreateAtom",
    default: false,
})

export const contractAtom = atom({
    key: "contractAtom",
    default: null,
})

export const pathAtom = atom({
    key: "pathAtom",
    default: ["root"],
})

export const folderDataAtom = atom({
    key: "folderDataAtom",
    default: [],
})

export const isOptionsTapedAtom = atom({
    key: "isOptionsTapedAtom",
    default: false,
})

export const sharedDataAtom = atom ({
    key: 'sharedDataAtom',
    default: [],
})



export const selectedFileManuplationAtom = atom({
    key: "selectedFileManuplationAtom",
    default: {},
})

export const deleteTapedAtom = atom({
    key: "deleteTapedAtom",
    default: false,
})

export const deletingStatusAtom = atom({
    key: "deletingStatusAtom",
    default: false,
})

export const isCreateFolderTappedAtom = atom({
    key: 'isCreateFolderTappedAtom',
    default: false,
})

export const isFolderCreatingAtom = atom({
    key: 'isFolderCreatingAtom',
    default: false
})

export const selectedFilesAtom = atom({
    key: 'selectedFilesAtom',
    default: null
})

export const newFolderNameAtom = atom({
    key: 'newFolderNameAtom',
    default: '',
})

export const uploadingStatusAtom = atom({
    key: 'uploadingStatusAtom',
    default: false
})

export const giveAccessTapedAtom = atom({
    key: 'giveAccessTapedAtom',
    default: false
})

export const givingAccessAtom = atom({
    key: 'givingAccessAtom',
    default: false
})

export const toAddressAtom = atom({
    key: 'toAddressAtom',
    default: ''
})

export const toBeSearchAtom = atom({
    key: 'tobeSearchAtom',
    default: ''
})


export const isDroppingAtom = atom({
    key: 'isDroppingAtom',
    default: false
})

export const viewAtom = atom({
    key: 'viewAtom',
    default: 'list'
})

// export const pinata = new PinataSDK({
//     pinataJwt: import.meta.env.VITE_PINATA_JWT,
// });

export const pinataAtom = atom({
    key: 'pinataAtom',
    default: null
})