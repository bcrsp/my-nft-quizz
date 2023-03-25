import { createSlice } from "@reduxjs/toolkit";

export  interface ModalInterface {
    isOpen: boolean
}  

const initialState = {
    isOpen: false,
} as ModalInterface;

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal: (state, action) => {
            state.isOpen = true;
        },
        closeModal: (state, action) => {
            state.isOpen = false;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;