import React from 'react'

export function useKeyAction(key: string, action: () => void) {
	React.useEffect(() => {
		function keyHandler(e: KeyboardEvent) {
			if (e.key.toLowerCase() === key.toLowerCase())
                action()
		}
		document.addEventListener('keydown', keyHandler)
		return () => { document.removeEventListener('keydown', keyHandler) }
	}, [action, key])
}
