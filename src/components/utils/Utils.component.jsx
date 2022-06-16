import { TailSpin } from "react-loader-spinner"
import styled from "styled-components/macro"

export const LoadingScreen = () => {
	return (
		<LoadingScreenWrapper>
			<TailSpin color="#000" height={80} width={80} />
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
