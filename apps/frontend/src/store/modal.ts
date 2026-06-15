import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type CreatePlaylistModalType = "CreatePlaylist";
export type CreatePlaylistModalProps = {
  name: string | undefined;
  description: string | undefined;
  tracks: Set<string>;
};

type CreatePlaylistModalState = {
  type: CreatePlaylistModalType;
  props: CreatePlaylistModalProps;
};

type ModalState = CreatePlaylistModalState | { type: null };

type ModalActions = {
  openModal: (modalState: ModalState) => void;
  closeModal: () => void;
};

type ModalStore = ModalState & ModalActions;

const modalActions: StateCreator<ModalStore, [], [], ModalActions> = (set) => ({
  openModal: (modalState) => {
    set(modalState);
  },
  closeModal: () => {
    set({ type: null });
  },
});

const initialState: ModalState = {
  type: null,
};

export const useModalStore = create<ModalStore>()(
  devtools((set, get, store) => ({
    ...initialState,
    ...modalActions(set, get, store),
  })),
);
