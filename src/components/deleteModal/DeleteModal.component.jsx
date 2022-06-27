import styled from "styled-components/macro"
import { Button } from "@mantine/core"
import { createPortal } from "react-dom"

const DeleteModal = ({ isOpened, setIsOpened, action }) => {
	if (!isOpened) return null
	const executeAction = () => {
		setIsOpened(false)
	}
	const abort = () => {
		setIsOpened(false)
	}
	return createPortal(
		<>
			<Overlay />
			<Modal>
				<h4>Are you sure you want to delete your account?</h4>
				<Button onClick={executeAction}>Yes</Button>
				<Button onClick={abort}>No</Button>
			</Modal>
		</>,
		document.getElementById("delete")
	)
}

export default DeleteModal

const Modal = styled.div`
	width: 350px;
	height: 500px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	border-radius: 20px;
	z-index: 3;
`
const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.5);
`
