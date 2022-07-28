import { createPortal } from "react-dom"
import styled from "styled-components/macro"

const Modal = ({ isOpened, setIsOpened, overlayOff, children }) => {
	if (!isOpened) return null

	return createPortal(
		<>
			<Overlay onClick={() => setIsOpened(false)} overlayOff={overlayOff} />
			<ModalWrapper>{children}</ModalWrapper>
		</>,
		document.getElementById("modal-root")
	)
}

export default Modal

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	animation: 200ms ease-out 0s 1 normal none running fadeIn;

	background-color: ${({ overlayOff }) =>
		overlayOff ? "transparent" : "rgba(0, 0, 0, 0.3)"};
`
const ModalWrapper = styled.div`
	animation: 200ms ease-out 0s 1 normal none running fadeIn;
`
