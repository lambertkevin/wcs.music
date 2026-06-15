import { useRef } from "react";
import { useModalStore } from "../store/modal";
import SpotifyCreatePlaylistModal from "./Modals/SpotifyCreatePlaylistModal";

const ModalComponent = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const modalStore = useModalStore();

  if (modalStore.type) {
    modalRef?.current?.showModal();
  } else {
    modalRef?.current?.close();
  }

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onClose={() => modalStore.closeModal()}
    >
      {modalStore.type === "CreatePlaylist" ? (
        <SpotifyCreatePlaylistModal {...modalStore.props} />
      ) : (
        <></>
      )}
    </dialog>
  );
};

export default ModalComponent;
