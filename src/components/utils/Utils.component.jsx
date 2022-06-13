import { TailSpin } from "react-loading-icons"
import styled from "styled-components/macro"

export const LoadingScreen = () => {
	return (
		<LoadingScreenWrapper>
			<TailSpin stroke="#000" />
		</LoadingScreenWrapper>
	)
}
const LoadingScreenWrapper = styled.main`
	width: 100%;
	height: calc(100vh - 1px);
	display: flex;
	justify-content: center;
	align-items: center;
`
