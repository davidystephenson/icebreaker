import reactScripts from 'react-scripts'

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean
  }
}

export default reactScripts
