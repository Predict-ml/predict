import { SVGProps } from 'react'

const VolleyBall = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={32}
		height={32}
		viewBox="0 0 256 256"
		{...props}
	>
		<path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm81.74 136.58a88 88 0 0 1-93.49 3.78L132.62 136h83a87.16 87.16 0 0 1-5.88 24.58ZM91.12 48.11a87.57 87.57 0 0 1 24.22-7.2 88 88 0 0 1 50 79.09h-32.72ZM215.63 120h-34.26a104.18 104.18 0 0 0-35.78-78.23A88.18 88.18 0 0 1 215.63 120ZM77.27 56.13l17.12 29.65a104.14 104.14 0 0 0-49.86 70.09 87.95 87.95 0 0 1 32.74-99.74ZM58.9 182.43a88 88 0 0 1 43.49-82.79L118.76 128l-41.49 71.87a88.62 88.62 0 0 1-18.37-17.44ZM128 216a87.5 87.5 0 0 1-36.88-8.11l17.13-29.67a104.23 104.23 0 0 0 85.53 8.17A87.81 87.81 0 0 1 128 216Z" />
	</svg>
)

export default VolleyBall
