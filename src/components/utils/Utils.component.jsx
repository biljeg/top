import styled from "styled-components/macro"
import { TailSpin } from "react-loader-spinner"

export const LoadingScreen = () => {
	return (
		<LoadingScreenWrapper>
			<TailSpin color="#000" height={80} width={80} />
		</LoadingScreenWrapper>
	)
}

export const Icon = ({
	src,
	onClick,
	width,
	height,
	mobileWidth,
	mobileHeight,
}) => {
	return (
		<IconContainer onClick={onClick}>
			<IconImg
				src={src}
				width={width}
				height={height}
				mobileWidth={mobileWidth}
				mobileHeight={mobileHeight}
				alt=""
			/>
		</IconContainer>
	)
}

export const FlavorText = styled.p`
	text-transform: uppercase;
	font-weight: 500;
	font-size: 1.2rem;
`

export const Content = styled.main`
	display: flex;
	flex-direction: ${({ flexDirection }) =>
		flexDirection ? flexDirection : "column"};
	align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
	width: ${({ widthMobile }) => (widthMobile ? widthMobile : "90vw")};
	margin-top: ${({ marginTop }) => (marginTop ? marginTop : "3.2rem")};
	margin-bottom: ${({ marginBottom }) =>
		marginBottom ? marginBottom : "3.2rem"};
	min-height: ${({ minHeight }) => (minHeight ? minHeight : "0px")};
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		width: ${({ widthTablet }) => (widthTablet ? widthTablet : "85vw")};
	}
	@media (min-width: ${props => props.theme.breakpoints.desktop}) {
		width: ${({ widthDesktop }) =>
			widthDesktop ? widthDesktop : "min(80vw, 1200px)"};
	}
`

const LoadingScreenWrapper = styled.section`
	width: 100%;
	height: calc(100vh - 1px);
	display: flex;
	justify-content: center;
	align-items: center;
`

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: ${props => (props.marginTop ? props.marginTop : "0px")};
	cursor: ${props => (props.pointer ? "default" : "pointer")};
`

const IconImg = styled.img`
	width: ${props => props.width};
	height: ${props => props.height};
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		width: ${({ width, mobileWidth }) => (mobileWidth ? mobileWidth : width)};
		height: ${({ height, mobileHeight }) =>
			mobileHeight ? mobileHeight : height};
	}
`
