import styled from 'styled-components'

const LoaderDiv = styled.div`
	--loader-color: no-repeat linear-gradient(theme(colors.stone.800) 0 0);
	@keyframes loading {
		20% {
			background-position: 0% 0%, 50% 50%, 100% 50%;
		}
		40% {
			background-position: 0% 100%, 50% 0%, 100% 50%;
		}
		60% {
			background-position: 0% 50%, 50% 100%, 100% 0%;
		}
		80% {
			background-position: 0% 50%, 50% 50%, 100% 100%;
		}
	}

	width: 45px;
	aspect-ratio: 0.75;
	background: var(--loader-color) 0% 50%, var(--loader-color) 50% 50%, var(--loader-color) 100% 50%;
	background-size: 20% 50%;
	animation: loading 1s infinite linear;
`
const Loader: React.FC = () => {
	return (
		<div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
			<LoaderDiv />
		</div>
	)
}

export default Loader
