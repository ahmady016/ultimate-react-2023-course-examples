import React from 'react'

export function useKeyHandler(keyHandler: (e: KeyboardEvent) => void) {
	React.useEffect(() => {
		document.addEventListener('keydown', keyHandler)
		return () => { document.removeEventListener('keydown', keyHandler) }
	}, [keyHandler])
}
